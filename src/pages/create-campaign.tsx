import Page from '@/components/ui/Page/Page';
import CreateCampaignForm from '@/components/CreateCampaignForm';
import Head from 'next/head';

export default function CreateCampaign() {
  return (
    <>
      <Head>
        <title>Create Campaign - NiceApe</title>
      </Head>
      <Page>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Create Your Donation Campaign
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Launch a token for your cause and start making a difference
              </p>
            </div>
            <CreateCampaignForm />
          </div>
        </div>
      </Page>
    </>
  );
}
