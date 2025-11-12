/**
 * Coin Table Component
 * Displays coins with their ranking and RabbitRadar scores
 */

import Link from 'next/link';
import { CoinData } from '@/lib/types';
import { formatNumber, formatPrice, getScoreColor, getPhaseColor } from '@/lib/utils';

interface CoinTableProps {
  coins: CoinData[];
}

export default function CoinTable({ coins }: CoinTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3">Rank</th>
            <th className="px-6 py-3">Coin</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Market Cap</th>
            <th className="px-6 py-3">Volume 24h</th>
            <th className="px-6 py-3">RR Score</th>
            <th className="px-6 py-3">Phase</th>
            <th className="px-6 py-3">Days Tracked</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.coin_id}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <td className="px-6 py-4 font-medium">{coin.rank}</td>
              <td className="px-6 py-4">
                <Link
                  href={`/coin/${coin.coin_id}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                {coin.days_tracking !== null ? (
                  <span>{coin.days_tracking} days</span>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {coins.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No coins found matching your criteria.
        </div>
      )}
    </div>
  );
}
