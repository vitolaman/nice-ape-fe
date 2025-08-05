import { createDb } from '../db';
import { campaigns, insertCampaignSchema, users } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { Env } from '../types';
import { mapCampaignToResponse } from '../lib/field-mapping';
import {
  createTimestamps,
  updateTimestamps,
  deleteTimestamps,
  excludeDeleted,
  activeWithCondition,
} from '../lib/timestamps';
import { Connection, PublicKey } from '@solana/web3.js';
import {
  deriveDammV2PoolAddress,
  deriveDbcPoolAddress,
  DynamicBondingCurveClient,
} from '@meteora-ag/dynamic-bonding-curve-sdk';
import { JupiterPoolsResponse } from './campaigns-with-jupiter';

export class CampaignService {
  private db;
  private env: Env;

  constructor(env: Env) {
    this.db = createDb(env.DB);
    this.env = env;
  }

  async createCampaign(campaignData: {
    id: string;
    name?: string;
    userId?: string;
    bannerUrl?: string;
    imageUrl?: string;
    tokenName?: string;
    tokenTicker?: string;
    tokenImageUrl?: string;
    campaignGoal?: number;
    categoryId?: string;
    charityWalletAddress?: string;
    raisedValue?: number;
    shortDescription?: string;
    longDescription?: string;
    websiteUrl?: string;
    xHandle?: string;
    telegramHandle?: string;
  }) {
    const campaignWithTimestamps = {
      ...campaignData,
      ...createTimestamps(),
    };

    const newCampaign = insertCampaignSchema.parse(campaignWithTimestamps);
    const result = await this.db.insert(campaigns).values(newCampaign).returning();
    return mapCampaignToResponse(result[0]);
  }

  async getCampaignById(id: string) {
    const campaign = await this.db
      .select()
      .from(campaigns)
      .where(activeWithCondition(campaigns.deletedAt, eq(campaigns.id, id)))
      .limit(1);

    if (!campaign[0]) return null;

    const user = await this.db
      .select()
      .from(users)
      .where(activeWithCondition(users.deletedAt, eq(users.id, campaign[0].userId)))
      .limit(1);

    const RPC_URL = this.env.RPC_URL;
    const NETWORK = this.env.NEXT_PUBLIC_NETWORK || 'mainnet';
    const POOL_CONFIG_KEY =
      NETWORK === 'devnet'
        ? this.env.NEXT_PUBLIC_DEVNET_POOL_CONFIG_KEY
        : this.env.NEXT_PUBLIC_MAINNET_POOL_CONFIG_KEY;

    if (!RPC_URL || !POOL_CONFIG_KEY) {
      throw new Error('Missing required blockchain environment variables');
    }

    const connection = new Connection(RPC_URL, 'confirmed');
    const client = new DynamicBondingCurveClient(connection, 'confirmed');
    const fees = await client.state.getPoolByBaseMint(campaign[0].tokenMint);
    const dbcPoolAddress = deriveDbcPoolAddress(
      new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      new PublicKey(campaign[0].tokenMint),
      new PublicKey('54zgFqnvtLAaFssPTYha3NNRuB88RaVKQjtTG4fVHKC3')
    );

    const url = `https://datapi.jup.ag/v1/pools?assetIds=${campaign[0].tokenMint}`;
    let poolsData;
    let bondingCurve = 100;
    const response = await fetch(url);
    if (response.ok) {
      const data = (await response.json()) as JupiterPoolsResponse;
      bondingCurve = data?.pools[0]?.bondingCurve as number;
      poolsData = data?.pools[0]?.baseAsset?.graduatedPool || '';
    }
    // console.log('progress:', progress.toString());
    const metrics = await client.state.getPoolFeeMetrics(fees?.publicKey as PublicKey);
    const bn1 = metrics.total.totalTradingBaseFee;
    const bn2 = metrics.total.totalTradingQuoteFee;
    const intValue = bn1.toNumber();
    const intValue2 = bn2.toNumber();
    const totalFees = intValue + intValue2 / 1_000_000;
    const percentage = (totalFees / campaign[0]?.campaignGoal) * 100;

    return {
      ...mapCampaignToResponse(campaign[0]),
      user: user[0] ?? null,
      percentage: percentage,
      raisedValue: totalFees,
      poolsData: poolsData || '',
      bondingCurve: bondingCurve,
    };
  }

  async getCampaignsByUser(userId: string) {
    const userCampaigns = await this.db
      .select()
      .from(campaigns)
      .where(
        and(
          activeWithCondition(campaigns.deletedAt, eq(campaigns.userId, userId)),
          eq(campaigns.status, 'SUCCESS')
        )
      );

    return userCampaigns.map(mapCampaignToResponse);
  }

  async getCampaignsByCategory(categoryId: string) {
    const categoryCampaigns = await this.db
      .select()
      .from(campaigns)
      .where(activeWithCondition(campaigns.deletedAt, eq(campaigns.categoryId, categoryId)));
    return categoryCampaigns.map(mapCampaignToResponse);
  }

  async getAllCampaigns() {
    const allCampaigns = await this.db
      .select()
      .from(campaigns)
      .where(excludeDeleted(campaigns.deletedAt));
    return allCampaigns.map(mapCampaignToResponse);
  }

  async updateCampaign(
    id: string,
    updateData: Partial<{
      name: string;
      bannerUrl: string;
      imageUrl: string;
      tokenName: string;
      tokenTicker: string;
      tokenImageUrl: string;
      campaignGoal: number;
      categoryId: string;
      charityWalletAddress: string;
      raisedValue: number;
      shortDescription: string;
      longDescription: string;
      websiteUrl: string;
      xHandle: string;
      telegramHandle: string;
    }>
  ) {
    const dataWithTimestamps = {
      ...updateData,
      ...updateTimestamps(),
    };

    const result = await this.db
      .update(campaigns)
      .set(dataWithTimestamps)
      .where(activeWithCondition(campaigns.deletedAt, eq(campaigns.id, id)))
      .returning();

    return mapCampaignToResponse(result[0]);
  }

  async softDeleteCampaign(id: string) {
    const result = await this.db
      .update(campaigns)
      .set(deleteTimestamps())
      .where(activeWithCondition(campaigns.deletedAt, eq(campaigns.id, id)))
      .returning();

    return mapCampaignToResponse(result[0]);
  }

  async updateRaisedValue(id: string, amount: number) {
    return await this.updateCampaign(id, { raisedValue: amount });
  }

  async incrementRaisedValue(id: string, amount: number) {
    const campaign = await this.getCampaignById(id);
    if (!campaign) throw new Error('Campaign not found');

    const newAmount = (campaign.raisedValue || 0) + amount;
    return await this.updateCampaign(id, { raisedValue: newAmount });
  }
}
