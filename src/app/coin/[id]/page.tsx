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
          <Link href="/dashboard" className="text-blue-400 hover:underline mt-4 inline-block">
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
  const velocityData = scoreHistory.map((s) => s.base_velocity);

  // Helper functions for score interpretation
  const getVelocityInterpretation = (velocity: number) => {
    if (velocity > 5) return { emoji: '🚀', label: 'Extremely Fast', color: 'text-green-400', desc: 'This coin is climbing rankings at an exceptional pace (5+ ranks/day).' };
    if (velocity > 2) return { emoji: '⚡', label: 'Fast Movement', color: 'text-green-400', desc: 'Strong upward velocity, consistently gaining ranks (2-5 ranks/day).' };
    if (velocity > 0.5) return { emoji: '📈', label: 'Moderate Growth', color: 'text-blue-400', desc: 'Steady progress with moderate ranking improvements (0.5-2 ranks/day).' };
    if (velocity > 0) return { emoji: '🐢', label: 'Slow Growth', color: 'text-yellow-400', desc: 'Minimal upward movement, very slow ranking gains.' };
    return { emoji: '❌', label: 'Declining', color: 'text-red-400', desc: 'Negative velocity - losing rank positions over time.' };
  };

  const getConsistencyInterpretation = (score: number) => {
    if (score >= 8) return { emoji: '✅', label: 'Excellent', color: 'text-green-400', desc: 'Very consistent upward trajectory with minimal erratic movements. This suggests organic, sustainable growth.' };
    if (score >= 6) return { emoji: '👍', label: 'Good', color: 'text-blue-400', desc: 'Generally consistent movement with some minor fluctuations. Still shows strong patterns.' };
    if (score >= 4) return { emoji: '⚠️', label: 'Moderate', color: 'text-yellow-400', desc: 'Mixed patterns with noticeable volatility. Some erratic movements detected.' };
    return { emoji: '❌', label: 'Poor', color: 'text-red-400', desc: 'Highly erratic with inconsistent patterns. Could indicate manipulation or unstable market interest.' };
  };

  const getVolumeInterpretation = (score: number) => {
    if (score >= 8) return { emoji: '✅', label: 'Excellent', color: 'text-green-400', desc: 'Volume patterns appear highly organic. Well-distributed across exchanges with healthy volume-price correlation.' };
    if (score >= 6) return { emoji: '👍', label: 'Good', color: 'text-blue-400', desc: 'Generally healthy volume patterns with good exchange distribution. Minor concerns at most.' };
    if (score >= 4) return { emoji: '⚠️', label: 'Moderate', color: 'text-yellow-400', desc: 'Some concerning volume patterns detected. May indicate concentrated exchange activity or wash trading signals.' };
    return { emoji: '🚨', label: 'Poor', color: 'text-red-400', desc: 'Suspicious volume patterns detected. Possible wash trading, single-exchange concentration, or price-volume decoupling.' };
  };

  const getPersistenceInterpretation = (score: number) => {
    if (score >= 8) return { emoji: '💎', label: 'Excellent', color: 'text-green-400', desc: 'Maintains rank improvements consistently. Shows strong holding power and sustained interest.' };
    if (score >= 6) return { emoji: '👍', label: 'Good', color: 'text-blue-400', desc: 'Generally holds gains well with minor pullbacks. Demonstrates resilience.' };
    if (score >= 4) return { emoji: '⚠️', label: 'Moderate', color: 'text-yellow-400', desc: 'Struggles to maintain rank gains. Frequent slippage after climbing.' };
    return { emoji: '📉', label: 'Poor', color: 'text-red-400', desc: 'Consistently fails to hold rank improvements. Quick pump followed by dump pattern.' };
  };

  const getRedFlagsInterpretation = (penalty: number) => {
    if (penalty >= 0.8) return { emoji: '🚨', label: 'Critical', color: 'text-red-400', desc: 'Multiple severe red flags detected. High risk of scam or manipulation.', severity: 'CRITICAL' };
    if (penalty >= 0.5) return { emoji: '⚠️', label: 'High Risk', color: 'text-orange-400', desc: 'Significant warning signs present. Proceed with extreme caution.', severity: 'HIGH' };
    if (penalty >= 0.3) return { emoji: '⚡', label: 'Moderate Risk', color: 'text-yellow-400', desc: 'Some concerning indicators detected. Due diligence required.', severity: 'MODERATE' };
    return { emoji: '✅', label: 'Low Risk', color: 'text-green-400', desc: 'Minimal red flags. Appears relatively safe from obvious manipulation.', severity: 'LOW' };
  };

  const velocityInterp = getVelocityInterpretation(score?.baseVelocity || 0);
  const consistencyInterp = getConsistencyInterpretation(score?.consistencyScore || 0);
  const volumeInterp = getVolumeInterpretation(score?.volumeScore || 0);
  const persistenceInterp = getPersistenceInterpretation(score?.persistenceScore || 0);
  const redFlagsInterp = getRedFlagsInterpretation(score?.redFlagsPenalty || 0);

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

      {/* Detailed Score Analysis */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 mb-6 border border-purple-700/50">
        <h2 className="text-2xl font-bold mb-6 text-center">📊 Detailed Score Analysis</h2>

        {/* Base Velocity Analysis */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{velocityInterp.emoji}</span>
            <div>
              <h3 className="text-xl font-bold">Base Velocity: {score?.baseVelocity?.toFixed(4) || 'N/A'} ranks/day</h3>
              <span className={`text-sm font-semibold ${velocityInterp.color}`}>{velocityInterp.label}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{velocityInterp.desc}</p>

          {/* Velocity Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Velocity Over Time</h4>
            <LineChart
              data={velocityData}
              labels={rankLabels}
              color="#8b5cf6"
              height={180}
              yAxisLabel="Ranks/Day"
            />
          </div>

          <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
            <p className="text-sm text-gray-300">
              <strong>What this means:</strong> Base velocity measures how quickly this coin is climbing through the rankings.
              Higher velocity indicates stronger market interest and momentum. However, extremely high velocity can sometimes indicate
              pump activity, which is why we combine it with other factors.
            </p>
          </div>
        </div>

        {/* Consistency Score Analysis */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{consistencyInterp.emoji}</span>
            <div>
              <h3 className="text-xl font-bold">Consistency Score: {score?.consistencyScore?.toFixed(2) || 'N/A'}/10</h3>
              <span className={`text-sm font-semibold ${consistencyInterp.color}`}>{consistencyInterp.label}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{consistencyInterp.desc}</p>

          {/* Consistency Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Consistency Over Time</h4>
            <LineChart
              data={consistencyData}
              labels={rankLabels}
              color="#10b981"
              height={180}
              yAxisLabel="Score (0-10)"
            />
          </div>

          <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
            <p className="text-sm text-gray-300">
              <strong>What this means:</strong> Consistency measures how steady the ranking improvements are.
              High scores indicate smooth, predictable growth patterns typical of organic interest. Low scores suggest erratic
              movements that could indicate manipulation, pump-and-dump schemes, or unstable market sentiment.
            </p>
          </div>
        </div>

        {/* Volume Score Analysis */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{volumeInterp.emoji}</span>
            <div>
              <h3 className="text-xl font-bold">Volume Score: {score?.volumeScore?.toFixed(2) || 'N/A'}/10</h3>
              <span className={`text-sm font-semibold ${volumeInterp.color}`}>{volumeInterp.label}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{volumeInterp.desc}</p>

          {/* Volume Score Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Volume Pattern Score Over Time</h4>
            <LineChart
              data={volumeScoreData}
              labels={rankLabels}
              color="#3b82f6"
              height={180}
              yAxisLabel="Score (0-10)"
            />
          </div>

          <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
            <p className="text-sm text-gray-300">
              <strong>What this means:</strong> Volume analysis detects wash trading and manipulation. We check:
            </p>
            <ul className="text-sm text-gray-300 mt-2 ml-4 space-y-1">
              <li>• <strong>Exchange Distribution:</strong> Is volume spread across multiple exchanges or concentrated on one?</li>
              <li>• <strong>Volume-Price Correlation:</strong> Does volume increase with price movements naturally?</li>
              <li>• <strong>Volume Consistency:</strong> Are there suspicious spikes or patterns?</li>
            </ul>
          </div>
        </div>

        {/* Persistence Score Analysis */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{persistenceInterp.emoji}</span>
            <div>
              <h3 className="text-xl font-bold">Persistence Score: {score?.persistenceScore?.toFixed(2) || 'N/A'}/10</h3>
              <span className={`text-sm font-semibold ${persistenceInterp.color}`}>{persistenceInterp.label}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{persistenceInterp.desc}</p>

          {/* Persistence Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Persistence Over Time</h4>
            <LineChart
              data={persistenceData}
              labels={rankLabels}
              color="#f59e0b"
              height={180}
              yAxisLabel="Score (0-10)"
            />
          </div>

          <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
            <p className="text-sm text-gray-300">
              <strong>What this means:</strong> Persistence measures whether the coin maintains its ranking improvements over time.
              Coins that quickly climb but immediately fall back are red flags. Strong persistence indicates sustainable growth
              and genuine market interest rather than temporary pumps.
            </p>
          </div>
        </div>

        {/* Red Flags Analysis */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{redFlagsInterp.emoji}</span>
            <div>
              <h3 className="text-xl font-bold">Red Flags Penalty: {score?.redFlagsPenalty?.toFixed(2) || 'N/A'}</h3>
              <span className={`text-sm font-semibold ${redFlagsInterp.color}`}>
                {redFlagsInterp.severity} - {redFlagsInterp.label}
              </span>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{redFlagsInterp.desc}</p>

          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
            <p className="text-sm text-gray-300 mb-2">
              <strong>Red Flag Detection System:</strong> We check for 8 major warning signs:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300 mt-3">
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Anonymous Team:</strong> No identifiable developers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Telegram Pump Groups:</strong> Coordinated buying</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Single Exchange:</strong> 80%+ volume on one exchange</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Wash Trading:</strong> Suspicious volume patterns</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Low Liquidity:</strong> Thin order books</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Massive Supply:</strong> Unrealistic token economics</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Clone Project:</strong> Copy of existing project</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">▸</span>
                <span><strong>Unrealistic Claims:</strong> Guaranteed returns promised</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              * Each detected flag reduces the final score. Penalty multiplier ranges from 0 (many flags) to 1 (clean).
            </p>
          </div>
        </div>

        {/* Final Score Calculation */}
        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg p-6 border border-blue-700/50">
          <h3 className="text-xl font-bold mb-4 text-center">🎯 Final RabbitRadar Score Calculation</h3>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
              <span className="text-gray-300">Base Velocity (raw speed)</span>
              <span className="font-bold text-purple-400">{score?.baseVelocity?.toFixed(4) || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
              <span className="text-gray-300">× Consistency Score (0-10)</span>
              <span className="font-bold text-green-400">{score?.consistencyScore?.toFixed(2) || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
              <span className="text-gray-300">× Volume Score (0-10)</span>
              <span className="font-bold text-blue-400">{score?.volumeScore?.toFixed(2) || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
              <span className="text-gray-300">× Persistence Score (0-10)</span>
              <span className="font-bold text-yellow-400">{score?.persistenceScore?.toFixed(2) || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
              <span className="text-gray-300">× Red Flags Penalty (0-1)</span>
              <span className={`font-bold ${redFlagsInterp.color}`}>{score?.redFlagsPenalty?.toFixed(2) || 'N/A'}</span>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg">
              <span className="text-lg font-bold text-white">Final RabbitRadar Score</span>
              <span className={`text-3xl font-bold ${getScoreColor(score?.rrScore || 0)}`}>
                {score?.rrScore?.toFixed(2) || 'N/A'}
              </span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
            <p className="text-sm text-gray-300">
              <strong>Score Interpretation:</strong>
            </p>
            <ul className="text-sm text-gray-300 mt-2 space-y-1">
              <li>• <strong className="text-green-400">8.0-10.0:</strong> 🐰 Strong Rabbit - High confidence, excellent momentum</li>
              <li>• <strong className="text-blue-400">6.0-7.9:</strong> 👀 Worth Watching - Good potential, monitor closely</li>
              <li>• <strong className="text-yellow-400">4.0-5.9:</strong> ⚠️ Moderate Interest - Proceed with caution</li>
              <li>• <strong className="text-red-400">0.0-3.9:</strong> ❌ Too Risky - Likely manipulation or poor fundamentals</li>
            </ul>
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
