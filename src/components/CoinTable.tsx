/**
 * Coin Table Component
 * Displays coins with their ranking and RabbitRadar scores
 */

import { CoinData } from '@/lib/types';
import CoinRow from './CoinRow';

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
            <th className="px-6 py-3">Velocity</th>
            <th className="px-6 py-3">Coin</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Market Cap</th>
            <th className="px-6 py-3">Volume 24h</th>
            <th className="px-6 py-3">RR Score</th>
            <th className="px-6 py-3">Phase</th>
            <th className="px-6 py-3">Days Tracked</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CoinRow key={coin.coin_id} coin={coin} />
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
