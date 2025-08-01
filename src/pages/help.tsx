import Page from '@/components/ui/Page/Page';
import Head from 'next/head';

export default function Help() {
  return (
    <>
      <Head>
        <title>Help & Support - NiceApe</title>
      </Head>
      <Page>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Help & Support
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Get help with using NiceApe
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-6">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        How do I create a campaign?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Connect your wallet and click &quot;Launch Campaign&quot; to create a token
                        for your cause. You&apos;ll need to provide campaign details, set a
                        fundraising goal, and submit it for review.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        How are donations distributed?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        A percentage of each trade goes directly to the campaign&apos;s designated
                        charity wallet. All transactions are recorded on the blockchain for full
                        transparency.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        What wallets are supported?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        We support all major Solana wallets including Phantom, Solflare, and
                        Backpack. Make sure you have SOL for transaction fees.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        How do I verify a campaign is legitimate?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        All campaigns go through a verification process. Look for the verified badge
                        and check the campaign&apos;s social media and documentation links.
                      </p>
                    </div>

                    <div className="pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        What are the trading fees?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Trading fees vary by campaign but typically range from 1-5% of the trade
                        value. These fees go directly to the charitable cause.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Need More Help?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Can&apos;t find what you&apos;re looking for? Reach out to our support team:
                  </p>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p>🐦 Twitter: @NiceApeApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
