'use client';

import { useEffect, useState } from 'react';
import WindowSelector from './WindowSelector';
import VelocityChart from './VelocityChart';
import { getScoreColor } from '@/lib/utils';

interface CoinDetailContentProps {
  coinId: string;
}

interface CoinData {
  coin: {
    name: string;
    symbol: string;
    currentRank: number;
    currentPrice: number;
    marketCap: number;
    volume24h: number;
  };
  score: {
    baseVelocity: number;
    rrScore: number;
    consistencyScore: number;
    volumeScore: number;
    persistenceScore: number;
    redFlagsPenalty: number;
    phase: string;
    daysTracking: number;
    window: number;
  };
  history: {
    rankings: unknown[];
    scores: unknown[];
  };
  enhancedScores: unknown;
  dataMaturity: unknown;
}

export default function CoinDetailContent({ coinId }: CoinDetailContentProps) {
  const [window, setWindow] = useState<2 | 3 | 7 | 14 | 30 | 90 | 180 | 270 | 365>(14);
  const [data, setData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoinData() {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://rabbit-radar-api.vercel.app';
        const response = await fetch(`${apiUrl}/api/coins/${coinId}?window=${window}`);

        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching coin data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCoinData();
  }, [coinId, window]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading coin data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { coin, score } = data;

  // Helper functions for score interpretation
  const getVelocityInterpretation = (velocity: number) => {
    if (velocity > 5) return { emoji: '🚀', label: 'Extremely Fast', color: 'text-green-400', desc: 'This coin is climbing rankings at an exceptional pace (5+ ranks/day).' };
    if (velocity > 2) return { emoji: '⚡', label: 'Fast Movement', color: 'text-green-400', desc: 'Strong upward velocity, consistently gaining ranks (2-5 ranks/day).' };
    if (velocity > 0.5) return { emoji: '📈', label: 'Moderate Growth', color: 'text-blue-400', desc: 'Steady progress with moderate ranking improvements (0.5-2 ranks/day).' };
    if (velocity > 0) return { emoji: '🐢', label: 'Slow Growth', color: 'text-yellow-400', desc: 'Minimal upward movement, very slow ranking gains.' };
    return { emoji: '❌', label: 'Declining', color: 'text-red-400', desc: 'Negative velocity - losing rank positions over time.' };
  };

  const velocityInterp = getVelocityInterpretation(score?.baseVelocity || 0);

  return (
    <div>
      {/* Window Selector */}
      <div className="mb-6 bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Time Window</h3>
          <span className="text-sm text-gray-400">
            Analyzing {window} days of data
          </span>
        </div>
        <WindowSelector
          selectedWindow={window}
          onWindowChange={setWindow}
          disabled={loading}
          size="sm"
        />
      </div>

      {/* RabbitRadar Scores - V1 vs V2 Comparison */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">📊 RabbitRadar Scores - A/B Comparison</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* V1 Score (Legacy) */}
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg p-6 border border-blue-800/30">
            <div className="text-center mb-4">
              <div className="text-gray-300 text-sm uppercase tracking-wide mb-1">V1 Score (Current)</div>
              <div className="text-xs text-gray-500 mb-2">0-10 scale</div>
              <div className={`text-5xl font-bold ${getScoreColor(score?.rrScore ?? 0)}`}>
                {score?.rrScore !== null && score?.rrScore !== undefined ? Number(score.rrScore).toFixed(2) : 'N/A'}
              </div>
              <div className="text-gray-400 text-xs mt-2">
                {(score?.rrScore ?? 0) >= 8 ? '🐰 Strong Rabbit' :
                 (score?.rrScore ?? 0) >= 6 ? '👀 Worth Watching' :
                 (score?.rrScore ?? 0) >= 4 ? '⚠️ Moderate' :
                 '❌ Risky'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs">Consistency</div>
                <div className={`text-xl font-bold ${getScoreColor(score?.consistencyScore ?? 0)}`}>
                  {score?.consistencyScore !== null && score?.consistencyScore !== undefined ? Number(score.consistencyScore).toFixed(1) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs">Volume</div>
                <div className={`text-xl font-bold ${getScoreColor(score?.volumeScore ?? 0)}`}>
                  {score?.volumeScore !== null && score?.volumeScore !== undefined ? Number(score.volumeScore).toFixed(1) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs">Persistence</div>
                <div className={`text-xl font-bold ${getScoreColor(score?.persistenceScore ?? 0)}`}>
                  {score?.persistenceScore !== null && score?.persistenceScore !== undefined ? Number(score.persistenceScore).toFixed(1) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs">Red Flags</div>
                <div className={`text-xl font-bold ${
                  (score?.redFlagsPenalty ?? 1) < 0.3 ? 'text-green-400' :
                  (score?.redFlagsPenalty ?? 1) < 0.5 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {score?.redFlagsPenalty !== null && score?.redFlagsPenalty !== undefined ? Number(score.redFlagsPenalty).toFixed(1) : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* V2 Enhanced Score (New) */}
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg p-6 border border-green-800/30">
            <div className="text-center mb-4">
              <div className="text-gray-300 text-sm uppercase tracking-wide mb-1">
                V2 Enhanced Score (New)
                {dataMaturity && (
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${
                    dataMaturity.reliable ? 'bg-green-700' : 'bg-yellow-700'
                  }`}>
                    {dataMaturity.level}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mb-2">0-100 scale</div>
              <div className={`text-5xl font-bold ${
                (enhancedScores?.balancedRRScore?.score ?? 0) >= 70 ? 'text-green-400' :
                (enhancedScores?.balancedRRScore?.score ?? 0) >= 50 ? 'text-blue-400' :
                (enhancedScores?.balancedRRScore?.score ?? 0) >= 30 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {enhancedScores?.balancedRRScore?.score !== null && enhancedScores?.balancedRRScore?.score !== undefined
                  ? enhancedScores.balancedRRScore.score.toFixed(0)
                  : 'N/A'}
              </div>
              <div className="text-gray-400 text-xs mt-2">
                {enhancedScores?.balancedRRScore?.rating || 'Calculating...'}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Momentum</div>
                <div className={`text-lg font-bold ${
                  (enhancedScores?.momentumStrength?.score ?? 0) >= 70 ? 'text-green-400' : 'text-gray-300'
                }`}>
                  {enhancedScores?.momentumStrength?.score !== null && enhancedScores?.momentumStrength?.score !== undefined ? enhancedScores.momentumStrength.score.toFixed(0) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Velocity</div>
                <div className={`text-lg font-bold ${
                  (enhancedScores?.velocityAcceleration?.score ?? 0) >= 70 ? 'text-green-400' : 'text-gray-300'
                }`}>
                  {enhancedScores?.velocityAcceleration?.score !== null && enhancedScores?.velocityAcceleration?.score !== undefined ? enhancedScores.velocityAcceleration.score.toFixed(0) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Volume</div>
                <div className={`text-lg font-bold ${
                  (enhancedScores?.volumeStrength?.score ?? 0) >= 70 ? 'text-green-400' : 'text-gray-300'
                }`}>
                  {enhancedScores?.volumeStrength?.score !== null && enhancedScores?.volumeStrength?.score !== undefined ? enhancedScores.volumeStrength.score.toFixed(0) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Alignment</div>
                <div className={`text-lg font-bold ${
                  (enhancedScores?.volumeRankAlignment?.score ?? 0) >= 70 ? 'text-green-400' : 'text-gray-300'
                }`}>
                  {enhancedScores?.volumeRankAlignment?.score !== null && enhancedScores?.volumeRankAlignment?.score !== undefined ? enhancedScores.volumeRankAlignment.score.toFixed(0) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Liquidity</div>
                <div className={`text-lg font-bold ${
                  (enhancedScores?.liquidity?.score ?? 0) >= 70 ? 'text-green-400' : 'text-gray-300'
                }`}>
                  {enhancedScores?.liquidity?.score !== null && enhancedScores?.liquidity?.score !== undefined ? enhancedScores.liquidity.score.toFixed(0) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Sustain</div>
                <div className={`text-lg font-bold ${
                  (enhancedScores?.sustainability?.score ?? 0) >= 70 ? 'text-green-400' : 'text-gray-300'
                }`}>
                  {enhancedScores?.sustainability?.score !== null && enhancedScores?.sustainability?.score !== undefined ? enhancedScores.sustainability.score.toFixed(0) : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Velocity History Chart */}
      <div className="mb-6">
        <VelocityChart coinId={coinId} window={window} />
      </div>

      {/* Ranking Velocity Breakdown */}
      <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg p-6 mb-6 border border-purple-700/50">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          📊 Ranking Velocity Breakdown
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Visual Movement */}
          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
              Ranking Movement
            </h3>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Started</div>
                <div className="text-4xl font-black text-red-400">
                  #{score?.startRank || rankHistory[0]?.rank || coin.currentRank}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {window}d ago
                </div>
              </div>

              <div className="text-5xl text-blue-400">→</div>

              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Current</div>
                <div className="text-4xl font-black text-green-400">
                  #{score?.currentRank || coin.currentRank}
                </div>
                <div className="text-xs text-gray-500 mt-1">Today</div>
              </div>
            </div>

            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
              <div className="text-xs text-gray-400 mb-1">Total Movement</div>
              <div className="text-3xl font-bold text-green-400">
                {score?.startRank && score?.currentRank
                  ? `${score.startRank > score.currentRank ? '+' : ''}${score.startRank - score.currentRank} ranks`
                  : 'N/A'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                in {score?.daysTracking || window} days
              </div>
            </div>
          </div>

          {/* Right: Velocity Calculation */}
          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
              Velocity Calculation
            </h3>

            <div className="space-y-3 mb-4">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Starting Rank</div>
                <div className="text-2xl font-bold text-gray-300">
                  {score?.startRank || 'N/A'}
                </div>
              </div>

              <div className="text-center text-gray-400">−</div>

              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Current Rank</div>
                <div className="text-2xl font-bold text-gray-300">
                  {score?.currentRank || coin.currentRank}
                </div>
              </div>

              <div className="text-center text-gray-400">÷</div>

              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Days Tracked</div>
                <div className="text-2xl font-bold text-gray-300">
                  {score?.daysTracking || window} days
                </div>
              </div>

              <div className="text-center text-gray-400">=</div>

              <div className="p-4 bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg border border-green-700/50">
                <div className="text-xs text-gray-400 mb-1 text-center">Ranking Velocity</div>
                <div className="text-4xl font-black text-center">
                  <span className={velocityInterp.color}>
                    {score?.baseVelocity !== null && score?.baseVelocity !== undefined
                      ? Number(score.baseVelocity).toFixed(2)
                      : 'N/A'}
                  </span>
                </div>
                <div className="text-sm text-gray-400 text-center mt-1">ranks/day</div>
              </div>
            </div>

            <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
              <p className="text-xs text-gray-300">
                <strong>What this means:</strong> {velocityInterp.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Interpretation Row */}
        <div className={`mt-6 p-4 rounded-lg border-2 ${
          velocityInterp.color === 'text-green-400' ? 'bg-green-900/20 border-green-700' :
          velocityInterp.color === 'text-blue-400' ? 'bg-blue-900/20 border-blue-700' :
          velocityInterp.color === 'text-yellow-400' ? 'bg-yellow-900/20 border-yellow-700' :
          'bg-red-900/20 border-red-700'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{velocityInterp.emoji}</span>
            <div>
              <div className={`text-xl font-bold ${velocityInterp.color}`}>{velocityInterp.label}</div>
              <p className="text-sm text-gray-300 mt-1">{velocityInterp.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
