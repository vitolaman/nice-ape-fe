import { useRouter } from 'next/router';
import Head from 'next/head';
import Page from '@/components/ui/Page/Page';
import TradingInterface from '@/components/TradingInterface';
import { useState, useEffect } from 'react';
import TokenPriceChart from '@/components/PriceChart';
import { getApiUrl } from '@/lib/worker-api';

export type UserResponse = {
  id: string;
  displayName: string;
  avatarUrl: string;
  bio: string | null;
  walletAddress: string;
  xHandle: string | null;
  totalTrade: number;
  volumeTrade: number;
  charityImpact: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

interface Campaign {
  id: string;
  name: string;
  bannerUrl: string;
  imageUrl: string;
  tokenName: string;
  tokenTicker: string;
  categoryId: string;
  tokenImageUrl: string;
  websiteUrl: string;
  xHandle: string;
  telegramHandle: string;
  campaignGoal: number;
  charityWalletAddress: string;
  raisedValue: number;
  shortDescription: string;
  longDescription: string;
  status: string;
  tokenMint: string;
  transactionSignature: string;
  createdAt: string;
  updatedAt: string;
  percentage: string;
  user: UserResponse;
}

export default function CampaignPage() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchCampaign = async () => {
      try {
        const workerUrl = getApiUrl() || 'http://localhost:8787';
        const res = await fetch(`${workerUrl}/api/campaigns/${id}`);
        const data: Campaign = await res.json();
        setCampaign(data);
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
      }
    };

    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return (
      <>
        <Head>
          <title>Campaign Not Found - NiceApe</title>
        </Head>
        <Page>
          <div className="py-16 px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              The campaign you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </Page>
      </>
    );
  }

  const progressPercentage = (campaign.raisedValue / campaign.campaignGoal) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Head>
        <title>{campaign.name} - NiceApe</title>
      </Head>
      <Page>
        <div className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Campaign Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8 transition-colors duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {campaign.categoryId}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${campaign.tokenTicker}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {campaign.name}
                  </h1>

                  <p className="text-gray-600 mb-6">{campaign.shortDescription}</p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Goal: {formatCurrency(campaign.campaignGoal)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-green-600 dark:bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(campaign.raisedValue)} raised
                    </div>
                  </div>

                  {/* Campaign Stats */}
                  {/* <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {campaign.trades}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">trades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${campaign.price.toFixed(4)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">current price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(campaign.volume24h)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">24h volume</div>
                    </div>
                  </div> */}

                  {/* Social Links */}
                  <div className="flex gap-4">
                    {campaign.websiteUrl && (
                      <a
                        href={campaign.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        🌐 Website
                      </a>
                    )}
                    {campaign.xHandle && (
                      <a
                        href={campaign.xHandle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 transition-colors"
                      >
                        🐦 Twitter
                      </a>
                    )}
                    {campaign.telegramHandle && (
                      <a
                        href={campaign.telegramHandle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        📱 Telegram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Campaign Details */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  {/* <TokenPriceChart data={dummyData} /> */}

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    About This Campaign
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {campaign.longDescription}
                  </p>
                </div>
              </div>

              {/* Trading Interface */}
              <div className="lg:col-span-1 mb-16">
                <div className="lg:col-span-1">
                  <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Creator
                    </h2>

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={campaign.user?.avatarUrl || 'https://via.placeholder.com/80'}
                        alt={campaign.user?.displayName}
                        className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                      />
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          <span className="font-semibold">Name:</span> {campaign.user.displayName}
                        </p>
                        {campaign.user?.xHandle && (
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            <span className="font-semibold">Twitter:</span>{' '}
                            <a
                              href={`https://x.com/${campaign.user.xHandle}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {campaign.user.xHandle}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>

                    {campaign.user.bio && (
                      <div className="text-gray-700 dark:text-gray-300 text-sm">
                        <p className="font-semibold mb-1">About:</p>
                        <p className="leading-relaxed">{campaign.user.bio}</p>
                      </div>
                    )}
                  </div>
                </div>

                <TradingInterface
                  campaignToken={campaign.tokenMint}
                  campaignSymbol={campaign.tokenTicker}
                  campaignName={campaign.name}
                  currentPrice={1}
                />
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
