'use client';

/**
 * Expandable Coin Row Component
 * Shows coin data with expandable details on click
 */

import { useState } from 'react';
import Link from 'next/link';
import { CoinData } from '@/lib/types';
import { formatNumber, formatPrice, getScoreColor, getPhaseColor, getVelocityBadge } from '@/lib/utils';

interface CoinRowProps {
  coin: CoinData;
}

export default function CoinRow({ coin }: CoinRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className="border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-6 py-4 font-medium">{coin.rank}</td>
        <td className="px-6 py-4">
          {(() => {
            const velocity = typeof coin.base_velocity === 'string'
              ? parseFloat(coin.base_velocity)
              : coin.base_velocity;

            if (velocity === null || velocity === undefined || isNaN(velocity)) {
              return <span className="text-gray-400">N/A</span>;
            }

            const badge = getVelocityBadge(velocity);
            return (
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${badge.color}`}>
                  {badge.icon} {velocity.toFixed(2)}
                </span>
              </div>
            );
          })()}
        </td>
        <td className="px-6 py-4">
          <Link
            href={`/coin/${coin.coin_id}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-bold">{coin.symbol.toUpperCase()}</div>
            <div className="text-xs text-gray-500">{coin.name}</div>
          </Link>
        </td>
        <td className="px-6 py-4">{formatPrice(coin.price)}</td>
        <td className="px-6 py-4">{formatNumber(coin.market_cap)}</td>
        <td className="px-6 py-4">{formatNumber(coin.volume_24h)}</td>
        <td className="px-6 py-4">
          {(() => {
            const score = typeof coin.rr_score === 'string' ? parseFloat(coin.rr_score) : coin.rr_score;
            if (score === null || isNaN(score)) {
              return <span className="text-gray-400">N/A</span>;
            }
            return (
              <span className={`font-bold ${getScoreColor(score)}`}>
                {score.toFixed(2)}
              </span>
            );
          })()}
        </td>
        <td className="px-6 py-4">
          {coin.phase ? (
            <span className={`capitalize ${getPhaseColor(coin.phase)}`}>
              {coin.phase}
            </span>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </td>
        <td className="px-6 py-4">
          {(() => {
            const days = typeof coin.days_tracking === 'string'
              ? parseInt(coin.days_tracking)
              : coin.days_tracking;

            if (days === null || days === undefined || isNaN(days)) {
              return <span className="text-gray-400">N/A</span>;
            }

            return <span>{days} {days === 1 ? 'day' : 'days'}</span>;
          })()}
        </td>
        <td className="px-6 py-4 text-gray-400">
          {expanded ? '▼' : '▶'}
        </td>
      </tr>

      {expanded && (
        <tr className="bg-gray-50 dark:bg-gray-900 border-t-4 border-blue-500">
          <td colSpan={10} className="px-6 py-6">
            <div className="flex gap-6">
              {/* Left side - Score components grid */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Score Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Consistency Score */}
                <div className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Consistency Score</div>
                  <div className="text-lg font-bold">
                    {coin.consistency_score !== null && !isNaN(parseFloat(String(coin.consistency_score)))
                      ? `${parseFloat(String(coin.consistency_score)).toFixed(2)} / 10`
                      : 'N/A'}
                  </div>
                </div>

                {/* Volume Score */}
                <div className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Volume Score</div>
                  <div className="text-lg font-bold">
                    {coin.volume_score !== null && !isNaN(parseFloat(String(coin.volume_score)))
                      ? `${parseFloat(String(coin.volume_score)).toFixed(2)} / 10`
                      : 'N/A'}
                  </div>
                </div>

                {/* Persistence Score */}
                <div className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Persistence Score</div>
                  <div className="text-lg font-bold">
                    {coin.persistence_score !== null && !isNaN(parseFloat(String(coin.persistence_score)))
                      ? `${parseFloat(String(coin.persistence_score)).toFixed(2)} / 10`
                      : 'N/A'}
                  </div>
                </div>

                {/* Red Flags Penalty */}
                <div className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 hover:border-red-300 dark:hover:border-red-600 transition-colors">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Red Flags Penalty</div>
                  <div className="text-lg font-bold text-red-600">
                    {coin.red_flags_penalty !== null && !isNaN(parseFloat(String(coin.red_flags_penalty)))
                      ? `-${parseFloat(String(coin.red_flags_penalty)).toFixed(2)} pts`
                      : 'N/A'}
                  </div>
                </div>

                {/* Base Velocity */}
                <div className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Base Velocity</div>
                  <div className="text-lg font-bold">
                    {coin.base_velocity !== null && !isNaN(parseFloat(String(coin.base_velocity)))
                      ? `${parseFloat(String(coin.base_velocity)).toFixed(2)} ranks/day`
                      : 'N/A'}
                  </div>
                </div>

                {/* Market Context Multiplier */}
                <div className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Market Context</div>
                  <div className="text-lg font-bold">
                    {coin.market_context_multiplier !== null && !isNaN(parseFloat(String(coin.market_context_multiplier)))
                      ? `${parseFloat(String(coin.market_context_multiplier)).toFixed(2)}x`
                      : 'N/A'}
                  </div>
                </div>
              </div>
              </div>

              {/* Right side - Big RR Score Box */}
              <div className="w-48 p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-xl flex flex-col items-center justify-center text-white">
                <div className="text-sm font-medium mb-2">🐰 RabbitRadar Score</div>
                <div className="text-5xl font-bold">
                  {(() => {
                    const score = typeof coin.rr_score === 'string' ? parseFloat(coin.rr_score) : coin.rr_score;
                    if (score === null || isNaN(score)) {
                      return 'N/A';
                    }
                    return score.toFixed(1);
                  })()}
                </div>
                <div className="text-xs mt-1 opacity-80">out of 100</div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
