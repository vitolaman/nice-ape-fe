import { useState, useEffect, useMemo } from 'react';
import { useWallet } from '@jup-ag/wallet-adapter';
import Page from '@/components/ui/Page/Page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTheme } from '@/contexts/ThemeProvider';
import { workerApi } from '@/lib/worker-api';
import CampaignCardDashboard from '@/components/CampaignCardDashboard';

type Campaign = {
  id: string;
  name: string;
  bannerUrl: string;
  imageUrl: string;
  tokenName: string;
  tokenTicker: string;
  tokenImageUrl: string;
  campaignGoal: number;
  raisedValue: number;
  shortDescription: string;
  longDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: string;
  tokenMint: string;
};

export default function Dashboard() {
  const router = useRouter();
  const { publicKey, disconnect } = useWallet();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeMenu, setActiveMenu] = useState<'Campaign' | 'Setting'>('Campaign');

  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';

    if (!userId) return;

    workerApi
      .getCampaignsByCreator(userId)
      .then((data) => {
        setCampaigns(data as Campaign[]);
      })
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
      });
  }, [address]);

  useEffect(() => {
    // Read the "menu" query parameter from the URL
    const menu = router.query.menu as string;
    if (menu === 'Setting' || menu === 'Campaign') {
      setActiveMenu(menu as 'Campaign' | 'Setting');
    }
  }, [router.query.menu]);

  const handleMenuChange = (menu: 'Campaign' | 'Setting') => {
    setActiveMenu(menu);
    router.push(`/dashboard?menu=${menu}`, undefined, { shallow: true });
  };

  const handleDisconnectWallet = async () => {
    await disconnect();
    window.location.href = '/';
  };

  return (
    <>
      <Head>
        <title>Dashboard - NiceApe</title>
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
                onClick={() => handleMenuChange('Campaign')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeMenu === 'Campaign'
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-200'
                }`}
              >
                Campaign
              </button>
              <button
                onClick={() => handleMenuChange('Setting')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeMenu === 'Setting'
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-200'
                }`}
              >
                Setting
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {activeMenu === 'Campaign' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Campaigns</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  {campaigns.map((campaign) => (
                    <CampaignCardDashboard
                      key={campaign.id}
                      campaign={{
                        id: campaign.id,
                        name: campaign.name || 'Untitled Campaign',
                        symbol: campaign.tokenTicker || 'N/A',
                        description: campaign.shortDescription || 'No description available',
                        image:
                          campaign.imageUrl ||
                          campaign.bannerUrl ||
                          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop',
                        goal: campaign.campaignGoal || 0,
                        category: 'General',
                        tokenMint: campaign.tokenMint || '',
                        mcap: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeMenu === 'Setting' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Switch to dark theme
                      </p>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isDarkMode ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleDisconnectWallet}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </Page>
    </>
  );
}
