/**
 * System Status Page
 * Shows health of cron jobs, database, and system statistics
 */

import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Always fetch fresh data, no static generation

interface StatusResponse {
  success: boolean;
  timestamp: string;
  overallStatus: 'healthy' | 'warning' | 'error';
  database: {
    healthy: boolean;
    message: string;
  };
  cronJobs: {
    [key: string]: {
      name: string;
      schedule: string;
      lastRun: string;
      status: string;
      healthMessage: string;
      hoursSinceLastRun?: number | null;
      coinsWithMetadata?: number;
      btcDominance?: number;
    };
  };
  apiUsage?: {
    status: 'healthy' | 'warning' | 'error';
    callsToday: number;
    callsThisMonth: number;
    monthlyLimit: number;
    usagePercent: string;
    successfulCalls: number;
    failedCalls: number;
    callsByEndpoint: { endpoint: string; count: number }[];
  };
  statistics: {
    rankings: {
      totalCoinsTracked: number;
      totalDataPoints: number;
      oldestData: string;
      latestData: string;
    };
    scores: {
      coinsWithScores: number;
      averageRRScore: string;
      maxRRScore: string;
      strongRabbits: number;
    };
    metadata: {
      totalWithMetadata: number;
      withGitHub: number;
      githubActive: number;
    };
    watchList: {
      total: number;
      active: number;
    };
  };
}

async function getSystemStatus(): Promise<StatusResponse | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://rabbit-radar-api.vercel.app';
    const response = await fetch(`${apiUrl}/api/status`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch status');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching system status:', error);
    return null;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'healthy':
      return 'bg-green-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'error':
      return 'bg-red-500';
    case 'never_run':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case 'healthy':
      return 'bg-green-900/30 text-green-400 border-green-700';
    case 'warning':
      return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
    case 'error':
      return 'bg-red-900/30 text-red-400 border-red-700';
    case 'never_run':
      return 'bg-gray-900/30 text-gray-400 border-gray-700';
    default:
      return 'bg-gray-900/30 text-gray-400 border-gray-700';
  }
}

