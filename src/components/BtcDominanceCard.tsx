'use client';

import { useState } from 'react';
import { formatRelativeTime } from '@/lib/utils';

interface BtcDominanceCardProps {
  btcDominance: number | string;
  timestamp: string;
}

export default function BtcDominanceCard({ btcDominance, timestamp }: BtcDominanceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dominanceValue = typeof btcDominance === 'number'
    ? btcDominance
    : parseFloat(btcDominance);

  return (
    <div
      className={`mb-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg border border-blue-800/50 overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? 'p-0' : 'p-6'
      }`}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between hover:bg-blue-800/20 transition-colors ${
          isExpanded ? 'p-6 pb-4' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-blue-400 font-semibold">BTC Dominance:</span>
          <span className="font-bold text-2xl text-white">
            {dominanceValue.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Updated {formatRelativeTime(timestamp)}
          </div>
          <svg
            className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expandable Graph Section */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          overflow: 'hidden',
        }}
      >
        <div className="px-6 pb-6">
          {/* Graph Container */}
          <div className="mt-4 bg-gray-900/50 rounded-lg p-6 border border-blue-700/30">
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Graph area */}
              <div className="ml-8 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full border-t border-gray-800/50" />
                  ))}
                </div>

                {/* BTC Dominance visualization */}
                <div className="absolute inset-0 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-yellow-500/50 to-yellow-400/20 rounded-t-lg relative"
                    style={{
                      height: `${dominanceValue}%`,
                      transition: 'height 0.8s ease-out',
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-yellow-400/10 blur-xl" />

                    {/* Top line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 shadow-lg shadow-yellow-500/50" />

                    {/* Value label */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500/90 text-gray-900 px-3 py-1 rounded-md text-sm font-bold whitespace-nowrap">
                      {dominanceValue.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* X-axis label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                  Current BTC Market Dominance
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <span className="text-gray-400">Bitcoin Dominance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                <span className="text-gray-400">Altcoin Share: {(100 - dominanceValue).toFixed(2)}%</span>
              </div>
            </div>

            {/* Info text */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              Higher BTC dominance typically indicates risk-off behavior. Lower dominance suggests altcoin season.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
