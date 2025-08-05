'use client';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Page from '@/components/ui/Page/Page';
import { useState, useEffect, useMemo } from 'react';
import { workerApi } from '@/lib/worker-api';
import Spinner from '@/components/Spinner/Spinner';
import { useWallet } from '@jup-ag/wallet-adapter';
import { useTheme } from '@/contexts/ThemeProvider';

interface Campaign {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  websiteUrl: string;
  telegramHandle: string;
  campaignGoal: number;
  userId: string;
  raisedValue: number;
  bondingCurve: number;
  poolsData?: string;
}

export default function CampaignPage() {
  const router = useRouter();
  const { id } = router.query;
  const { disconnect } = useWallet();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Campaign>>({});
  const [isEditing, setEditing] = useState(false);
  const currentUserId = localStorage.getItem('userId') || 'anonymous_user';

  const progressPercentage = campaign ? (campaign.raisedValue / campaign.campaignGoal) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(amount);
  };

  const fetchCampaign = async () => {
    try {
      const data: Campaign = (await workerApi.getCampaignById(id as string)) as Campaign;

      // Check if the current user is authorized to view/edit the campaign
      if (data.userId !== currentUserId) {
        router.push('/dashboard'); // Redirect if userId does not match
        return;
      }

      setCampaign(data);
      setFormData({
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        websiteUrl: data.websiteUrl,
        telegramHandle: data.telegramHandle,
        campaignGoal: data.campaignGoal,
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch campaign:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    fetchCampaign();
  }, [id, currentUserId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await workerApi.updateCampaign(id as string, formData);
      alert('Campaign updated successfully!');
      setEditing(false); // Exit edit mode after successful update
      fetchCampaign();
    } catch (error) {
      console.error('Failed to update campaign:', error);
      alert('Failed to update campaign.');
    }
  };

  const handleDisconnectWallet = async () => {
    await disconnect();
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Campaign - NiceApe</title>
        </Head>
        <Page>
          <div className="py-16 px-4 flex items-center justify-center w-full h-screen">
            <Spinner />
          </div>
        </Page>
      </>
    );
  }

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

  return (
    <>
      <Head>
        <title>{isEditing ? 'Edit Campaign' : 'Campaign Details'} - NiceApe</title>
      </Head>
      <Page>
        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`w-64 h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
          >
            <h2 className="text-2xl font-bold mb-6">NiceApe</h2>
            <nav className="space-y-4">
              <button
                onClick={() => router.push('/dashboard')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
              >
                Campaign
              </button>
              <button
                onClick={() => router.push('/dashboard?menu=Setting')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
              >
                Setting
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                      Edit Campaign Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Campaign Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="e.g., Clean Water Drive"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Short Description *
                      </label>
                      <textarea
                        name="shortDescription"
                        value={formData.shortDescription || ''}
                        onChange={handleInputChange}
                        required
                        maxLength={100}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="Brief summary or tagline for your campaign"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Long Description *
                      </label>
                      <textarea
                        name="longDescription"
                        value={formData.longDescription || ''}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="Detailed description of your campaign"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="https://your-website.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Telegram Handle
                      </label>
                      <input
                        type="text"
                        name="telegramHandle"
                        value={formData.telegramHandle || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="@yourtelegram"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Campaign Goal (USD) *
                      </label>
                      <input
                        type="number"
                        name="campaignGoal"
                        value={formData.campaignGoal || ''}
                        onChange={handleInputChange}
                        required
                        min="100"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="e.g., 5000"
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg text-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 rounded-lg text-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                    Campaign Details
                  </h3>
                  <div className="space-y-4">
                    <p>
                      <strong>Name:</strong> {campaign.name}
                    </p>
                    <p>
                      <strong>Short Description:</strong> {campaign.shortDescription}
                    </p>
                    <p>
                      <strong>Long Description:</strong> {campaign.longDescription}
                    </p>
                    <p>
                      <strong>Website URL:</strong> {campaign.websiteUrl || 'N/A'}
                    </p>
                    <p>
                      <strong>Telegram Handle:</strong> {campaign.telegramHandle || 'N/A'}
                    </p>
                  </div>

                  <div className="my-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
                  <div className="my-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Bonding Curve
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.round(campaign.bondingCurve)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-green-600 dark:bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(campaign.bondingCurve, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="w-full">
                      <button
                        onClick={() => setEditing(true)}
                        className="w-full border-1 border-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-lg transition-colors"
                      >
                        Edit Campaign
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        disabled={!campaign.poolsData}
                        onClick={() =>
                          window.open(
                            `https://www.meteora.ag/dammv2/${campaign?.poolsData}`,
                            '_blank'
                          )
                        }
                        className="w-full disabled:bg-zinc-600 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-lg transition-colors"
                      >
                        Claim Reward
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </Page>
    </>
  );
}
