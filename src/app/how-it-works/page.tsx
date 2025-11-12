import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">How RabbitRadar Works 🐰⚡</h1>
        <p className="text-xl text-gray-400">
          Understanding the science behind catching fast-moving cryptocurrencies
        </p>
      </div>

      {/* Core Concept */}
      <section className="mb-12 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-800/50">
        <h2 className="text-2xl font-bold mb-4">🎯 Core Concept</h2>
        <p className="text-gray-300 mb-4">
          RabbitRadar tracks cryptocurrencies climbing rapidly through market cap rankings (200-500 → top 100)
          by analyzing their <strong>velocity of movement</strong>, <strong>consistency</strong>,{' '}
          <strong>volume patterns</strong>, and <strong>persistence</strong>.
        </p>
        <p className="text-gray-300">
          The goal: Catch &ldquo;rabbits&rdquo; - fast-moving coins with <em>legitimate growth potential</em> - before they
          become mainstream, while filtering out pump-and-dump schemes.
        </p>
      </section>

      {/* Scoring System */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">📊 The Scoring System</h2>

        {/* 1. Velocity Consistency */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📈</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">1. Velocity Consistency Score (0-10)</h3>
              <p className="text-gray-400 mb-3">
                Measures how <em>steadily</em> a coin climbs versus erratic movements.
              </p>

              <div className="bg-gray-800/50 rounded p-4 mb-3 font-mono text-sm">
                <div className="text-gray-500 mb-1">Formula:</div>
                <div className="text-blue-400">
                  Consistency = 10 × (1 - (StdDev(daily_changes) / Avg(daily_changes)))
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  Where: daily_change = yesterday_rank - today_rank
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-green-900/20 border border-green-800 rounded p-3">
                  <div className="font-semibold text-green-400">8-10: Very Steady</div>
                  <div className="text-gray-400">Consistent upward climb</div>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-800 rounded p-3">
                  <div className="font-semibold text-yellow-400">5-7: Moderate</div>
                  <div className="text-gray-400">Some volatility</div>
                </div>
                <div className="bg-red-900/20 border border-red-800 rounded p-3">
                  <div className="font-semibold text-red-400">0-4: Erratic</div>
                  <div className="text-gray-400">Suspicious jumps</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Volume Pattern */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📊</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">2. Volume Pattern Analysis (0-10)</h3>
              <p className="text-gray-400 mb-3">
                Detects <em>organic</em> versus <em>manipulated</em> trading volume.
              </p>

              <div className="bg-gray-800/50 rounded p-4 mb-3 font-mono text-sm">
                <div className="text-gray-500 mb-1">Formula:</div>
                <div className="text-blue-400">
                  Volume Quality = (Consistency × Distribution × Lead_Indicator) × 10
                </div>
                <div className="text-gray-500 text-xs mt-2 space-y-1">
                  <div>• Consistency = 1 - (StdDev(volume) / Avg(volume))</div>
                  <div>• Distribution = 1 - (Top_Exchange_Vol / Total_Vol)</div>
                  <div>• Lead_Indicator = Correlation(volume_increase, next_day_price)</div>
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <strong className="text-white">Red Flags:</strong> Single exchange dominance (80%+),
                volume spikes without price correlation, wash trading patterns.
              </div>
            </div>
          </div>
        </div>

        {/* 3. Ranking Persistence */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⏱️</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">3. Ranking Persistence (0-10)</h3>
              <p className="text-gray-400 mb-3">
                Measures how well a coin <em>maintains</em> improved rankings over time.
              </p>

              <div className="bg-gray-800/50 rounded p-4 mb-3 font-mono text-sm">
                <div className="text-gray-500 mb-1">Formula:</div>
                <div className="text-blue-400">
                  Persistence = 10 × (Days_at_improved_rank / Days_since_peak)
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  Tracks if coin holds within ±10% of peak ranking
                </div>
              </div>

              <div className="text-sm text-gray-400">
                High score = <strong className="text-green-400">sustainable growth</strong>. Low score ={' '}
                <strong className="text-red-400">pump and dump</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* 4. Red Flags */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚩</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">4. Red Flags Penalty (0-8 count)</h3>
              <p className="text-gray-400 mb-3">Binary warning system. Each flag adds +1 penalty:</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  '100+ rank jump in <7 days',
                  '40%+ supply in <100 wallets',
                  'Anonymous team',
                  'No GitHub activity (30 days)',
                  'Not on top-10 exchanges',
                  'Telegram pump groups detected',
                  '80%+ volume on one exchange',
                  'No working product',
                ].map((flag, i) => (
                  <div key={i} className="flex items-center gap-2 bg-red-900/10 border border-red-900/30 rounded p-2">
                    <span className="text-red-400">⚠️</span>
                    <span className="text-gray-300">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Base Velocity */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚀</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">5. Base Velocity</h3>
              <p className="text-gray-400 mb-3">Raw ranking improvement speed (ranks per day).</p>

              <div className="bg-gray-800/50 rounded p-4 font-mono text-sm">
                <div className="text-gray-500 mb-1">Formula:</div>
                <div className="text-blue-400">
                  Base Velocity = (Rank_30_days_ago - Current_Rank) / 30
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Score */}
      <section className="mb-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-8 border border-purple-800/50">
        <h2 className="text-2xl font-bold mb-4">🏆 Final RabbitRadar Score</h2>

        <div className="bg-gray-900/50 rounded p-4 mb-4 font-mono text-sm">
          <div className="text-gray-500 mb-2">Formula:</div>
          <div className="text-purple-400 text-base">
            RR Score = Base_Velocity × ((Consistency + Volume + Persistence) / 30) × (1 - (Red_Flags / 8))
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-400">8+</div>
            <div className="text-sm text-gray-300 mt-2">🐰 Strong Rabbit</div>
            <div className="text-xs text-gray-500 mt-1">Auto-tracked</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">6-8</div>
            <div className="text-sm text-gray-300 mt-2">👀 Watch Closely</div>
            <div className="text-xs text-gray-500 mt-1">Promising</div>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">4-6</div>
            <div className="text-sm text-gray-300 mt-2">⚠️ Moderate Risk</div>
            <div className="text-xs text-gray-500 mt-1">Be cautious</div>
          </div>
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-400">&lt;4</div>
            <div className="text-sm text-gray-300 mt-2">❌ Too Risky</div>
            <div className="text-xs text-gray-500 mt-1">Avoid</div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">✨ Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>📊</span> Main Dashboard
            </h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Sortable table with all key metrics</li>
              <li>• Color-coded scores and velocity badges</li>
              <li>• Real-time updates every 5 minutes</li>
              <li>• Filter by rank range (100-1000)</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>🔍</span> Detailed Coin View
            </h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Interactive ranking history charts</li>
              <li>• 5 metric gauge visualizations</li>
              <li>• Red flag warnings with explanations</li>
              <li>• Volume distribution across exchanges</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>👀</span> Watch List
            </h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Auto-tracks all coins scoring 8+</li>
              <li>• Shows detection date and rank journey</li>
              <li>• Status: Rising Star, Validated, Stalled, Failed</li>
              <li>• Running accuracy statistics</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>🏆</span> Trophy Room
            </h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Historical successes caught early</li>
              <li>• Shows original vs current rank</li>
              <li>• Timestamp proof of early detection</li>
              <li>• Accuracy metrics and performance stats</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="mb-12 bg-gray-900 rounded-lg p-8 border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">🎯 Success Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400">
          <div>
            <h3 className="font-semibold text-white mb-2">Primary Goals</h3>
            <ul className="space-y-2 text-sm">
              <li>• Identify coins moving from 200+ to top 50</li>
              <li>• 80%+ accuracy on 8+ scores reaching top 100</li>
              <li>• Alert users avg 30 days before mainstream</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Risk Management</h3>
            <ul className="space-y-2 text-sm">
              <li>• Avoid 90%+ of pump-and-dump schemes</li>
              <li>• Filter out manipulated volume patterns</li>
              <li>• Detect Telegram pump group activity</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-8 border border-green-800/50">
        <h2 className="text-2xl font-bold mb-4">💡 Why This Works</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            ✅ <strong>Catches trends before mainstream attention</strong> - Early detection gives you a
            competitive edge before prices surge.
          </p>
          <p>
            ✅ <strong>Multi-factor analysis filters scams</strong> - Red flags and volume patterns identify
            pump-and-dump schemes.
          </p>
          <p>
            ✅ <strong>Based on proven momentum trading principles</strong> - Velocity, consistency, and
            persistence are time-tested indicators.
          </p>
          <p>
            ✅ <strong>Transparent yet proprietary</strong> - You understand the methodology while maintaining
            RabbitRadar&apos;s analytical edge.
          </p>
          <p>
            ✅ <strong>Historical validation builds credibility</strong> - Trophy Room proves the system works
            with real results.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          Start Tracking Rabbits 🐰
        </Link>
      </div>
    </div>
  );
}
