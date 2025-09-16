import Page2 from '@/components/ui/Page/Page2';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About - NiceApe</title>
      </Head>
      <Page2>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#0a0a0a] mb-4">About NiceApe</h1>
              <p className="text-xl text-neutral-600">
                Making the world a better place, one trade at a time 🦍💚
              </p>
            </div>

            <div className="bg-white shadow-xl p-8 border border-gray-50 rounded-lg">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-neutral-600">
                    NiceApe is a revolutionary platform that combines cryptocurrency trading with
                    charitable giving. Every trade on our platform generates fees that go directly
                    to verified charitable causes, making every transaction a force for good.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">How It Works</h2>
                  <ul className="space-y-3 text-neutral-600">
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                      <span>Campaigns create unique tokens for their causes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                      <span>Users trade these tokens on our platform</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                      <span>Trading fees are automatically donated to the cause</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                      <span>Transparency and accountability through blockchain</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">Our Values</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-white to-yellow-100 border border-primary rounded-lg transition-colors duration-300">
                      <div className="text-2xl mb-2">🌍</div>
                      <h3 className="font-semibold text-[#0a0a0a]">Global Impact</h3>
                      <p className="text-sm text-neutral-600">Supporting causes worldwide</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-white to-yellow-100 border border-primary rounded-lg transition-colors duration-300">
                      <div className="text-2xl mb-2">🔒</div>
                      <h3 className="font-semibold text-[#0a0a0a]">Transparency</h3>
                      <p className="text-sm text-neutral-600">Blockchain-verified donations</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-white to-yellow-100 border border-primary rounded-lg transition-colors duration-300">
                      <div className="text-2xl mb-2">🤝</div>
                      <h3 className="font-semibold text-[#0a0a0a]">Community</h3>
                      <p className="text-sm text-neutral-600">Building together for good</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-white to-yellow-100 border border-primary rounded-lg transition-colors duration-300">
                      <div className="text-2xl mb-2">🚀</div>
                      <h3 className="font-semibold text-[#0a0a0a]">Innovation</h3>
                      <p className="text-sm text-neutral-600">Reimagining charitable giving</p>
                    </div>
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
