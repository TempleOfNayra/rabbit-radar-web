/**
 * RabbitRadar Dashboard - Main Page
 */

import rabbitRadarAPI from '@/lib/api';
import CoinTable from '@/components/CoinTable';
import { formatRelativeTime } from '@/lib/utils';

export default async function Dashboard() {
  // Fetch dashboard data (default: rank 100-1000, no score filter)
  const data = await rabbitRadarAPI.getDashboard({
    minRank: 100,
    maxRank: 1000,
    limit: 100, // Show first 100 coins
  });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            🐰 RabbitRadar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crypto Ranking Velocity Tracker - Spot the Rabbits Before They Hop
          </p>
        </div>

        {/* Market Context */}
        {data.marketContext && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">BTC Dominance:</span>
                <span className="ml-2 font-bold text-lg">
                  {data.marketContext.btcDominance.toFixed(2)}%
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Updated {formatRelativeTime(data.timestamp)}
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Coins</div>
            <div className="text-2xl font-bold">{data.count}</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-sm text-gray-600 dark:text-gray-400">Rank Range</div>
            <div className="text-2xl font-bold">
              {data.filters.minRank} - {data.filters.maxRank}
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-sm text-gray-600 dark:text-gray-400">Showing</div>
            <div className="text-2xl font-bold">
              {data.filters.limit || data.count} coins
            </div>
          </div>
        </div>

        {/* Coin Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <CoinTable coins={data.data} />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            RabbitRadar tracks coins ranked 100-1000 to identify high-velocity altcoins.
          </p>
          <p className="mt-2">
            Powered by CoinGecko API • Data updates every 5 minutes
          </p>
        </div>
      </div>
    </main>
  );
}
