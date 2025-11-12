import rabbitRadarAPI from '@/lib/api';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

export const revalidate = 300; // 5 minutes

export default async function TrophyRoomPage() {
  let watchlist;
  let error = null;

  try {
    watchlist = await rabbitRadarAPI.getWatchList();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load data';
  }

  // Filter for successful coins (validated status and significant improvement)
  const successfulCoins = watchlist?.data.filter(coin => {
    const improvement = coin.initial_rank - (coin.current_rank || coin.initial_rank);
    const percentGain = (improvement / coin.initial_rank) * 100;
    return (coin.status === 'validated' || percentGain > 30);
  }) || [];

  // Sort by improvement percentage
  successfulCoins.sort((a, b) => {
    const gainA = ((a.initial_rank - (a.current_rank || a.initial_rank)) / a.initial_rank) * 100;
    const gainB = ((b.initial_rank - (b.current_rank || b.initial_rank)) / b.initial_rank) * 100;
    return gainB - gainA;
  });

  // Calculate stats
  const totalCaught = successfulCoins.length;
  const avgImprovement = successfulCoins.length > 0
    ? successfulCoins.reduce((sum, coin) => {
        return sum + ((coin.initial_rank - (coin.current_rank || coin.initial_rank)) / coin.initial_rank) * 100;
      }, 0) / successfulCoins.length
    : 0;

  const top100Grads = successfulCoins.filter(coin => (coin.current_rank || coin.initial_rank) <= 100).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Trophy Room 🏆</h1>
        <p className="text-gray-400">
          Historical successes caught early by RabbitRadar. Proof of concept in action.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-700/20 border border-yellow-700/50 rounded-lg p-6">
          <div className="text-yellow-400 text-sm uppercase tracking-wide">Total Caught</div>
          <div className="text-4xl font-bold mt-2">{totalCaught}</div>
          <div className="text-xs text-yellow-400/70 mt-1">Successful predictions</div>
        </div>

        <div className="bg-gradient-to-br from-green-900/30 to-green-700/20 border border-green-700/50 rounded-lg p-6">
          <div className="text-green-400 text-sm uppercase tracking-wide">Avg Improvement</div>
          <div className="text-4xl font-bold mt-2">{avgImprovement.toFixed(1)}%</div>
          <div className="text-xs text-green-400/70 mt-1">Rank position gain</div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 border border-purple-700/50 rounded-lg p-6">
          <div className="text-purple-400 text-sm uppercase tracking-wide">Top 100 Grads</div>
          <div className="text-4xl font-bold mt-2">{top100Grads}</div>
          <div className="text-xs text-purple-400/70 mt-1">Reached top 100</div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/20 border border-blue-700/50 rounded-lg p-6">
          <div className="text-blue-400 text-sm uppercase tracking-wide">Detection Rate</div>
          <div className="text-4xl font-bold mt-2">
            {totalCaught > 0 ? ((top100Grads / totalCaught) * 100).toFixed(0) : 0}%
          </div>
          <div className="text-xs text-blue-400/70 mt-1">Success accuracy</div>
        </div>
      </div>

      {/* Trophy Cards */}
      {successfulCoins.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-semibold mb-2">No Trophies Yet</h2>
          <p className="text-gray-400 mb-6">
            Successful predictions will appear here. Keep watching for rabbits!
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Browse Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {successfulCoins.map((coin, index) => {
            const improvement = coin.initial_rank - (coin.current_rank || coin.initial_rank);
            const percentGain = (improvement / coin.initial_rank) * 100;
            const peakImprovement = coin.initial_rank - (coin.peak_rank || coin.current_rank || coin.initial_rank);
            const peakPercentGain = (peakImprovement / coin.initial_rank) * 100;

            // Award medals for top 3
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';

            return (
              <div
                key={coin.coin_id}
                className={`bg-gray-900 rounded-lg p-6 border ${
                  index < 3
                    ? 'border-yellow-600/50 bg-gradient-to-r from-gray-900 to-yellow-900/10'
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Medal */}
                    <div className="text-4xl">{medal}</div>

                    {/* Coin Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          href={`/coin/${coin.coin_id}`}
                          className="text-2xl font-bold hover:text-blue-400 transition-colors"
                        >
                          {coin.name}
                        </Link>
                        <span className="text-gray-400">{coin.symbol.toUpperCase()}</span>
                        {coin.status === 'validated' && (
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700">
                            ✓ Validated
                          </span>
                        )}
                      </div>

                      {/* Journey */}
                      <div className="flex items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Detected at</span>
                          <span className="font-mono font-semibold">#{coin.initial_rank}</span>
                        </div>
                        <div className="text-gray-600">→</div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Peak</span>
                          <span className="font-mono font-semibold text-green-400">
                            #{coin.peak_rank || coin.current_rank || coin.initial_rank}
                          </span>
                        </div>
                        <div className="text-gray-600">→</div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Current</span>
                          <span className="font-mono font-semibold text-blue-400">
                            #{coin.current_rank || coin.initial_rank}
                          </span>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Detection Date</div>
                          <div className="text-sm font-medium">{formatRelativeTime(coin.detection_date)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Initial Score</div>
                          <div className="text-sm font-medium">{coin.initial_score.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Peak Gain</div>
                          <div className="text-sm font-medium text-green-400">
                            +{peakPercentGain.toFixed(1)}% ({peakImprovement} ranks)
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Current Gain</div>
                          <div className="text-sm font-medium text-blue-400">
                            +{percentGain.toFixed(1)}% ({improvement} ranks)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-4">
                    <Link
                      href={`/coin/${coin.coin_id}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Methodology Info */}
      <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Trophy Criteria</h2>
        <div className="text-gray-400 space-y-2 text-sm">
          <p>
            <strong className="text-white">🏆 Trophies</strong> are awarded to coins that were detected early by RabbitRadar
            and achieved significant ranking improvements.
          </p>
          <p>
            <strong className="text-white">Qualification:</strong> Coins must be validated (30+ days of sustained improvement)
            or have gained 30%+ in ranking position from initial detection.
          </p>
          <p>
            <strong className="text-white">Ranking:</strong> Trophies are sorted by percentage gain from initial detection
            to current rank. Medals 🥇🥈🥉 are awarded to top 3 performers.
          </p>
          <p>
            <strong className="text-white">Proof of Concept:</strong> This page demonstrates RabbitRadar&apos;s ability to identify
            fast-moving cryptocurrencies before they become mainstream.
          </p>
        </div>
      </div>
    </div>
  );
}
