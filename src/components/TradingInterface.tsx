import React, { useState } from 'react';
import { Button } from './ui/button';
import { useWallet } from '@jup-ag/wallet-adapter';

interface TradingInterfaceProps {
  campaignSymbol: string;
  campaignName: string;
  currentPrice: number;
  campaignToken: string;
}

const TradingInterface: React.FC<TradingInterfaceProps> = ({
  campaignSymbol,
  campaignName,
  campaignToken,
  currentPrice,
}) => {
  const { publicKey } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleOpenTrade = () => {
    const tradeUrl = new URL(`https://jup.ag/tokens/${campaignToken}`);
    window.open(tradeUrl.toString(), '_blank');
    setIsModalOpen(false);
  };

  const estimatedCost = parseFloat(amount || '0') * currentPrice;

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transition-colors duration-300">
      {/* Trigger Modal Button */}
      <Button
        className="w-full bg-primary text-white font-medium py-1 rounded-lg text-lg"
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Ape ${campaignSymbol}
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg border border-gray-300">
            <h2 className="text-lg font-bold mb-4 text-[#0a0a0a]">
              Ready to Ape ${campaignSymbol}?
            </h2>
            <p className="text-sm text-neutral-800 mb-6">
              Your donation is voluntary. You understand that NiceApe is a facilitator and does not
              guarantee how the recipient will use the funds. A portion of the fees will support{' '}
              <strong>{campaignName}</strong>.
            </p>
            <div className="flex justify-around gap-4">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="w-full border bg-white border-primary hover:bg-primary text-black"
              >
                Cancel
              </Button>
              <Button className="w-full bg-primary text-black" onClick={handleOpenTrade}>
                Ape ${campaignSymbol}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingInterface;
