'use client';

import { useState } from 'react';
import Link from 'next/link';

type Section = 'partners' | 'technical' | 'investors';

export default function PartnersPage() {
  const [activeSection, setActiveSection] = useState<Section>('partners');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-400 hover:underline text-sm">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🐰 RabbitRadar
          </h1>
          <p className="text-gray-400 mt-2">Comprehensive Information for Partners & Investors</p>
        </div>

        <div className="flex gap-6">
          {/* Side Navigation */}
          <nav className="w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Sections
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('partners')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === 'partners'
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    For Partners
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('technical')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === 'technical'
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Technical Details
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('investors')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === 'investors'
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    For Investors
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* Content Area */}
          <main className="flex-1">
            <div className="bg-gray-900 rounded-lg p-8">
              {activeSection === 'partners' && <PartnersSection />}
              {activeSection === 'technical' && <TechnicalSection />}
              {activeSection === 'investors' && <InvestorsSection />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FOR PARTNERS SECTION
// ============================================================================

function PartnersSection() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold mb-6">For Partners: Understanding RabbitRadar</h2>

      {/* The Hook */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">The Missed Opportunity Problem</h3>
        <p className="text-gray-300 text-lg mb-4">
          By the time everyone knows about a cryptocurrency opportunity, it&rsquo;s already too late. The massive gains happen before the coin appears on most people&rsquo;s radar.
        </p>
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-800/50 rounded-lg p-6 my-6">
          <p className="text-xl font-semibold text-orange-300 mb-2">Real Example:</p>
          <p className="text-gray-300">
            A coin climbs from rank #500 to #100 over 3 weeks. During this time, most traders don&rsquo;t notice—they&rsquo;re watching price charts.
            By the time it hits major news sites and price explodes, the easy 5-10x gains are over.
          </p>
        </div>
        <p className="text-gray-300 text-lg">
          Traditional crypto tracking focuses on price movements. <strong className="text-white">RabbitRadar identifies emerging opportunities 1-2 weeks earlier</strong> by tracking what matters: market positioning velocity.
        </p>
      </section>

      {/* Core Insight */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">The Core Insight: Why Ranking Velocity?</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-red-400 mb-3">❌ Traditional Approach</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• Tracks price changes</li>
              <li>• Monitors trading volume</li>
              <li>• Reacts to news and hype</li>
              <li>• Catches opportunities late</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-800/50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-green-400 mb-3">✅ RabbitRadar Approach</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• Tracks <strong>ranking position</strong> changes</li>
              <li>• Measures <strong>velocity</strong> (ranks/day)</li>
              <li>• Identifies momentum before price moves</li>
              <li>• Catches &ldquo;rabbits&rdquo; early</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-300 text-lg mb-4">
          <strong className="text-white">Key Insight:</strong> A coin moving from rank #500 → #200 in 10 days signals emerging market interest BEFORE massive price movements occur.
        </p>

        <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-6 my-6">
          <h4 className="text-lg font-semibold text-blue-300 mb-3">Why Rankings Matter More Than Price:</h4>
          <ul className="space-y-2 text-gray-300">
            <li><strong className="text-white">1. Relative Performance:</strong> Rankings show performance vs. ALL coins in the market, not just absolute price</li>
            <li><strong className="text-white">2. Market Share Signal:</strong> Climbing ranks = capturing market share from other projects</li>
            <li><strong className="text-white">3. Early Momentum:</strong> Ranking improvements precede major price movements by days/weeks</li>
            <li><strong className="text-white">4. Context-Independent:</strong> Works in bull or bear markets—we track relative positioning</li>
          </ul>
        </div>
      </section>

      {/* RabbitRadar Score */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">The RabbitRadar Score: Not Just Speed</h3>

        <p className="text-gray-300 text-lg mb-6">
          We don&rsquo;t just track velocity. We analyze the <strong className="text-white">quality of movement</strong> to filter out manipulation and identify genuine opportunities.
        </p>

        <div className="space-y-6">
          {/* Velocity */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🚀</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-purple-400 mb-2">Base Velocity</h4>
                <p className="text-gray-300 mb-3">
                  Raw ranking improvement speed (ranks/day). A coin moving from #500 → #400 in 10 days has a velocity of -10 ranks/day.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Interpretation:</strong> Negative = climbing (good), Positive = falling (bad)
                </div>
              </div>
            </div>
          </div>

          {/* Consistency */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📈</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-400 mb-2">Consistency Score (0-10)</h4>
                <p className="text-gray-300 mb-3">
                  Measures smooth, steady growth vs. erratic pumps. High consistency indicates organic interest. Low consistency suggests manipulation.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-green-900/20 border border-green-800/50 rounded p-3">
                    <div className="text-sm font-semibold text-green-400 mb-1">High Score (8-10)</div>
                    <div className="text-xs text-gray-400">Steady linear climb, sustainable growth</div>
                  </div>
                  <div className="bg-red-900/20 border border-red-800/50 rounded p-3">
                    <div className="text-sm font-semibold text-red-400 mb-1">Low Score (0-3)</div>
                    <div className="text-xs text-gray-400">Erratic jumps, pump-and-dump pattern</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Volume */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📊</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-blue-400 mb-2">Volume Score (0-10)</h4>
                <p className="text-gray-300 mb-3">
                  Analyzes trading volume patterns to detect organic vs. manipulated activity.
                </p>
                <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4 mt-4">
                  <div className="text-sm font-semibold text-blue-300 mb-2">What We Detect:</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>Wash Trading:</strong> High volume with no price action</li>
                    <li>• <strong>Exchange Concentration:</strong> 80%+ volume on single exchange</li>
                    <li>• <strong>Volume-Price Correlation:</strong> Natural vs. artificial patterns</li>
                    <li>• <strong>Multi-Exchange Validation:</strong> Cross-reference across platforms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Persistence */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💎</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-yellow-400 mb-2">Persistence Score (0-10)</h4>
                <p className="text-gray-300 mb-3">
                  Measures ability to maintain ranking improvements over time. True &ldquo;rabbits&rdquo; hold their gains.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-green-900/20 border border-green-800/50 rounded p-3">
                    <div className="text-sm font-semibold text-green-400 mb-1">High Persistence</div>
                    <div className="text-xs text-gray-400">Holds gains, establishes new support levels</div>
                  </div>
                  <div className="bg-red-900/20 border border-red-800/50 rounded p-3">
                    <div className="text-sm font-semibold text-red-400 mb-1">Low Persistence</div>
                    <div className="text-xs text-gray-400">Quick reversals, pump-and-dump</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Red Flags */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🚨</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-red-400 mb-2">Red Flags Penalty (0-100 points)</h4>
                <p className="text-gray-300 mb-3">
                  Automated detection of manipulation, scams, and high-risk indicators.
                </p>
                <div className="bg-red-900/20 border border-red-800/50 rounded p-4 mt-4">
                  <div className="text-sm font-semibold text-red-300 mb-2">Automated Detection:</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>Extreme Pumps:</strong> Single-day rank jump &gt; 100 positions (30 pts)</li>
                    <li>• <strong>Exchange Concentration:</strong> 80%+ volume on one exchange (20 pts)</li>
                    <li>• <strong>Pump Group Activity:</strong> Telegram monitoring, coordinated buying (0-15 pts)</li>
                    <li>• <strong>No GitHub Activity:</strong> Dead development (3 pts)</li>
                    <li>• <strong>Not on Top Exchanges:</strong> Limited liquidity (1 pt)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Formula */}
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-8 mt-8">
          <h4 className="text-2xl font-bold text-center mb-4 text-purple-300">Final RabbitRadar Score</h4>
          <div className="text-center font-mono text-lg text-white mb-6">
            RR Score = Base Velocity × ((Consistency + Volume + Persistence) / 30) × (1 - Red Flags / 100)
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
            <div className="bg-green-900/30 rounded p-3">
              <div className="font-bold text-green-400">8.0-10.0</div>
              <div className="text-xs text-gray-400">Strong Rabbit</div>
            </div>
            <div className="bg-blue-900/30 rounded p-3">
              <div className="font-bold text-blue-400">6.0-7.9</div>
              <div className="text-xs text-gray-400">Worth Watching</div>
            </div>
            <div className="bg-yellow-900/30 rounded p-3">
              <div className="font-bold text-yellow-400">4.0-5.9</div>
              <div className="text-xs text-gray-400">Moderate Risk</div>
            </div>
            <div className="bg-red-900/30 rounded p-3">
              <div className="font-bold text-red-400">0.0-3.9</div>
              <div className="text-xs text-gray-400">Too Risky</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Phase System */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">Two-Phase Detection System</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-800/50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-green-400 mb-3">Phase 1: Early Detection (Days 1-21)</h4>
            <div className="text-gray-300 space-y-3">
              <p><strong className="text-white">Threshold:</strong> RR Score ≥ 5.0</p>
              <p><strong className="text-white">Goal:</strong> Catch emerging opportunities quickly</p>
              <p className="text-sm">During the first 3 weeks, we use a lower threshold to identify potential rabbits early while building historical data.</p>
              <div className="bg-green-900/20 rounded p-3 mt-4 text-sm">
                <strong className="text-green-300">Focus:</strong> Velocity signals, preliminary patterns, watch list candidates
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-800/50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-purple-400 mb-3">Phase 2: Validation (Days 22+)</h4>
            <div className="text-gray-300 space-y-3">
              <p><strong className="text-white">Threshold:</strong> RR Score ≥ 6.0</p>
              <p><strong className="text-white">Goal:</strong> Validate sustained momentum</p>
              <p className="text-sm">After 3 weeks, we have enough data to confirm genuine rabbits and filter false positives.</p>
              <div className="bg-purple-900/20 rounded p-3 mt-4 text-sm">
                <strong className="text-purple-300">Requirements:</strong> Proven consistency, sustained velocity, clean red flags
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Context */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">Market Context Intelligence</h3>

        <p className="text-gray-300 text-lg mb-6">
          RabbitRadar adjusts scoring based on overall market conditions to account for different trading environments.
        </p>

        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-yellow-400 mb-4">BTC Dominance Analysis</h4>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📉</div>
              <div>
                <strong className="text-white">Low BTC Dominance (&lt;40%):</strong> Altcoin season—money flowing into alts. Higher score multiplier.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">📈</div>
              <div>
                <strong className="text-white">High BTC Dominance (&gt;50%):</strong> Risk-off behavior—money in BTC. Lower score multiplier.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚖️</div>
              <div>
                <strong className="text-white">Trend Direction:</strong> Rising dominance = reducing multiplier. Falling dominance = increasing multiplier.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Rigor */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">Our Commitment to Rigor</h3>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">🔍 Multi-Factor Validation</h4>
            <p className="text-gray-300">
              Every coin must pass multiple independent checks. A high velocity score alone isn&rsquo;t enough—we require strong consistency, clean volume patterns, and proven persistence.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">🤖 Automated Detection</h4>
            <p className="text-gray-300">
              Our red flag system continuously monitors for manipulation signals: pump groups, wash trading, exchange concentration, and development activity. No manual review bias.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">📊 Data-Driven Thresholds</h4>
            <p className="text-gray-300">
              All scoring parameters are based on statistical analysis of historical patterns, not arbitrary guesses. Thresholds are tunable and continuously refined as we accumulate data.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">🎯 Transparent Methodology</h4>
            <p className="text-gray-300">
              Everything is documented. Every formula is explained. No black boxes. Partners can audit our approach and understand exactly how scores are calculated.
            </p>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section>
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">The Opportunity</h3>

        <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-800/50 rounded-lg p-8">
          <h4 className="text-xl font-semibold text-green-400 mb-4">Who Needs Early Signals?</h4>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <div className="text-3xl mb-2">👤</div>
              <h5 className="font-semibold text-white mb-2">Retail Traders</h5>
              <p className="text-sm">Individual investors looking for edge in a crowded market</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💼</div>
              <h5 className="font-semibold text-white mb-2">Crypto Funds</h5>
              <p className="text-sm">Systematic strategies need data-driven signals</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🏢</div>
              <h5 className="font-semibold text-white mb-2">Institutions</h5>
              <p className="text-sm">Market intelligence for portfolio managers</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-green-800/50">
            <p className="text-lg text-gray-300">
              <strong className="text-white">The Edge:</strong> By focusing on ranking velocity instead of price, RabbitRadar provides a 1-2 week head start on identifying coins with genuine, sustainable momentum before the crowd notices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// TECHNICAL DETAILS SECTION
// ============================================================================

function TechnicalSection() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold mb-6">Technical Details: The Mathematics</h2>

      <p className="text-gray-300 text-lg mb-8">
        This section provides the exact mathematical formulas used to calculate RabbitRadar scores.
        All formulas are implemented in our production system with comprehensive NaN protection and edge case handling.
      </p>

      {/* Base Velocity */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-purple-300 mb-2">1. Base Velocity</h3>
          <p className="text-gray-400 text-sm">Raw ranking improvement speed (ranks/day)</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">Formula:</h4>
          <div className="bg-gray-900 rounded p-4 font-mono text-green-400 text-lg mb-4">
            Base_Velocity = (Rank_N_Days_Ago - Current_Rank) / N_Days
          </div>

          <div className="space-y-3 text-gray-300">
            <div>
              <strong className="text-white">Interpretation:</strong>
              <ul className="ml-6 mt-2 space-y-1 text-sm">
                <li>• Negative values = climbing (lower rank = better position)</li>
                <li>• Positive values = falling in rankings</li>
                <li>• Example: From rank 500 → 400 in 10 days = -10 ranks/day</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4 mt-4">
              <strong className="text-blue-300">Velocity Categories:</strong>
              <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm">
                <div>• &lt; -5: 🚀 Rocket (extremely fast)</div>
                <div>• -5 to -2: ⚡ Fast (strong momentum)</div>
                <div>• -2 to -0.5: 📈 Rising (moderate growth)</div>
                <div>• -0.5 to 0.5: → Stable (little movement)</div>
                <div>• &gt; 0.5: 📉 Falling/Dropping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consistency Score */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border border-green-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-green-300 mb-2">2. Consistency Score (0-10)</h3>
          <p className="text-gray-400 text-sm">Measures steady growth vs erratic movements</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">Formula:</h4>
          <div className="bg-gray-900 rounded p-4 font-mono text-green-400 mb-4">
            <div className="mb-2">Consistency_Score = 10 × max(0, 1 - (σ / |μ|))</div>
            <div className="text-sm text-gray-500">Where:</div>
            <div className="ml-4 text-sm">
              <div>σ = Standard Deviation of daily rank changes</div>
              <div>μ = Average of daily rank changes</div>
            </div>
          </div>

          <div className="space-y-4 text-gray-300">
            <div>
              <strong className="text-white">Statistical Components:</strong>
              <div className="bg-gray-900 rounded p-4 mt-2 font-mono text-sm text-green-400">
                <div className="mb-2">Average (μ) = Σ(daily_changes) / n</div>
                <div className="mb-2">Variance = Σ((x - μ)²) / n</div>
                <div>Standard Deviation (σ) = √Variance</div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-800/50 rounded p-4">
              <strong className="text-green-300">Interpretation:</strong>
              <ul className="ml-6 mt-2 space-y-1 text-sm">
                <li>• High score (8-10): Low standard deviation, steady climb</li>
                <li>• Medium score (4-7): Moderate volatility, acceptable patterns</li>
                <li>• Low score (0-3): High standard deviation, erratic behavior</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4">
              <strong className="text-blue-300">Edge Cases:</strong>
              <ul className="ml-6 mt-2 space-y-1 text-sm">
                <li>• If |μ| &lt; 0.1: Return 0 (insufficient movement)</li>
                <li>• Result clamped to [0, 10] range</li>
                <li>• NaN and Infinity protected</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Score */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-blue-300 mb-2">3. Volume Score (0-10)</h3>
          <p className="text-gray-400 text-sm">Detects organic vs manipulated trading volume</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">Composite Formula:</h4>
          <div className="bg-gray-900 rounded p-4 font-mono text-green-400 text-sm mb-4">
            <div className="mb-2">Volume_Score = (0.4×VC + 0.3×ED + 0.3×LI) × 10</div>
            <div className="text-gray-500 mt-2">Components:</div>
            <div className="ml-4 mt-1">
              <div>VC = Volume Consistency</div>
              <div>ED = Exchange Distribution</div>
              <div>LI = Lead Indicator (volume-price correlation)</div>
            </div>
          </div>

          <div className="space-y-6 text-gray-300">
            {/* Volume Consistency */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-semibold text-blue-400 mb-2">A. Volume Consistency (VC)</h5>
              <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400 mb-2">
                VC = max(0, 1 - (σ_volume / μ_volume))
              </div>
              <p className="text-sm">
                Measures stability of daily trading volume. High consistency = organic patterns.
                High volatility = potential manipulation.
              </p>
            </div>

            {/* Exchange Distribution */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h5 className="font-semibold text-purple-400 mb-2">B. Exchange Distribution (ED)</h5>
              <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400 mb-2">
                ED = 1 - (Max_Exchange_Volume / Total_Volume)
              </div>
              <p className="text-sm mb-2">
                Penalizes single-exchange dominance (wash trading indicator).
              </p>
              <div className="bg-red-900/20 border border-red-800/50 rounded p-3 text-xs mt-2">
                <strong className="text-red-300">Red Flag:</strong> If one exchange has &gt;80% volume → High manipulation risk
              </div>
            </div>

            {/* Lead Indicator */}
            <div className="border-l-4 border-green-500 pl-4">
              <h5 className="font-semibold text-green-400 mb-2">C. Lead Indicator (LI)</h5>
              <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400 mb-2">
                <div>LI = normalize(ρ(Volume[t], Price[t+1]), -1, 1)</div>
                <div className="text-gray-500 text-xs mt-1">ρ = Pearson correlation coefficient</div>
              </div>
              <p className="text-sm mb-2">
                Measures if volume today predicts price tomorrow (natural market behavior).
              </p>
              <div className="bg-gray-900 rounded p-3 mt-2 text-xs">
                <strong className="text-green-300">Pearson Correlation:</strong>
                <div className="font-mono text-green-400 mt-2">
                  ρ = Σ((x_i - x̄)(y_i - ȳ)) / √(Σ(x_i - x̄)² × Σ(y_i - ȳ)²)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4 mt-6">
            <strong className="text-blue-300">Weighted Average Logic:</strong>
            <ul className="ml-6 mt-2 space-y-1 text-sm text-gray-300">
              <li>• 40% weight on volume consistency (most important)</li>
              <li>• 30% weight on exchange distribution (manipulation check)</li>
              <li>• 30% weight on lead indicator (natural behavior validation)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Persistence Score */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-2">4. Persistence Score (0-10)</h3>
          <p className="text-gray-400 text-sm">Ability to maintain improved rankings</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">Formula:</h4>
          <div className="bg-gray-900 rounded p-4 font-mono text-green-400 text-sm mb-4">
            <div className="mb-2">Persistence_Score = 10 × min(1, Days_At_Improved_Rank / Days_Since_Peak)</div>
            <div className="text-gray-500 mt-3">With tolerance range:</div>
            <div className="ml-4 mt-1">
              <div>Tolerance = Peak_Rank × 0.10 (±10%)</div>
              <div>Upper_Bound = Peak_Rank + Tolerance</div>
              <div>Lower_Bound = max(1, Peak_Rank - Tolerance)</div>
            </div>
          </div>

          <div className="space-y-4 text-gray-300">
            <div className="bg-yellow-900/20 border border-yellow-800/50 rounded p-4">
              <strong className="text-yellow-300">Grace Period:</strong>
              <p className="text-sm mt-2">
                If Days_Since_Peak &lt; 7: Return default score of 10.0
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Rationale: Too early to judge persistence. Give benefit of doubt during early phase.
              </p>
            </div>

            <div className="bg-gray-900 rounded p-4">
              <strong className="text-white">Example Calculation:</strong>
              <div className="mt-3 text-sm space-y-2">
                <div>• Peak Rank: 100</div>
                <div>• Tolerance: 100 × 0.10 = 10</div>
                <div>• Acceptable Range: 90-110</div>
                <div>• Days in range: 20 days</div>
                <div>• Days since peak: 25 days</div>
                <div className="text-green-400 font-mono">• Score = 10 × (20 / 25) = 8.0</div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4">
              <strong className="text-blue-300">Interpretation:</strong>
              <ul className="ml-6 mt-2 space-y-1 text-sm">
                <li>• 8-10: Excellent persistence, holds gains well</li>
                <li>• 5-7: Good persistence, some volatility</li>
                <li>• 0-4: Poor persistence, pump-and-dump pattern</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-red-300 mb-2">5. Red Flags Penalty (0-100)</h3>
          <p className="text-gray-400 text-sm">Cumulative penalty points for risk factors</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">Penalty System:</h4>
          <div className="bg-gray-900 rounded p-4 font-mono text-green-400 text-sm mb-4">
            Total_Penalty = Σ(Individual_Flag_Weights) ∈ [0, 100]
          </div>

          <div className="space-y-4">
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-red-300">1. Extreme Pump</strong>
                <span className="text-red-400 font-mono">30 points</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Threshold: Single-day rank jump ≥ 100 positions in last 7 days
              </div>
              <div className="bg-gray-900 rounded p-2 font-mono text-xs text-green-400">
                if (rank_jump ≥ 100) → penalty += 30
              </div>
            </div>

            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-4">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-orange-300">2. Exchange Concentration</strong>
                <span className="text-orange-400 font-mono">20 points</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Threshold: Single exchange has ≥ 80% of total volume
              </div>
              <div className="bg-gray-900 rounded p-2 font-mono text-xs text-green-400">
                <div>concentration = max_volume / total_volume × 100</div>
                <div>if (concentration ≥ 80%) → penalty += 20</div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-yellow-300">3. Pump Group Detection</strong>
                <span className="text-yellow-400 font-mono">0-15 points</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Telegram monitoring: Coordinated buying signals
              </div>
              <div className="bg-gray-900 rounded p-2 font-mono text-xs text-green-400">
                penalty += (15 × confidence_score / 100)
              </div>
            </div>

            <div className="bg-gray-700 border-l-4 border-gray-500 p-4">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-gray-300">4. No GitHub Activity</strong>
                <span className="text-gray-400 font-mono">3 points</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Threshold: No commits in last 90 days
              </div>
            </div>

            <div className="bg-gray-700 border-l-4 border-gray-500 p-4">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-gray-300">5. Not on Top Exchanges</strong>
                <span className="text-gray-400 font-mono">1 point</span>
              </div>
              <div className="text-sm text-gray-400">
                Missing from: Binance, Coinbase, Kraken, etc.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Context */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-indigo-300 mb-2">6. Market Context Multiplier (0.5 - 1.5)</h3>
          <p className="text-gray-400 text-sm">Adjusts scoring based on market conditions</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">BTC Dominance Based:</h4>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded p-4 font-mono text-sm text-green-400 mb-4">
              <div className="mb-2">if (BTC_Dominance &lt; 40%) → Multiplier = 1.5 (Bull Market)</div>
              <div className="mb-2">else if (BTC_Dominance &gt; 50%) → Multiplier = 0.5 (Bear Market)</div>
              <div>else → Multiplier = 1.0 (Neutral)</div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-900/20 border border-green-800/50 rounded p-4 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-bold text-green-400 mb-1">Bull Market</div>
                <div className="text-sm text-gray-400 mb-2">BTC Dom &lt; 40%</div>
                <div className="font-mono text-green-300">× 1.5</div>
                <div className="text-xs text-gray-500 mt-2">Altcoin season, more lenient</div>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4 text-center">
                <div className="text-2xl mb-2">⚖️</div>
                <div className="font-bold text-blue-400 mb-1">Neutral</div>
                <div className="text-sm text-gray-400 mb-2">BTC Dom 40-50%</div>
                <div className="font-mono text-blue-300">× 1.0</div>
                <div className="text-xs text-gray-500 mt-2">Balanced market</div>
              </div>

              <div className="bg-red-900/20 border border-red-800/50 rounded p-4 text-center">
                <div className="text-2xl mb-2">📉</div>
                <div className="font-bold text-red-400 mb-1">Bear Market</div>
                <div className="text-sm text-gray-400 mb-2">BTC Dom &gt; 50%</div>
                <div className="font-mono text-red-300">× 0.5</div>
                <div className="text-xs text-gray-500 mt-2">Risk-off, stricter criteria</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Score */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-purple-300 mb-2">7. Final RabbitRadar Score</h3>
          <p className="text-gray-400 text-sm">Complete calculation with all components</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">Master Formula:</h4>

          <div className="bg-gray-900 rounded p-6 mb-6">
            <div className="font-mono text-green-400 text-lg mb-4">
              RR_Score = Base_Velocity × ((C + V + P) / 30) × (1 - RF/100) × MC
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <div>C = Consistency Score (0-10)</div>
              <div>V = Volume Score (0-10)</div>
              <div>P = Persistence Score (0-10)</div>
              <div>RF = Red Flags Penalty (0-100)</div>
              <div>MC = Market Context Multiplier (0.5-1.5)</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <strong className="text-white text-lg">Step-by-Step Calculation:</strong>
              <div className="mt-4 space-y-3 text-sm">
                <div className="bg-purple-900/20 border-l-4 border-purple-500 p-3">
                  <strong className="text-purple-300">Step 1:</strong> Calculate Base Velocity
                  <div className="font-mono text-xs text-gray-400 mt-1">Example: -3.5 ranks/day</div>
                </div>

                <div className="bg-green-900/20 border-l-4 border-green-500 p-3">
                  <strong className="text-green-300">Step 2:</strong> Sum Quality Scores (C + V + P)
                  <div className="font-mono text-xs text-gray-400 mt-1">Example: 7.5 + 8.2 + 6.8 = 22.5</div>
                </div>

                <div className="bg-blue-900/20 border-l-4 border-blue-500 p-3">
                  <strong className="text-blue-300">Step 3:</strong> Normalize to 0-1 range (divide by 30)
                  <div className="font-mono text-xs text-gray-400 mt-1">Example: 22.5 / 30 = 0.75</div>
                </div>

                <div className="bg-red-900/20 border-l-4 border-red-500 p-3">
                  <strong className="text-red-300">Step 4:</strong> Apply Red Flags Penalty
                  <div className="font-mono text-xs text-gray-400 mt-1">Example: 1 - (15/100) = 0.85</div>
                </div>

                <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-3">
                  <strong className="text-yellow-300">Step 5:</strong> Apply Market Context
                  <div className="font-mono text-xs text-gray-400 mt-1">Example: × 1.2 (favorable altcoin conditions)</div>
                </div>

                <div className="bg-gray-700 border-l-4 border-white p-3">
                  <strong className="text-white">Final Result:</strong>
                  <div className="font-mono text-lg text-green-400 mt-2">
                    RR_Score = 3.5 × 0.75 × 0.85 × 1.2 = 2.68
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4">
              <strong className="text-blue-300">Special Cases:</strong>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-gray-300">
                <li>• <strong>Early Phase</strong> (Days 1-21): Persistence score excluded, divide by 20 instead of 30</li>
                <li>• <strong>NaN Protection:</strong> All components default to 0 if invalid</li>
                <li>• <strong>Floor:</strong> Final score cannot be negative, min(0, score)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-800/50 rounded p-6 mt-6">
              <h5 className="text-lg font-semibold text-green-400 mb-4">Score Thresholds:</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-900 rounded p-3">
                  <div className="font-bold text-green-400 mb-1">8.0+ : Strong Rabbit 🐰</div>
                  <div className="text-xs text-gray-400">High confidence, excellent momentum, buy signal</div>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <div className="font-bold text-blue-400 mb-1">6.0-7.9 : Worth Watching 👀</div>
                  <div className="text-xs text-gray-400">Good potential, monitor closely for entry</div>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <div className="font-bold text-yellow-400 mb-1">4.0-5.9 : Moderate Interest ⚠️</div>
                  <div className="text-xs text-gray-400">Some promise but significant risks</div>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <div className="font-bold text-red-400 mb-1">0.0-3.9 : Too Risky ❌</div>
                  <div className="text-xs text-gray-400">Likely manipulation, poor fundamentals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Notes */}
      <section>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Implementation Notes</h3>

          <div className="space-y-4 text-gray-300 text-sm">
            <div>
              <strong className="text-white">Data Sources:</strong>
              <ul className="ml-6 mt-1 space-y-1">
                <li>• Ranking data: CoinGecko API (every 12 hours)</li>
                <li>• Exchange volumes: CoinGecko tickers endpoint</li>
                <li>• Historical data: 30+ days per coin stored in PostgreSQL</li>
              </ul>
            </div>

            <div>
              <strong className="text-white">Calculation Frequency:</strong>
              <ul className="ml-6 mt-1 space-y-1">
                <li>• Scores recalculated every 12 hours</li>
                <li>• 30-day rolling window for all metrics</li>
                <li>• Real-time display via ISR (60s revalidation)</li>
              </ul>
            </div>

            <div>
              <strong className="text-white">Edge Case Handling:</strong>
              <ul className="ml-6 mt-1 space-y-1">
                <li>• All divisions check for zero denominators</li>
                <li>• NaN and Infinity values replaced with 0</li>
                <li>• Scores clamped to valid ranges</li>
                <li>• Minimum data requirements enforced</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// FOR INVESTORS SECTION
// ============================================================================

function InvestorsSection() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold mb-6">For Investors: The Opportunity</h2>

      <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-800/50 rounded-lg p-8 mb-12">
        <h3 className="text-2xl font-bold text-green-400 mb-4">Executive Summary</h3>
        <p className="text-gray-300 text-lg">
          RabbitRadar is building the first <strong className="text-white">ranking velocity intelligence platform</strong> for cryptocurrency markets.
          While everyone else tracks price, we identify emerging opportunities 1-2 weeks earlier by analyzing market positioning dynamics.
        </p>
        <p className="text-gray-300 text-lg mt-4">
          <strong className="text-white">The Edge:</strong> Proprietary multi-factor scoring system combining velocity, consistency, volume analysis, and manipulation detection—providing early signals before coins hit mainstream awareness.
        </p>
      </div>

      {/* Problem */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-red-400 mb-4">❌ The Problem: Information Asymmetry</h3>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <p className="text-gray-300 text-lg mb-6">
            In crypto markets, timing is everything. By the time retail investors hear about an opportunity, institutional players and insiders have already positioned themselves. The massive gains happen before the coin appears on most people&rsquo;s radar.
          </p>

          <div className="space-y-4">
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4">
              <h4 className="font-semibold text-red-300 mb-2">Retail investors are always late</h4>
              <p className="text-sm text-gray-400">
                Traditional tools (price alerts, volume spikes, social media trends) react to what already happened. By the time these signals fire, smart money has already moved.
              </p>
            </div>

            <div className="bg-red-900/20 border-l-4 border-red-500 p-4">
              <h4 className="font-semibold text-red-300 mb-2">Crypto is winner-takes-all for information edge</h4>
              <p className="text-sm text-gray-400">
                A 1-2 week information advantage translates to 5-10x return differential. First movers capture the entire rally. Latecomers buy the top.
              </p>
            </div>

            <div className="bg-red-900/20 border-l-4 border-red-500 p-4">
              <h4 className="font-semibold text-red-300 mb-2">Existing tools are backward-looking</h4>
              <p className="text-sm text-gray-400">
                Price charts, trading volume, social sentiment—all lagging indicators. You&rsquo;re reacting to what smart money already knows.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-900/30 border border-orange-800/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-orange-300 mb-3">Market Size of Information Disadvantage:</h4>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong className="text-white">$2.5T+</strong> total crypto market cap (and growing)</li>
            <li>• <strong className="text-white">50M+</strong> active crypto traders globally</li>
            <li>• <strong className="text-white">Billions</strong> lost annually to pump-and-dumps and manipulation</li>
            <li>• <strong className="text-white">Zero</strong> tools tracking ranking velocity as primary signal</li>
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">✅ The Solution: RabbitRadar</h3>

        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-700/50 rounded-lg p-8 mb-6">
          <h4 className="text-xl font-bold text-blue-300 mb-4">The First Ranking Velocity Intelligence Platform</h4>

          <p className="text-gray-300 text-lg mb-6">
            RabbitRadar identifies coins climbing through rankings with sustained, organic momentum—catching &ldquo;rabbits&rdquo; before they hop into mainstream awareness.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-5xl mb-3">🎯</div>
              <h5 className="font-semibold text-blue-300 mb-2">Early Detection</h5>
              <p className="text-sm text-gray-400">1-2 weeks before price explosion</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🛡️</div>
              <h5 className="font-semibold text-purple-300 mb-2">Manipulation Filters</h5>
              <p className="text-sm text-gray-400">Automated red flag detection</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">📊</div>
              <h5 className="font-semibold text-green-300 mb-2">Multi-Factor Quality</h5>
              <p className="text-sm text-gray-400">Not just speed, but quality of movement</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h5 className="text-lg font-semibold text-blue-400 mb-3">🚀 Proprietary Technology</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>Ranking Velocity Tracking:</strong> Industry-first approach—tracks market positioning, not price</li>
              <li>• <strong>Multi-Factor Scoring:</strong> Consistency, volume analysis, persistence, manipulation detection</li>
              <li>• <strong>Two-Phase Validation:</strong> Early detection + sustained verification system</li>
              <li>• <strong>Real-time Processing:</strong> 12-hour update cycles tracking top 1000 coins</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h5 className="text-lg font-semibold text-green-400 mb-3">💎 Competitive Moats</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>First Mover:</strong> No competitors tracking ranking velocity as primary signal</li>
              <li>• <strong>Data Accumulation:</strong> Historical patterns compound—more data = better detection</li>
              <li>• <strong>Network Effects:</strong> More users = more validation = better signals</li>
              <li>• <strong>Methodology Complexity:</strong> Multi-factor scoring is hard to replicate correctly</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">📈 Market Opportunity</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-purple-300 mb-4">TAM: $10B+</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div>
                <strong className="text-white">Crypto Trading Tools Market</strong>
                <p className="text-xs text-gray-400 mt-1">Growing 40%+ annually with crypto adoption</p>
              </div>
              <div className="pt-3 border-t border-purple-800/50">
                <strong className="text-white">Comparable Products:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• TradingView: $3B+ valuation</li>
                  <li>• Glassnode: $100M+ ARR</li>
                  <li>• CoinGecko: Profitable, high growth</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-800/50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-blue-300 mb-4">Beachhead: Retail Traders</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div>
                <strong className="text-white">50M+ Global Crypto Traders</strong>
                <p className="text-xs text-gray-400 mt-1">Desperate for edge, willing to pay for alpha</p>
              </div>
              <div className="pt-3 border-t border-blue-800/50">
                <strong className="text-white">Expansion Paths:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Crypto hedge funds &amp; quant firms</li>
                  <li>• Institutional portfolio managers</li>
                  <li>• Exchange listing intelligence</li>
                  <li>• API access for algo trading</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-yellow-300 mb-3">Why Now?</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• <strong className="text-white">Crypto Going Mainstream:</strong> Bitcoin ETFs approved, institutional adoption accelerating</li>
            <li>• <strong className="text-white">Information Overload:</strong> 10,000+ coins—retail investors drowning in noise</li>
            <li>• <strong className="text-white">Proven Demand:</strong> Trading signal services generate billions in revenue</li>
            <li>• <strong className="text-white">Technical Feasibility:</strong> CoinGecko API + modern cloud infrastructure makes this possible now</li>
          </ul>
        </div>
      </section>

      {/* Business Model */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">💰 Business Model & Revenue Streams</h3>

        <div className="space-y-6">
          {/* Freemium */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🆓</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-blue-400 mb-2">Freemium Model</h4>
                <p className="text-gray-300 mb-4">
                  Free tier drives user acquisition and validates product-market fit. Premium tiers capture power users and professionals.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-700 rounded p-3">
                    <div className="font-semibold text-gray-300 mb-1">Free Tier</div>
                    <div className="text-xs text-gray-400 mb-2">Top 100 coins, 24h delay, basic scores</div>
                    <div className="text-green-400 font-bold">Acquisition Engine</div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-800/50 rounded p-3">
                    <div className="font-semibold text-blue-300 mb-1">Pro: $49/mo</div>
                    <div className="text-xs text-gray-400 mb-2">Top 500 coins, real-time, full breakdowns</div>
                    <div className="text-blue-400 font-bold">Core Revenue</div>
                  </div>
                  <div className="bg-purple-900/30 border border-purple-800/50 rounded p-3">
                    <div className="font-semibold text-purple-300 mb-1">Elite: $199/mo</div>
                    <div className="text-xs text-gray-400 mb-2">All 1000 coins, alerts, API access</div>
                    <div className="text-purple-400 font-bold">High LTV Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Access */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔌</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-purple-400 mb-2">API Access for Algo Trading</h4>
                <p className="text-gray-300 mb-3">
                  Quant funds, trading bots, institutional players need programmatic access to signals.
                </p>
                <div className="bg-purple-900/20 border border-purple-800/50 rounded p-4">
                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Pricing:</strong> $500-$5,000/month based on call volume
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    High margin, sticky revenue, targets sophisticated users
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🏢</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-yellow-400 mb-2">Enterprise / Institutional</h4>
                <p className="text-gray-300 mb-3">
                  Crypto funds, family offices, institutional desks need white-labeled intelligence.
                </p>
                <div className="bg-yellow-900/20 border border-yellow-800/50 rounded p-4">
                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Pricing:</strong> $10k-$50k/month + custom features
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Custom integrations, dedicated support, private deployments
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Affiliate */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🤝</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-green-400 mb-2">Exchange Partnerships & Affiliate</h4>
                <p className="text-gray-300 mb-3">
                  Revenue share with exchanges (referral fees) + paid promotions for new listings.
                </p>
                <div className="bg-green-900/20 border border-green-800/50 rounded p-4">
                  <div className="text-sm text-gray-300">
                    Traffic to exchanges generates 20-40% lifetime commission on trading fees
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-800/50 rounded-lg p-6 mt-8">
          <h4 className="text-xl font-semibold text-green-400 mb-4">Revenue Projections (Aggressive Scenario)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left">Metric</th>
                  <th className="px-4 py-2 text-right">Year 1</th>
                  <th className="px-4 py-2 text-right">Year 2</th>
                  <th className="px-4 py-2 text-right">Year 3</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2">Total Users</td>
                  <td className="px-4 py-2 text-right">10,000</td>
                  <td className="px-4 py-2 text-right">100,000</td>
                  <td className="px-4 py-2 text-right">500,000</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2">Paid Conversion</td>
                  <td className="px-4 py-2 text-right">5%</td>
                  <td className="px-4 py-2 text-right">8%</td>
                  <td className="px-4 py-2 text-right">10%</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2">ARPU (Annual)</td>
                  <td className="px-4 py-2 text-right">$600</td>
                  <td className="px-4 py-2 text-right">$800</td>
                  <td className="px-4 py-2 text-right">$1,000</td>
                </tr>
                <tr className="border-t border-gray-700 bg-green-900/20">
                  <td className="px-4 py-2 font-bold text-white">ARR</td>
                  <td className="px-4 py-2 text-right font-bold text-green-400">$300K</td>
                  <td className="px-4 py-2 text-right font-bold text-green-400">$6.4M</td>
                  <td className="px-4 py-2 text-right font-bold text-green-400">$50M</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            * Assumes 5-10% paid conversion (industry standard for trading tools), $50-200/month blended ARPU,
            aggressive user growth through product-led acquisition
          </p>
        </div>
      </section>

      {/* Go-to-Market */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">🎯 Go-to-Market Strategy</h3>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-400 mb-3">Phase 1: Launch & Validate (Months 0-6)</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong className="text-white">Product-Led Growth:</strong> Free tier drives organic acquisition via Reddit, Twitter, Discord</li>
              <li>• <strong className="text-white">Content Marketing:</strong> Trophy Room showcasing successful early catches builds credibility</li>
              <li>• <strong className="text-white">Influencer Partnerships:</strong> Sponsor crypto YouTubers/Twitter accounts for reviews</li>
              <li>• <strong className="text-white">Target:</strong> 10,000 users, validate PMF, iterate based on feedback</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-400 mb-3">Phase 2: Scale & Monetize (Months 6-18)</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong className="text-white">Paid Acquisition:</strong> Google/FB ads targeting &ldquo;crypto signals&rdquo; &ldquo;trading tools&rdquo; keywords</li>
              <li>• <strong className="text-white">SEO Domination:</strong> Content around every tracked coin (&ldquo;Is [COIN] a rabbit?&rdquo;)</li>
              <li>• <strong className="text-white">API Launch:</strong> Target quant funds, algo traders, institutional players</li>
              <li>• <strong className="text-white">Partnership Program:</strong> Revenue share with exchanges, listing intelligence deals</li>
              <li>• <strong className="text-white">Target:</strong> 100,000 users, $5M+ ARR, Series A fundraise</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-purple-400 mb-3">Phase 3: Dominate & Expand (18+ months)</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong className="text-white">Network Effects:</strong> User-generated watch lists, social features, community validation</li>
              <li>• <strong className="text-white">Data Moat:</strong> Years of historical patterns = better predictions = competitive advantage</li>
              <li>• <strong className="text-white">Platform Play:</strong> Become the de-facto ranking intelligence layer for crypto</li>
              <li>• <strong className="text-white">Exit Strategy:</strong> Acquisition by CoinGecko, CoinMarketCap, Binance, or major exchange</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">⚔️ Competitive Advantage</h3>

        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-800/50 rounded-lg p-6 mb-6">
          <h4 className="text-xl font-semibold text-purple-300 mb-4">Why We Win</h4>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-800 rounded p-4">
                <h5 className="font-semibold text-green-400 mb-2">🥇 First Mover</h5>
                <p className="text-sm text-gray-300">
                  Zero competitors tracking ranking velocity as primary signal. We&rsquo;re creating a new category.
                </p>
              </div>

              <div className="bg-gray-800 rounded p-4">
                <h5 className="font-semibold text-blue-400 mb-2">📊 Data Accumulation</h5>
                <p className="text-sm text-gray-300">
                  Every day of historical patterns makes our detection better. Late entrants can&rsquo;t catch up—data compounds.
                </p>
              </div>

              <div className="bg-gray-800 rounded p-4">
                <h5 className="font-semibold text-purple-400 mb-2">🛡️ Methodology Complexity</h5>
                <p className="text-sm text-gray-300">
                  Multi-factor scoring is hard to replicate correctly. Most will get it wrong. We&rsquo;ve refined over months of iteration.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800 rounded p-4">
                <h5 className="font-semibold text-yellow-400 mb-2">🌐 Network Effects</h5>
                <p className="text-sm text-gray-300">
                  More users = more validation data = better signals. Classic winner-takes-all dynamics.
                </p>
              </div>

              <div className="bg-gray-800 rounded p-4">
                <h5 className="font-semibold text-pink-400 mb-2">🎯 Positioning</h5>
                <p className="text-sm text-gray-300">
                  &ldquo;Spot rabbits before they hop&rdquo; is memorable, viral, and captures imagination. Brand is defensible.
                </p>
              </div>

              <div className="bg-gray-800 rounded p-4">
                <h5 className="font-semibold text-cyan-400 mb-2">⚡ Speed to Market</h5>
                <p className="text-sm text-gray-300">
                  Already live, tracking 1000 coins, scoring system proven. Not vaporware—shipping and iterating.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">Competitive Landscape:</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Competitor</th>
                  <th className="px-4 py-2 text-left">Focus</th>
                  <th className="px-4 py-2 text-left">Weakness</th>
                  <th className="px-4 py-2 text-left">Our Edge</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2 font-semibold">CoinGecko / CMC</td>
                  <td className="px-4 py-2">Data aggregation</td>
                  <td className="px-4 py-2 text-red-400">No analysis, just raw data</td>
                  <td className="px-4 py-2 text-green-400">Intelligence layer on top</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2 font-semibold">TradingView</td>
                  <td className="px-4 py-2">Technical analysis</td>
                  <td className="px-4 py-2 text-red-400">Price-focused, no ranking velocity</td>
                  <td className="px-4 py-2 text-green-400">Earlier signals, different data</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2 font-semibold">LunarCrush</td>
                  <td className="px-4 py-2">Social sentiment</td>
                  <td className="px-4 py-2 text-red-400">Reacts to hype, not predictive</td>
                  <td className="px-4 py-2 text-green-400">Velocity is leading indicator</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2 font-semibold">Glassnode</td>
                  <td className="px-4 py-2">On-chain analytics</td>
                  <td className="px-4 py-2 text-red-400">BTC/ETH only, complex, expensive</td>
                  <td className="px-4 py-2 text-green-400">All coins, simple, accessible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">📊 Traction & Milestones</h3>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">What We&rsquo;ve Built:</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-green-900/20 border border-green-800/50 rounded p-4 mb-3">
                <h5 className="font-semibold text-green-400 mb-2">✅ Production System</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Tracking 1000 coins, 12-hour updates</li>
                  <li>• Complete scoring system operational</li>
                  <li>• 30+ days historical data per coin</li>
                  <li>• Multi-factor validation proven</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/50 rounded p-4">
                <h5 className="font-semibold text-blue-400 mb-2">✅ Infrastructure</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Serverless architecture (Vercel)</li>
                  <li>• PostgreSQL + real-time dashboard</li>
                  <li>• API call tracking & optimization</li>
                  <li>• Scalable to millions of users</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-purple-900/20 border border-purple-800/50 rounded p-4 mb-3">
                <h5 className="font-semibold text-purple-400 mb-2">✅ Methodology</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Proprietary scoring formulas</li>
                  <li>• Two-phase detection system</li>
                  <li>• Red flag automation</li>
                  <li>• Market context intelligence</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-800/50 rounded p-4">
                <h5 className="font-semibold text-yellow-400 mb-2">🚧 In Progress</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Trophy Room (success tracking)</li>
                  <li>• Alert system implementation</li>
                  <li>• User accounts & watch lists</li>
                  <li>• Mobile-responsive optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-300 mb-4">Next 12 Months Roadmap:</h4>
          <div className="space-y-3 text-gray-300 text-sm">
            <div className="flex items-start gap-3">
              <div className="text-xl">Q1</div>
              <div>
                <strong className="text-white">Product Polish & Launch:</strong> Complete Trophy Room, alerts, user accounts. Public beta launch.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-xl">Q2</div>
              <div>
                <strong className="text-white">Growth & Monetization:</strong> Paid tiers live. Content marketing. First 5,000 users.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-xl">Q3</div>
              <div>
                <strong className="text-white">API & Partnerships:</strong> API access for algo traders. Exchange affiliate partnerships.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-xl">Q4</div>
              <div>
                <strong className="text-white">Scale & Fundraise:</strong> 50k+ users, $2M+ ARR run rate. Series A raise to accelerate growth.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Ask */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-green-400 mb-4">💰 The Ask</h3>

        <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-800/50 rounded-lg p-8">
          <h4 className="text-2xl font-bold text-green-400 mb-6">Seeking: Seed Round Funding</h4>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">💵 Funding Target</h5>
              <div className="text-4xl font-bold text-green-400 mb-2">$500K - $1M</div>
              <p className="text-sm text-gray-400">
                Seed round to accelerate product development, user acquisition, and team expansion
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-4">📍 Stage</h5>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Product: Live and operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Traction: Early validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Revenue: Pre-monetization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Team: Founder-led, hiring key roles</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h5 className="text-lg font-semibold text-blue-400 mb-4">Use of Funds:</h5>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">👥</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-white">Team Expansion</strong>
                    <span className="text-green-400 font-mono">40%</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Hire: Senior engineer, growth marketer, data scientist. Build world-class product team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">📈</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-white">User Acquisition</strong>
                    <span className="text-green-400 font-mono">30%</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Paid ads, influencer partnerships, content marketing, SEO. Drive 50k+ users in 12 months.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">⚙️</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-white">Product Development</strong>
                    <span className="text-green-400 font-mono">20%</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Advanced features: ML-powered predictions, mobile apps, API platform, social features.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">🔧</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-white">Infrastructure & Operations</strong>
                    <span className="text-green-400 font-mono">10%</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Scaling infrastructure, API costs, legal/compliance, operational overhead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-6">
            <h5 className="text-lg font-semibold text-blue-300 mb-3">12-Month Targets:</h5>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-1">50,000+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">$2M+</div>
                <div className="text-sm text-gray-400">ARR Run Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-1">8-10%</div>
                <div className="text-sm text-gray-400">Paid Conversion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section>
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">🚀 The Vision</h3>

          <p className="text-gray-300 text-lg mb-6">
            RabbitRadar becomes the <strong className="text-white">de-facto ranking intelligence layer</strong> for cryptocurrency markets.
            When traders want to know &ldquo;what&rsquo;s moving before everyone else knows,&rdquo; they come to RabbitRadar.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📱</div>
              <div>
                <strong className="text-white">Short-term (12 months):</strong>
                <span className="text-gray-300"> Become the #1 early-signal platform for retail crypto traders</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🏢</div>
              <div>
                <strong className="text-white">Mid-term (24 months):</strong>
                <span className="text-gray-300"> Institutional adoption, API platform, B2B partnerships with funds & exchanges</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🌍</div>
              <div>
                <strong className="text-white">Long-term (36+ months):</strong>
                <span className="text-gray-300"> Acquisition by major crypto infrastructure player (CoinGecko, Binance, Coinbase) or IPO path</span>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-700/50 pt-6">
            <p className="text-gray-300 text-lg">
              <strong className="text-white">The Opportunity:</strong> Information asymmetry drives crypto markets.
              We&rsquo;re building the tool that levels the playing field—giving retail traders the same early-detection edge that insiders have always had.
            </p>
            <p className="text-gray-300 text-lg mt-4">
              <strong className="text-white">Join us</strong> in democratizing access to alpha. Let&rsquo;s spot the rabbits together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
