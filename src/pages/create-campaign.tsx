import CreateCampaignForm from '@/components/CreateCampaignForm';
import Head from 'next/head';
import Page2 from '@/components/ui/Page/Page2';

export default function CreateCampaign() {
  return (
    <>
      <Head>
        <title>Create Campaign - NiceApe</title>
      </Head>
      <Page2>
        <div className="py-16 px-4 w-2/3">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0a0a0a]">Create Your Donation Campaign</h1>
            <p className="text-lg text-neutral-800">
              Launch a token for your cause and start making a difference
            </p>
          </div>
          <CreateCampaignForm />
        </div>
      </Page2>
    </>
  );
}
