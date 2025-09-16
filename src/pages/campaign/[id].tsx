import { useRouter } from 'next/router';
import Head from 'next/head';
import Page2 from '@/components/ui/Page/Page2';
import TradingInterface from '@/components/TradingInterface';
import { useState, useEffect } from 'react';
import TokenPriceChart from '@/components/PriceChart';
import { getApiUrl } from '@/lib/worker-api';
import Spinner from '@/components/Spinner/Spinner';

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

export default function CampaignPage2() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchCampaign = async () => {
      try {
        const workerUrl = getApiUrl() || 'http://localhost:8787';
        const res = await fetch(`${workerUrl}/api/campaigns/${id}`);
        const data: Campaign = await res.json();
        setCampaign(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Campaign Not Found - NiceApe</title>
        </Head>
        <Page2>
          <div className="py-16 px-4 flex items-center justify-center w-full h-screen">
            <Spinner />
          </div>
        </Page2>
      </>
    );
  }

  if (!campaign && !isLoading) {
    return (
      <>
        <Head>
          <title>Campaign Not Found - NiceApe</title>
        </Head>
        <Page2>
          <div className="py-16 px-4 text-center">
            <h1 className="text-2xl font-bold text-[#0a0a0a]">Campaign not found</h1>
            <p className="text-neutral-800 mt-2">
              The campaign you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </Page2>
      </>
    );
  }

  if (campaign) {
    const progressPercentage = (campaign?.raisedValue / campaign?.campaignGoal) * 100;

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      }).format(amount);
    };

    return (
      <>
        <Head>
          <title>{campaign?.name} - NiceApe</title>
        </Head>
        <Page2>
          <div className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Campaign Header */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={campaign?.imageUrl}
                      alt={campaign?.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {campaign?.categoryId}
                      </span>
                      <span className="text-lg font-bold text-[#0a0a0a]">
                        ${campaign?.tokenTicker}
                      </span>
                    </div>

                    <h1 className="text-3xl font-bold text-[#0a0a0a]">{campaign?.name}</h1>

                    <p className="text-neutral-800 mb-6">{campaign?.shortDescription}</p>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-neutral-800">
                          Goal: {formatCurrency(campaign?.campaignGoal)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-lg font-semibold text-[#0a0a0a]">
                        {formatCurrency(campaign?.raisedValue)} raised
                      </div>
                    </div>

                    {/* Campaign Stats */}
                    {/* <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0a0a0a]">
                        {campaign?.trades}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">trades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0a0a0a]">
                        ${campaign?.price.toFixed(4)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">current price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0a0a0a]">
                        {formatCurrency(campaign?.volume24h)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">24h volume</div>
                    </div>
                  </div> */}

                    {/* Social Links */}
                    <div className="flex gap-4">
                      {campaign?.websiteUrl && (
                        <a
                          href={campaign?.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          🌐 Website
                        </a>
                      )}
                      {campaign?.xHandle && (
                        <a
                          href={campaign?.xHandle}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 transition-colors"
                        >
                          🐦 Twitter
                        </a>
                      )}
                      {campaign?.telegramHandle && (
                        <a
                          href={campaign?.telegramHandle}
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
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transition-colors duration-300">
                    {/* <TokenPriceChart data={dummyData} /> */}

                    <h2 className="text-2xl font-bold text-[#0a0a0a]">About This Campaign</h2>
                    <p className="text-neutral-800 leading-relaxed">{campaign?.longDescription}</p>
                  </div>
                </div>

                {/* Trading Interface */}
                <div className="lg:col-span-1 mb-16">
                  <div className="lg:col-span-1">
                    <div className="w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transition-colors duration-300">
                      <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">Creator</h2>

                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={campaign?.user?.avatarUrl || 'https://via.placeholder.com/80'}
                          alt={campaign?.user?.displayName}
                          className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                        />
                        <div>
                          <p className="text-neutral-600 text-sm">
                            <span className="font-semibold">Name:</span>{' '}
                            {campaign?.user.displayName}
                          </p>
                          {campaign?.user?.xHandle && (
                            <p className="text-neutral-600 text-sm">
                              <span className="font-semibold">Twitter:</span>{' '}
                              <a
                                href={`https://x.com/${campaign?.user.xHandle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                {campaign?.user.xHandle}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>

                      {campaign?.user.bio && (
                        <div className="text-neutral-600 text-sm">
                          <p className="font-semibold mb-1">About:</p>
                          <p className="leading-relaxed">{campaign?.user.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <TradingInterface
                    campaignToken={campaign?.tokenMint}
                    campaignSymbol={campaign?.tokenTicker}
                    campaignName={campaign?.name}
                    currentPrice={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </Page2>
      </>
    );
  }
}
