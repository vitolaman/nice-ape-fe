import React, { useState } from 'react';
import Link from 'next/link';
import { formatReadableNumber } from '../lib/format/number';

// Interface definitions remain the same
interface Campaign {
  id: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  goal: number;
  category: string;
  tokenMint: string;
  mcap: number;
}

interface CampaignCardProps {
  campaign: Campaign;
}

// A new, subtle SVG placeholder with a small, centered icon
const SVG_PLACEHOLDER = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 48'>
  <rect width='100%' height='100%' fill='#F3F4F6' />
  <g transform='translate(20, 12)' stroke='#9CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'>
    <path d='M21 4H3C2.4 4 2 4.4 2 5v14c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1z' />
    <circle cx='8' cy='9' r='2' />
    <path d='m2 15l6-6 4 4 4-4 6 6' />
    <line x1='3' y1='3' x2='21' y2='21' />
  </g>
</svg>
`;
const SVG_PLACEHOLDER_URI = `data:image/svg+xml;base64,${Buffer.from(SVG_PLACEHOLDER).toString('base64')}`;

const CampaignCardProfile: React.FC<CampaignCardProps> = ({ campaign }) => {
  const [imageSrc, setImageSrc] = useState(campaign.image);

  const handleImageError = () => {
    setImageSrc(SVG_PLACEHOLDER_URI);
  };

  return (
    <Link href={`/campaign/${campaign.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
        {/* Campaign Image */}
        <div className="relative h-48">
          <img
            src={imageSrc}
            alt={campaign.name}
            onError={handleImageError}
            className="w-full h-full object-cover bg-gray-100 dark:bg-gray-700"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white font-semibold px-3 py-1 rounded-full text-xs shadow-lg">
              ${campaign.symbol}
            </span>
          </div>
        </div>

        {/* The rest of the component remains the same */}
        <div className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
            {campaign.category}
          </span>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2 truncate">
            {campaign.name}
          </h4>
        </div>
      </div>
    </Link>
  );
};

// Icon components remain the same
const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
    />
  </svg>
);
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c.506 0 1.006-.037 1.496-.11M12 3c.506 0 1.006.037 1.496.11M21 12a8.956 8.956 0 01-2.986 6.687M12 3a8.956 8.956 0 00-2.986 6.687M3 12a8.956 8.956 0 012.986-6.687M12 3c-2.456 0-4.665.955-6.313 2.54M21 12c0 2.456-.955 4.665-2.54 6.313M12 21c-2.456 0-4.665-.955-6.313-2.54M3 12c0-2.456.955 4.665 2.54-6.313"
    />
  </svg>
);

export default CampaignCardProfile;
