import Page2 from '@/components/ui/Page/Page2';
import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - NiceApe</title>
      </Head>
      <Page2>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#0a0a0a]">Terms of Service</h1>
            </div>

            <div className="bg-white shadow-xl p-12 border border-gray-50 rounded-lg">
              <div className="space-y-8 text-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">1. Introduction</h2>
                  <p>
                    Welcome to NiceApe. By accessing or using our platform, you agree to be bound by
                    these Terms of Use. Please read them carefully before registering or making any
                    donations.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">2. Use of Platform</h2>
                  <p>
                    Our platform facilitates donations between individuals and organizations. We do
                    not guarantee the accuracy, legality, or use of any donation by a recipient.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">3. User Obligations</h2>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>You agree not to use the platform for illegal activities.</li>
                    <li>You agree to provide accurate and truthful information.</li>
                    <li>
                      You are solely responsible for content you upload or campaigns you create.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">4. Donation Disclaimer</h2>
                  <p>
                    We do not verify the legitimacy of every campaign. Donors assume full
                    responsibility for their donations. Refunds are not guaranteed unless required
                    by law.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">5. Platform Fees</h2>
                  <p>NiceApe may charge a platform or service fee on donations.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">6. Termination Clause</h2>
                  <p>
                    We reserve the right to suspend or terminate your account if you violate these
                    Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a]">7. Limitation of Liability</h2>
                  <p>
                    NiceApe is not liable for damages, losses, or misuse of funds by users or
                    donation recipients.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  {/* <p className="text-sm text-gray-500">
                    If you have any questions about these Terms of Service, please contact us at
                    legal@niceape.com
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page2>
    </>
  );
}
