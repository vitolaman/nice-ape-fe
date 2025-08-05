import { useState, useEffect, useMemo } from 'react';
import { useWallet } from '@jup-ag/wallet-adapter';
import Page from '@/components/ui/Page/Page';
import Head from 'next/head';
import { generateCodeChallenge, generateCodeVerifier, shortenAddress } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeProvider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { workerApi } from '@/lib/worker-api';
import CampaignCard from '@/components/CampaignCard';
import CampaignCardProfile from '@/components/CampaignCardProfile';

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
  charityWalletAddress: string;
  tokenMint: string;
  transactionSignature: string;
  websiteUrl: string | null;
  xHandle: string | null;
  telegramHandle: string | null;
  userId: string;
};

export default function Profile() {
  const { publicKey, disconnect } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [userProfile, setUserProfile] = useState({
    displayName: '',
    xHandle: '',
    bio: '',
    avatar: '🦍',
    id: '',
  });

  const [userStats] = useState({
    totalTrades: 47,
    volumeTraded: 1250,
    charityGenerated: 62.5,
    mealsfunded: 125,
  });

  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);

  useEffect(() => {
    if (address) {
      workerApi
        .userAuth(address)
        .then((data: unknown) => {
          const response = data as {
            success: boolean;
            user: {
              id: string;
              walletAddress: string;
              displayName?: string;
              xHandle?: string;
              bio?: string;
            };
            isNewUser: boolean;
            message: string;
          };

          setUserProfile({
            displayName: response.user.displayName || '',
            xHandle: response.user.xHandle || '',
            bio: response.user.bio || '',
            avatar: '🦍',
            id: response.user.id || '',
          });

          if (response.success && response.user.id) {
            localStorage.setItem('userId', response.user.id);
            localStorage.setItem('userWallet', response.user.walletAddress);
          }
        })
        .catch((error) => {
          console.error('Authentication error:', error);
        });
    }
  }, [address]);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';

    if (!userId) return;

    workerApi
      .getCampaignsByCreator(userId)
      .then((data) => {
        setCampaigns(data as Campaign[]);
      })
      .catch((error) => {
        console.error('Authentication error:', error);
      });
  }, [address]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return;

    const verifier = localStorage.getItem('x_code_verifier');
    if (!verifier) {
      toast.error('No verifier found');
      return;
    }

    const fetchTwitterProfile = async () => {
      try {
        const res = await fetch('/api/twitter-callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            verifier,
          }),
        });

        if (!res.ok) throw new Error('Twitter login failed');
        const data: any = await res.json();

        setUserProfile((prev) => ({
          ...prev,
          x_handle: `@${data.user.data.username}`,
        }));

        const userId = localStorage.getItem('userId') || '';

        await workerApi.updateUser(userId, {
          xHandle: `@${data.user.data.username}`,
          avatarUrl: `${data.user.data.profile_image_url}`,
        });

        toast.success(`Connected to @${data.user.data.username}`);
      } catch (error: any) {
        toast.error(error.message || 'Failed to connect Twitter');
      }
    };

    fetchTwitterProfile();
  }, []);

  const handleSaveProfile = async () => {
    const userId = localStorage.getItem('userId') || '';
    setIsEditing(false);
    await workerApi.updateUser(userId, {
      bio: userProfile.bio,
      displayName: userProfile.displayName,
    });
  };

  const handleDisconnectWallet = async () => {
    await disconnect();
    // Redirect to home or login page
    window.location.href = '/';
  };

  return (
    <>
      <Head>
        <title>Profile - NiceApe</title>
      </Head>
      <Page>
        <div className={`max-w-4xl mx-auto p-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className={`p-2 rounded-lg ${isDarkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-gray-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            <button
              onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditing
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : isDarkMode
                    ? 'text-blue-400 hover:bg-gray-800'
                    : 'text-blue-600 hover:bg-gray-100'
              }`}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          {/* Profile Section */}
          <div
            className={`rounded-xl p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{userProfile.avatar}</div>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={userProfile.displayName}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, displayName: e.target.value })
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      X Handle
                    </label>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-1 rounded-lg text-lg"
                      type="button"
                      onClick={async () => {
                        const codeVerifier = generateCodeVerifier(); // Use PKCE
                        localStorage.setItem('x_code_verifier', codeVerifier); // Store for later
                        const codeChallenge = await generateCodeChallenge(codeVerifier);

                        const oauthUrl = new URL('https://twitter.com/i/oauth2/authorize');
                        oauthUrl.searchParams.set('response_type', 'code');
                        oauthUrl.searchParams.set(
                          'client_id',
                          'NEVOM3hRNmRiaU5Cb3BnRm9aWG86MTpjaQ'
                        );
                        oauthUrl.searchParams.set(
                          'redirect_uri',
                          'https://www.niceape.app/twitter-handler'
                        );
                        oauthUrl.searchParams.set('scope', 'tweet.read users.read offline.access');
                        oauthUrl.searchParams.set('state', 'edit-profile');
                        oauthUrl.searchParams.set('code_challenge', codeChallenge);
                        oauthUrl.searchParams.set('code_challenge_method', 'S256');

                        window.location.href = oauthUrl.toString();
                      }}
                    >
                      Connect to X
                    </Button>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      About
                    </label>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border resize-none ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{userProfile.displayName}</h2>
                  <p className={`text-blue-500 mb-3`}>{userProfile.xHandle}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {userProfile.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Connected Wallet */}
          {address && (
            <div
              className={`rounded-xl p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-bold">Connected Wallet</h3>
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <span className="font-mono">{shortenAddress(address)}</span>
                <div className="flex gap-2">
                  <button
                    className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Page>
    </>
  );
}
