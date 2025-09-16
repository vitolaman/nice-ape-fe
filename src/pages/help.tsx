import Page2 from '@/components/ui/Page/Page2';
import Head from 'next/head';

export default function Help() {
  return (
    <>
      <Head>
        <title>Help & Support - NiceApe</title>
      </Head>
      <Page2>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#0a0a0a]">Help & Support</h1>
              <p className="text-xl text-neutral-800 mt-4">Get help with using NiceApe</p>
            </div>

            <div className="bg-white shadow-xl p-12 border border-gray-50 rounded-lg">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-8 text-[#0a0a0a]">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-6">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
                        How do I create a campaign?
                      </h3>
                      <p className="text-neutral-800">
                        Connect your wallet and click &quot;Launch Campaign&quot; to create a token
                        for your cause. You&apos;ll need to provide campaign details, set a
                        fundraising goal, and submit it for review.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
                        How are donations distributed?
                      </h3>
                      <p className="text-neutral-800">
                        A percentage of each trade goes directly to the campaign&apos;s designated
                        charity wallet. All transactions are recorded on the blockchain for full
                        transparency.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
                        What wallets are supported?
                      </h3>
                      <p className="text-neutral-800">
                        We support all major Solana wallets including Phantom, Solflare, and
                        Backpack. Make sure you have SOL for transaction fees.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
                        How do I verify a campaign is legitimate?
                      </h3>
                      <p className="text-neutral-800">
                        All campaigns go through a verification process. Look for the verified badge
                        and check the campaign&apos;s social media and documentation links.
                      </p>
                    </div>

                    <div className="pb-4">
                      <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
                        What are the trading fees?
                      </h3>
                      <p className="text-neutral-800">
                        Trading fees vary by campaign but typically range from 1-5% of the trade
                        value. These fees go directly to the charitable cause.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">Need More Help?</h2>
                  <p className="text-neutral-800 mb-4">
                    Can&apos;t find what you&apos;re looking for? Reach out to our support team:
                  </p>
                  <div className="space-y-2 text-neutral-800">
                    <p>🐦 Twitter: @NiceApeApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page2>
    </>
  );
}
