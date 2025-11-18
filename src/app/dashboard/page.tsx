/**
 * RabbitRadar Dashboard - Main Page
 */

'use client';

import { useEffect, useState } from 'react';
import DashboardClient from '@/components/DashboardClient';
import BtcDominanceCard from '@/components/BtcDominanceCard';
import { DashboardResponse } from '@/lib/types';

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://rabbit-radar-api.vercel.app';
        const response = await fetch(`${apiUrl}/api/dashboard?window=14&minRank=1&maxRank=1000`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl mb-4">Loading...</div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl mb-4">Failed to load data</div>
        </div>
      </main>
    );
  }

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
          <BtcDominanceCard
            btcDominance={data.marketContext.btcDominance}
            timestamp={data.timestamp}
          />
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
            RabbitRadar tracks the top 1000 coins to identify high-velocity movers with strong momentum.
          </p>
          <p className="mt-2 text-gray-500">
            Powered by CoinGecko API • Data updates every 12 hours
          </p>
        </div>
      </div>
    </main>
  );
}
