/**
 * RabbitRadar Dashboard - Main Page
 */

import rabbitRadarAPI from '@/lib/api';
import DashboardClient from '@/components/DashboardClient';
import { formatRelativeTime } from '@/lib/utils';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Dashboard() {
  // Fetch dashboard data (default: rank 100-1000, no score filter, no limit = all coins)
  const data = await rabbitRadarAPI.getDashboard({
    minRank: 100,
    maxRank: 1000,
  });

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🐰 RabbitRadar Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Crypto Ranking Velocity Tracker - Spot the Rabbits Before They Hop
          </p>
        </div>

        {/* Market Context */}
        {data.marketContext && data.marketContext.btcDominance && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg border border-blue-800/50">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-blue-400 font-semibold">BTC Dominance:</span>
                <span className="ml-2 font-bold text-2xl text-white">
                  {typeof data.marketContext.btcDominance === 'number'
                    ? data.marketContext.btcDominance.toFixed(2)
                    : data.marketContext.btcDominance}%
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Updated {formatRelativeTime(data.timestamp)}
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-6 bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-lg border border-green-700/50">
            <div className="text-sm text-green-400 font-semibold uppercase tracking-wide">Total Coins</div>
            <div className="text-3xl font-bold text-white mt-2">{data.count}</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg border border-blue-700/50">
            <div className="text-sm text-blue-400 font-semibold uppercase tracking-wide">Rank Range</div>
            <div className="text-3xl font-bold text-white mt-2">
              {data.filters.minRank} - {data.filters.maxRank}
            </div>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-lg border border-purple-700/50">
            <div className="text-sm text-purple-400 font-semibold uppercase tracking-wide">Showing</div>
            <div className="text-3xl font-bold text-white mt-2">
              {data.filters.limit || data.count} coins
            </div>
          </div>
        </div>

        {/* Coin Table with Filters */}
        <DashboardClient initialCoins={data.data} />

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            RabbitRadar tracks coins ranked 100-1000 to identify high-velocity altcoins.
          </p>
          <p className="mt-2 text-gray-500">
            Powered by CoinGecko API • Data updates every 5 minutes
          </p>
        </div>
      </div>
    </main>
  );
}
