import rabbitRadarAPI from '@/lib/api';
import { formatNumber, formatPrice, formatRelativeTime, getVelocityBadge } from '@/lib/utils';
import Link from 'next/link';
import CoinDetailContent from '@/components/CoinDetailContent';

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
          <Link href="/dashboard" className="text-blue-400 hover:underline mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { coin, score } = coinData;
  const velocityBadge = getVelocityBadge(score?.baseVelocity || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/dashboard" className="text-blue-400 hover:underline mb-4 inline-block">
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
            <div className="text-xl font-semibold mt-1">{formatNumber(coin.marketCap)}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm">24h Volume</div>
            <div className="text-xl font-semibold mt-1">{formatNumber(coin.volume24h)}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Base Velocity (14d default)</div>
            <div className="text-xl font-semibold mt-1">{score?.baseVelocity !== null && score?.baseVelocity !== undefined ? Number(score.baseVelocity).toFixed(4) : 'N/A'}</div>
            <div className="text-xs text-gray-500 mt-1">Change window below to update</div>
          </div>
        </div>
      </div>

      {/* Window-Reactive Content */}
      <CoinDetailContent coinId={id} />

      {/* Watch List Actions */}
      <div className="bg-gray-900 rounded-lg p-6 mt-6">
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
