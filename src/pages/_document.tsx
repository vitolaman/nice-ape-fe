import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/jpeg" href="/logo_niceape.png" />
        <link rel="shortcut icon" type="image/jpeg" href="/logo_niceape.png" />
        <link rel="apple-touch-icon" href="/logo_niceape.png" />
        <meta
          name="description"
          content="NiceApe - Trade tokens, fund causes! Every trade generates fees that go directly to charity."
        />
        <meta property="og:title" content="NiceApe - Trade to Donate" />
        <meta
          property="og:description"
          content="Trade tokens, fund causes! Every trade generates fees that go directly to charity."
        />
        <meta property="og:image" content="/logo_niceape.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NiceApe - Trade to Donate" />
        <meta
          name="twitter:description"
          content="Trade tokens, fund causes! Every trade generates fees that go directly to charity."
        />
        <meta name="twitter:image" content="/logo_niceape.png" />
        <Script src="https://terminal.jup.ag/main-v4.js" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
