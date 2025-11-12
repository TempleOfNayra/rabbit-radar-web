import Link from 'next/link';

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-bounce">🐰</div>
            <h1 className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              RabbitRadar
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              Catch the <span className="text-blue-400 font-semibold">Fast Movers</span> Before They Hop
            </p>
          </div>

          {/* Main Pitch */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              Stop chasing pumps. Start <span className="text-purple-400 font-bold">tracking velocity</span>.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              RabbitRadar uses a <span className="text-green-400 font-semibold">revolutionary multi-factor scoring system</span> to identify
              cryptocurrencies climbing through rankings with <span className="text-yellow-400 font-semibold">legitimate momentum</span> —
              filtering out pump-and-dumps and catching <span className="text-blue-400 font-semibold">sustainable growth</span> before the mainstream.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-20">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              <span>🚀</span>
              Launch Dashboard
              <span>→</span>
            </Link>
          </div>

          {/* The Problem */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              The Problem with Traditional Crypto Tracking
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6">
                <div className="text-4xl mb-3">❌</div>
                <h3 className="text-xl font-bold mb-2 text-red-400">Too Late</h3>
                <p className="text-gray-400">
                  By the time you see it on Twitter or YouTube, the pump is over.
                </p>
              </div>
              <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6">
                <div className="text-4xl mb-3">🎲</div>
                <h3 className="text-xl font-bold mb-2 text-red-400">No Filter</h3>
                <p className="text-gray-400">
                  Can&apos;t tell the difference between organic growth and manipulated pumps.
                </p>
              </div>
              <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="text-xl font-bold mb-2 text-red-400">Static Rankings</h3>
                <p className="text-gray-400">
                  Top 100 lists show you what&apos;s already massive, not what&apos;s rising.
                </p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              The RabbitRadar Difference
            </h2>
            <p className="text-center text-xl text-blue-400 mb-12">5 Metrics. Zero Guesswork.</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-2 border-green-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">⚡</div>
                  <h3 className="text-2xl font-bold text-green-400">Velocity Tracking</h3>
                </div>
                <p className="text-gray-300">
                  We don&apos;t just show you rank 200. We show you coins <strong>moving from 500 → 200</strong> with consistent upward momentum.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-2 border-blue-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🛡️</div>
                  <h3 className="text-2xl font-bold text-blue-400">Pump Filter</h3>
                </div>
                <p className="text-gray-300">
                  Red flag detection catches <strong>90% of scams</strong>: Telegram pumps, wash trading, anonymous teams, single-exchange volume.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-2 border-purple-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🎯</div>
                  <h3 className="text-2xl font-bold text-purple-400">Proprietary Score</h3>
                </div>
                <p className="text-gray-300">
                  Our <strong>RabbitRadar Score</strong> combines consistency, volume quality, persistence, and velocity into one actionable number.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border-2 border-yellow-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">⏰</div>
                  <h3 className="text-2xl font-bold text-yellow-400">Early Detection</h3>
                </div>
                <p className="text-gray-300">
                  Catch rabbits <strong>30 days before mainstream</strong>. Get in before the crowd, exit with the gains.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works - Quick Preview */}
          <div className="max-w-4xl mx-auto mb-20 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">The Science Behind the Radar</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-2xl font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Velocity Consistency (0-10)</h3>
                  <p className="text-gray-400">Measures how steadily a coin climbs vs erratic pump movements.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">Volume Pattern Analysis (0-10)</h3>
                  <p className="text-gray-400">Detects organic trading vs wash trading and manipulation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-2xl font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-green-400">Ranking Persistence (0-10)</h3>
                  <p className="text-gray-400">Tracks if coins maintain improved rankings over time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-2xl font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-red-400">Red Flags (0-8 penalties)</h3>
                  <p className="text-gray-400">8-point warning system for scam indicators.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center text-2xl font-bold">5</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">Base Velocity</h3>
                  <p className="text-gray-400">Raw ranking improvement speed (ranks per day).</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/how-it-works" className="text-blue-400 hover:text-blue-300 font-semibold">
                Learn the Full Methodology →
              </Link>
            </div>
          </div>

          {/* Social Proof / Stats */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Built for Serious Traders</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
                <div className="text-gray-400">Coins Tracked</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                <div className="text-4xl font-bold text-green-400 mb-2">90%+</div>
                <div className="text-gray-400">Scam Detection</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                <div className="text-4xl font-bold text-purple-400 mb-2">30 Days</div>
                <div className="text-gray-400">Early Detection</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-gray-400">Live Monitoring</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Catch Some Rabbits?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join the revolution in crypto momentum tracking.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              <span>🐰</span>
              Start Tracking Now
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
