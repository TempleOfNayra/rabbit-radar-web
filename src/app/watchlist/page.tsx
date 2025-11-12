import rabbitRadarAPI from '@/lib/api';
import { getScoreColor, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

export const revalidate = 60;

export default async function WatchlistPage() {
  let watchlist;
  let error = null;

  try {
    watchlist = await rabbitRadarAPI.getWatchList();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load watchlist';
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      rising_star: { text: 'Rising Star', color: 'bg-blue-900/30 text-blue-400 border-blue-700' },
      validated: { text: 'Validated', color: 'bg-green-900/30 text-green-400 border-green-700' },
      stalled: { text: 'Stalled', color: 'bg-yellow-900/30 text-yellow-400 border-yellow-700' },
      failed: { text: 'Failed', color: 'bg-red-900/30 text-red-400 border-red-700' },
    };
    return badges[status as keyof typeof badges] || badges.rising_star;
  };

  const calculateGain = (initialRank: number, currentRank: number) => {
    const improvement = initialRank - currentRank;
    const percentGain = (improvement / initialRank) * 100;
    return {
      improvement,
      percentGain,
      isPositive: improvement > 0,
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Watch List 👀</h1>
        <p className="text-gray-400">
          Track high-scoring rabbit candidates and monitor their performance over time.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Stats */}
      {watchlist && watchlist.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Total Tracked</div>
            <div className="text-2xl font-bold mt-1">{watchlist.data.length}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Rising Stars</div>
            <div className="text-2xl font-bold mt-1 text-blue-400">
              {watchlist.data.filter(c => c.status === 'rising_star').length}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Validated</div>
            <div className="text-2xl font-bold mt-1 text-green-400">
              {watchlist.data.filter(c => c.status === 'validated').length}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Avg Score</div>
            <div className="text-2xl font-bold mt-1">
              {(watchlist.data.reduce((sum, c) => sum + (c.current_score || 0), 0) / watchlist.data.length).toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* Watchlist Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {!watchlist || watchlist.data.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">No Coins on Watch List</h2>
            <p className="text-gray-400 mb-6">
              Coins with a RabbitRadar score of 8+ will automatically appear here.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Dashboard
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-sm">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Coin</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Detection Date</th>
                  <th className="px-6 py-4 text-right font-semibold">Initial Rank</th>
                  <th className="px-6 py-4 text-right font-semibold">Current Rank</th>
                  <th className="px-6 py-4 text-right font-semibold">Peak Rank</th>
                  <th className="px-6 py-4 text-right font-semibold">Improvement</th>
                  <th className="px-6 py-4 text-right font-semibold">Score</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {watchlist.data.map((coin) => {
                  const statusBadge = getStatusBadge(coin.status);
                  const gain = calculateGain(coin.initial_rank, coin.current_rank || coin.initial_rank);

                  return (
                    <tr key={coin.coin_id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/coin/${coin.coin_id}`} className="hover:text-blue-400 transition-colors">
                          <div className="font-semibold">{coin.name}</div>
                          <div className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-400">
                        {formatRelativeTime(coin.detection_date)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono">
                        #{coin.initial_rank}
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold">
                        #{coin.current_rank || coin.initial_rank}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-green-400">
                        #{coin.peak_rank || coin.current_rank || coin.initial_rank}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`font-semibold ${gain.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {gain.isPositive ? '↑' : '↓'} {Math.abs(gain.improvement)} ranks
                        </div>
                        <div className="text-xs text-gray-400">
                          {gain.percentGain > 0 ? '+' : ''}{gain.percentGain.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`text-lg font-bold ${getScoreColor(coin.current_score || 0)}`}>
                          {coin.current_score?.toFixed(2) || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500">
                          from {coin.initial_score.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/coin/${coin.coin_id}`}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            View
                          </Link>
                          <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-900/20 border border-blue-800/50 rounded-lg p-6">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <span>ℹ️</span>
          About Watch List Statuses
        </h3>
        <div className="text-sm text-gray-400 space-y-2">
          <p><strong className="text-blue-400">Rising Star:</strong> Newly detected coin with strong momentum (RR Score 8+)</p>
          <p><strong className="text-green-400">Validated:</strong> Maintained improved ranking for 30+ days</p>
          <p><strong className="text-yellow-400">Stalled:</strong> Rank improvement stopped for 14+ days</p>
          <p><strong className="text-red-400">Failed:</strong> Rank dropped significantly from initial detection</p>
        </div>
      </div>
    </div>
  );
}