function formatRelativeTime(dateString: string) {
  if (dateString === 'Never' || dateString === 'Unknown (check metadata table)') {
    return dateString;
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return 'Just now';
}

export default async function StatusPage() {
  const status = await getSystemStatus();

  if (!status) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-400 text-lg">Failed to load system status</p>
            <Link href="/dashboard" className="text-blue-400 hover:underline mt-4 inline-block">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-400 hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                System Status
              </h1>
              <p className="text-gray-400 mt-2">
                Real-time health monitoring for RabbitRadar
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusBadgeColor(status.overallStatus)}`}>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status.overallStatus)} animate-pulse`}></div>
                <span className="font-semibold uppercase text-sm">
                  {status.overallStatus === 'healthy' ? 'All Systems Operational' :
                   status.overallStatus === 'warning' ? 'Some Issues Detected' :
                   'System Error'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Updated {formatRelativeTime(status.timestamp)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Server Time: {new Date(status.timestamp).toLocaleString('en-US', {
                  timeZone: 'UTC',
                  hour12: false,
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZoneName: 'short'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Timezone Info */}
        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong className="text-blue-400">⏰ Timezone:</strong> All cron jobs run on <strong>UTC (Coordinated Universal Time)</strong>.
            Metadata cron runs daily at <strong>02:00 UTC</strong> (2am UTC).
          </p>
        </div>

        {/* Database Health */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Database</h2>
          <div className={`p-6 rounded-lg border ${status.database.healthy ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${status.database.healthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <div className="font-semibold text-lg text-white">PostgreSQL Database</div>
                <div className={status.database.healthy ? 'text-green-400' : 'text-red-400'}>
                  {status.database.message}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Usage */}
        {status.apiUsage && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">CoinGecko API Usage</h2>
            <div className={`p-6 rounded-lg border ${getStatusBadgeColor(status.apiUsage.status)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(status.apiUsage.status)}`}></div>
                  <div>
                    <div className="font-semibold text-lg text-white">API Quota Monitor</div>
                    <div className="text-sm text-gray-400">
                      {status.apiUsage.callsThisMonth.toLocaleString()} / {status.apiUsage.monthlyLimit.toLocaleString()} calls this month
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{status.apiUsage.usagePercent}%</div>
                  <div className="text-xs text-gray-400">Quota Used</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      status.apiUsage.status === 'healthy' ? 'bg-green-500' :
                      status.apiUsage.status === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(parseFloat(status.apiUsage.usagePercent), 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Today</div>
                  <div className="text-xl font-semibold text-white">{status.apiUsage.callsToday.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">This Month</div>
                  <div className="text-xl font-semibold text-white">{status.apiUsage.callsThisMonth.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Successful</div>
                  <div className="text-xl font-semibold text-green-400">{status.apiUsage.successfulCalls.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Failed</div>
                  <div className="text-xl font-semibold text-red-400">{status.apiUsage.failedCalls.toLocaleString()}</div>
                </div>
              </div>

              {/* Top Endpoints */}
              {status.apiUsage.callsByEndpoint.length > 0 && (
                <div className="pt-4 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">Top API Endpoints:</div>
                  <div className="space-y-1">
                    {status.apiUsage.callsByEndpoint.map((endpoint, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-300 font-mono text-xs truncate">{endpoint.endpoint}</span>
                        <span className="text-white ml-2">{endpoint.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Message */}
              <div className={`mt-4 pt-4 border-t border-gray-700 text-sm ${
                status.apiUsage.status === 'healthy' ? 'text-green-400' :
                status.apiUsage.status === 'warning' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {status.apiUsage.status === 'healthy' ? '✅ API usage is within healthy limits' :
                 status.apiUsage.status === 'warning' ? '⚠️ Warning: Approaching monthly API limit' :
                 '🚨 Critical: Near or exceeded monthly API limit'}
              </div>
            </div>
          </div>
        )}

        {/* Cron Jobs */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Cron Jobs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(status.cronJobs).map(([key, job]) => (
              <div key={key} className={`p-6 rounded-lg border ${getStatusBadgeColor(job.status).replace('text-', 'border-')}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`}></div>
                    <div>
                      <div className="font-bold text-lg text-white">{job.name}</div>
                      <div className="text-sm text-gray-400">{job.schedule}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-semibold uppercase ${getStatusBadgeColor(job.status)}`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Run:</span>
                    <span className="text-white font-mono">{formatRelativeTime(job.lastRun)}</span>
                  </div>
                  {job.hoursSinceLastRun !== undefined && job.hoursSinceLastRun !== null && typeof job.hoursSinceLastRun === 'number' && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hours Since:</span>
                      <span className="text-white">{job.hoursSinceLastRun.toFixed(1)}h</span>
                    </div>
                  )}
                  {job.coinsWithMetadata !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coins with Metadata:</span>
                      <span className="text-white">{job.coinsWithMetadata}</span>
                    </div>
                  )}
                  {job.btcDominance !== undefined && job.btcDominance !== null && typeof job.btcDominance === 'number' && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">BTC Dominance:</span>
                      <span className="text-white">{job.btcDominance.toFixed(2)}%</span>
                    </div>
                  )}
                  <div className={`pt-2 border-t border-gray-700 ${
                    job.status === 'healthy' ? 'text-green-400' :
                    job.status === 'warning' ? 'text-yellow-400' :
                    job.status === 'error' ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {job.healthMessage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Rankings Stats */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg p-6 border border-blue-700/50">
            <h3 className="text-sm text-blue-400 font-semibold uppercase tracking-wide mb-3">Rankings</h3>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold text-white">{status.statistics.rankings.totalCoinsTracked}</div>
                <div className="text-xs text-gray-400">Coins Tracked</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{status.statistics.rankings.totalDataPoints.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Data Points</div>
              </div>
              <div className="text-xs text-gray-500 pt-2 border-t border-blue-800">
                Oldest: {formatRelativeTime(status.statistics.rankings.oldestData)}
              </div>
            </div>
          </div>

          {/* Scores Stats */}
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-lg p-6 border border-purple-700/50">
            <h3 className="text-sm text-purple-400 font-semibold uppercase tracking-wide mb-3">Scores</h3>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold text-white">{status.statistics.scores.coinsWithScores}</div>
                <div className="text-xs text-gray-400">Coins with Scores</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{status.statistics.scores.strongRabbits}</div>
                <div className="text-xs text-gray-400">Strong Rabbits (RR ≥ 6)</div>
              </div>
              <div className="text-xs text-gray-500 pt-2 border-t border-purple-800">
                Avg Score: {status.statistics.scores.averageRRScore}
              </div>
            </div>
          </div>

          {/* Metadata Stats */}
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-lg p-6 border border-green-700/50">
            <h3 className="text-sm text-green-400 font-semibold uppercase tracking-wide mb-3">Metadata</h3>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold text-white">{status.statistics.metadata.totalWithMetadata}</div>
                <div className="text-xs text-gray-400">Coins with Metadata</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{status.statistics.metadata.withGitHub}</div>
                <div className="text-xs text-gray-400">With GitHub</div>
              </div>
              <div className="text-xs text-gray-500 pt-2 border-t border-green-800">
                Active: {status.statistics.metadata.githubActive}
              </div>
            </div>
          </div>

          {/* Watch List Stats */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-lg p-6 border border-yellow-700/50">
            <h3 className="text-sm text-yellow-400 font-semibold uppercase tracking-wide mb-3">Watch List</h3>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold text-white">{status.statistics.watchList.total}</div>
                <div className="text-xs text-gray-400">Total in Watch List</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{status.statistics.watchList.active}</div>
                <div className="text-xs text-gray-400">Active Watches</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Status page refreshes every 30 seconds</p>
          <p className="mt-1">For issues, contact support</p>
        </div>
      </div>
    </div>
  );
}
