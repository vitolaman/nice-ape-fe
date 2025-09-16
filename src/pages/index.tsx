import Head from 'next/head';
import Hero2 from '@/components/Hero2';
import Page2 from '@/components/ui/Page/Page2';
import ActiveCampaigns2 from '@/components/ActiveCampaigns2';

export default function Index() {
  return (
    <>
      <Head>
        <title>NiceApe - Trade to Donate</title>
      </Head>
      <Page2 containerClassName="items-center">
        <Hero2 />
        <div className="relative bg-gradient-to-br from-[#fcfcfc] to-yellow-50/60 drop-shadow-xl border p-6 md:p-8 rounded-3xl w-2/3 my-8 md:my-24">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0a0a0a] mb-8 text-center">
            Launch a Campaign in 3 Easy Steps
          </h3>
          {/* Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-10">
            {/* Step 1: Set Your Goal */}
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <span className="text-2xl" aria-label="target">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="#ffffff"
                      stroke="#CC0000"
                      strokeWidth="3"
                    />
                    <circle cx="16" cy="16" r="8" fill="#CC0000" />
                    <circle cx="16" cy="16" r="3" fill="#ffffff" />
                  </svg>
                </span>
              </div>
              <h4 className="font-semibold text-[#0a0a0a] mb-2">Set Your Goal</h4>
              <p className="text-sm text-neutral-600">Define your fundraising target and cause</p>
            </div>

            {/* Step 2: Create Token */}
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <span className="text-2xl" aria-label="coin">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="#E5E7EB"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    />
                    <circle cx="16" cy="16" r="10" fill="#F3F4F6" />
                    <text
                      x="16"
                      y="21"
                      textAnchor="middle"
                      fontSize="14"
                      fill="#6B7280"
                      fontWeight="bold"
                    >
                      $
                    </text>
                  </svg>
                </span>
              </div>
              <h4 className="font-semibold text-[#0a0a0a] mb-2">Create Token</h4>
              <p className="text-sm text-neutral-600">Launch your unique charity token</p>
            </div>

            {/* Step 3: Receive Donations */}
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <span className="text-2xl" aria-label="heart">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 27.5C16 27.5 5 19.5 5 12.5C5 8.5 8.5 6 12 6C14 6 16 8 16 8C16 8 18 6 20 6C23.5 6 27 8.5 27 12.5C27 19.5 16 27.5 16 27.5Z"
                      fill="#D90368"
                    />
                  </svg>
                </span>
              </div>
              <h4 className="font-semibold text-[#0a0a0a] mb-2">Receive Donations</h4>
              <p className="text-sm text-neutral-600">Trading fees flow directly to your cause</p>
            </div>
          </div>
        </div>
        <ActiveCampaigns2 />
        {/* <PlatformStats /> */}
      </Page2>
    </>
  );
}
