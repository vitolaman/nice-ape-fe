import Page from '@/components/ui/Page/Page';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - NiceApe</title>
      </Head>
      <Page>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="space-y-8 text-gray-600 dark:text-gray-400">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    1. What Data We Collect
                  </h2>
                  <p>
                    We collect your name, email, donation amount, payment details, and optional
                    campaign information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    2. Why We Collect It
                  </h2>
                  <p>
                    To process donations, manage user accounts, ensure platform security, and comply
                    with legal requirements.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    3. Who We Share It With
                  </h2>
                  <p>
                    We may share data with trusted third parties (e.g., payment processors) to
                    fulfill services. We do not sell your data.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    4. Your Rights
                  </h2>
                  <p>
                    You may request access to, correction of, or deletion of your data at any time
                    by contacting us.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    5. Data Security
                  </h2>
                  <p>
                    We use encryption, secure servers, and limited access controls to protect your
                    data.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    6. Retention Period
                  </h2>
                  <p>
                    We store your data only as long as necessary to provide services and comply with
                    regulations.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  {/* <p className="text-sm text-gray-500">
                    If you have any questions about this Privacy Policy, please contact us at
                    legal@niceape.com
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
