/**
 * Utility functions
 */

/**
 * Format large numbers with abbreviations (K, M, B, T)
 */
export function formatNumber(num: number | string | null): string {
  if (num === null || num === undefined) return 'N/A';

  // Parse string to number
  const parsed = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(parsed)) return 'N/A';

  const absNum = Math.abs(parsed);

  if (absNum >= 1e12) return `$${(parsed / 1e12).toFixed(2)}T`;
  if (absNum >= 1e9) return `$${(parsed / 1e9).toFixed(2)}B`;
  if (absNum >= 1e6) return `$${(parsed / 1e6).toFixed(2)}M`;
  if (absNum >= 1e3) return `$${(parsed / 1e3).toFixed(2)}K`;

  return `$${parsed.toFixed(2)}`;
}

/**
 * Format price with appropriate decimal places
 */
export function formatPrice(price: number | string | null): string {
  if (price === null || price === undefined) return 'N/A';

  // Parse string to number
  const parsed = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(parsed)) return 'N/A';

  if (parsed < 0.01) return `$${parsed.toFixed(6)}`;
  if (parsed < 1) return `$${parsed.toFixed(4)}`;
  if (parsed < 100) return `$${parsed.toFixed(2)}`;

  return `$${parsed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format score (0-10 or 0-100) with color
 */
export function getScoreColor(score: number | null, maxScore: number = 100): string {
  if (score === null || score === undefined) return 'text-gray-400';

  const normalized = (score / maxScore) * 100;

  if (normalized >= 80) return 'text-green-600';
  if (normalized >= 60) return 'text-yellow-600';
  if (normalized >= 40) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Format phase status with color
 */
export function getPhaseColor(phase: string | null): string {
  if (!phase) return 'text-gray-400';

  switch (phase.toLowerCase()) {
    case 'accumulation':
      return 'text-blue-600';
    case 'markup':
      return 'text-green-600';
    case 'distribution':
      return 'text-orange-600';
    case 'decline':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: string): string {
  const now = new Date().getTime();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Calculate velocity badge (base_velocity is the key metric)
 */
export function getVelocityBadge(baseVelocity: number | string | null): {
  label: string;
  color: string;
  icon: string;
} {
  if (baseVelocity === null || baseVelocity === undefined) {
    return { label: 'No Data', color: 'bg-gray-100 text-gray-600', icon: '⏸️' };
  }

  const velocity = typeof baseVelocity === 'string' ? parseFloat(baseVelocity) : baseVelocity;
  if (isNaN(velocity)) {
    return { label: 'No Data', color: 'bg-gray-100 text-gray-600', icon: '⏸️' };
  }

  // Velocity thresholds (negative = climbing, positive = falling)
  if (velocity <= -5) return { label: 'Rocket', color: 'bg-green-100 text-green-800', icon: '🚀' };
  if (velocity <= -2) return { label: 'Fast', color: 'bg-green-50 text-green-700', icon: '⬆️' };
  if (velocity <= -0.5) return { label: 'Rising', color: 'bg-blue-50 text-blue-700', icon: '↗️' };
  if (velocity < 0.5) return { label: 'Stable', color: 'bg-gray-50 text-gray-700', icon: '→' };
  if (velocity < 2) return { label: 'Falling', color: 'bg-orange-50 text-orange-700', icon: '↘️' };
  return { label: 'Dropping', color: 'bg-red-50 text-red-700', icon: '⬇️' };
}
