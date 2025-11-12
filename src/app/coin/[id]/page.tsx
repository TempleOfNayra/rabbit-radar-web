import rabbitRadarAPI from '@/lib/api';
import { formatNumber, formatPrice, getScoreColor, formatRelativeTime, getVelocityBadge } from '@/lib/utils';
import LineChart from '@/components/LineChart';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CoinDetailPage({ params }: PageProps) {
  const { id } = await params;

  let coinData;
  let error = null;

  try {
    coinData = await rabbitRadarAPI.getCoinDetails(id);

    // Validate response structure
    if (!coinData || !coinData.coin) {
      error = 'Invalid API response structure';
      coinData = null;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load coin data';
    coinData = null;
  }

  if (error || !coinData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-400 text-lg">{error || 'Coin not found'}</p>
          <Link href="/" className="text-blue-400 hover:underline mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { coin, score, history } = coinData;
  const rankHistory = history.rankings;
  const scoreHistory = history.scores;
  const velocityBadge = getVelocityBadge(score?.baseVelocity || 0);

  // Prepare chart data
  const rankData = rankHistory.map((r) => r.rank);
  const rankLabels = rankHistory.map((r) => new Date(r.timestamp).toLocaleDateString());

  const priceData = rankHistory.map((r) => r.price);
  const volumeData = rankHistory.map((r) => r.volume_24h);

  const rrScoreData = scoreHistory.map((s) => s.rr_score);
  const consistencyData = scoreHistory.map((s) => s.consistency_score);
  const volumeScoreData = scoreHistory.map((s) => s.volume_score);
  const persistenceData = scoreHistory.map((s) => s.persistence_score);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{coin.name}</h1>
              <span className="text-xl text-gray-400">{coin.symbol.toUpperCase()}</span>
              <span className="text-2xl">{velocityBadge.icon}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Rank #{coin.currentRank}</span>
              <span>•</span>
              <span>Tracking: {score?.daysTracking || 0} days</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded ${
                score?.phase === 'accumulation' ? 'bg-green-900/30 text-green-400' :
                score?.phase === 'markup' ? 'bg-blue-900/30 text-blue-400' :
                score?.phase === 'distribution' ? 'bg-yellow-900/30 text-yellow-400' :
                'bg-red-900/30 text-red-400'
              }`}>
                {score?.phase?.toUpperCase() || 'UNKNOWN'}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold">{formatPrice(coin.currentPrice)}</div>
            <div className="text-sm text-gray-400 mt-1">
              Updated {formatRelativeTime(coinData.timestamp)}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Market Cap</div>
            <div className="text-xl font-semibold mt-1">${formatNumber(coin.marketCap)}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm">24h Volume</div>
            <div className="text-xl font-semibold mt-1">${formatNumber(coin.volume24h)}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Base Velocity</div>
            <div className="text-xl font-semibold mt-1">{score?.baseVelocity?.toFixed(4) || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* RabbitRadar Score */}
      <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg p-6 mb-6 border border-blue-800/30">
        <div className="text-center">
          <div className="text-gray-300 text-sm uppercase tracking-wide mb-2">RabbitRadar Score</div>
          <div className={`text-6xl font-bold ${getScoreColor(score?.rrScore || 0)}`}>
            {score?.rrScore?.toFixed(2) || 'N/A'}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            {(score?.rrScore ?? 0) >= 8 ? '🐰 Strong Rabbit Candidate' :
             (score?.rrScore ?? 0) >= 6 ? '👀 Worth Watching' :
             (score?.rrScore ?? 0) >= 4 ? '⚠️ Moderate Interest' :
             '❌ Too Risky/Slow'}
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs">Consistency</div>
            <div className={`text-2xl font-bold ${getScoreColor(score?.consistencyScore || 0)}`}>
              {score?.consistencyScore?.toFixed(1) || 'N/A'}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs">Volume</div>
            <div className={`text-2xl font-bold ${getScoreColor(score?.volumeScore || 0)}`}>
              {score?.volumeScore?.toFixed(1) || 'N/A'}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs">Persistence</div>
            <div className={`text-2xl font-bold ${getScoreColor(score?.persistenceScore || 0)}`}>
              {score?.persistenceScore?.toFixed(1) || 'N/A'}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs">Red Flags</div>
            <div className={`text-2xl font-bold ${
              (score?.redFlagsPenalty ?? 1) < 0.3 ? 'text-green-400' :
              (score?.redFlagsPenalty ?? 1) < 0.5 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {score?.redFlagsPenalty?.toFixed(1) || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Rank History */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Rank History (30 Days)</h2>
          <LineChart
            data={rankData}
            labels={rankLabels}
            color="#10b981"
            height={250}
            yAxisLabel="Rank"
            inverse={true}
          />
          <p className="text-xs text-gray-500 mt-2">Lower rank = Better position</p>
        </div>

        {/* Price History */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Price History (30 Days)</h2>
          <LineChart
            data={priceData}
            labels={rankLabels}
            color="#3b82f6"
            height={250}
            yAxisLabel="Price (USD)"
          />
        </div>

        {/* Volume History */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">24h Volume History</h2>
          <LineChart
            data={volumeData}
            labels={rankLabels}
            color="#f59e0b"
            height={250}
            yAxisLabel="Volume (USD)"
          />
        </div>

        {/* RR Score Trend */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">RabbitRadar Score Trend</h2>
          <LineChart
            data={rrScoreData}
            labels={rankLabels}
            color="#8b5cf6"
            height={250}
            yAxisLabel="RR Score"
          />
        </div>
      </div>

      {/* Score Components Trends */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Score Components Over Time</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Consistency Score</h3>
            <LineChart
              data={consistencyData}
              color="#10b981"
              height={150}
              showGrid={false}
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Volume Score</h3>
            <LineChart
              data={volumeScoreData}
              color="#3b82f6"
              height={150}
              showGrid={false}
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Persistence Score</h3>
            <LineChart
              data={persistenceData}
              color="#f59e0b"
              height={150}
              showGrid={false}
            />
          </div>
        </div>
      </div>

      {/* Watch List Actions */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Add to Watch List
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Set Alert
          </button>
          <a
            href={`https://www.coingecko.com/en/coins/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            View on CoinGecko
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
