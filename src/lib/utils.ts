/**
 * Utility functions
 */

/**
 * Format large numbers with abbreviations (K, M, B, T)
 */
export function formatNumber(num: number | null): string {
  if (num === null || num === undefined) return 'N/A';

  const absNum = Math.abs(num);

  if (absNum >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (absNum >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (absNum >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (absNum >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;

  return `$${num.toFixed(2)}`;
}

/**
 * Format price with appropriate decimal places
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return 'N/A';

  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 100) return `$${price.toFixed(2)}`;

  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
