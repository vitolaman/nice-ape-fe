import '@/styles/globals.css';
import { Adapter, UnifiedWalletProvider } from '@jup-ag/wallet-adapter';
import type { AppProps } from 'next/app';
import { Toaster } from 'sonner';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWindowWidthListener } from '@/lib/device';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { ToastProvider } from '@/contexts/ToastProvider';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';

export default function App({ Component, pageProps }: AppProps) {
  const wallets: Adapter[] = useMemo(() => {
    return [
      new BackpackWalletAdapter(),
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
    ].filter((item) => item && item.name && item.icon) as Adapter[];
  }, []);

  const queryClient = useMemo(() => new QueryClient(), []);

  useWindowWidthListener();

  return (
    <ThemeProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <UnifiedWalletProvider
            wallets={wallets}
            config={{
              env: 'mainnet-beta',
              autoConnect: true,
              metadata: {
                name: 'NiceApe',
                description: 'Trade to Donate',
                url: process.env.NEXT_PUBLIC_URL || 'https://jup.ag',
                iconUrls: [process.env.NEXT_PUBLIC_URL + '/favicon.ico'],
              },
              // notificationCallback: WalletNotification,
              theme: 'dark',
              lang: 'en',
            }}
          >
            <Toaster />
            <Component {...pageProps} />
          </UnifiedWalletProvider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
