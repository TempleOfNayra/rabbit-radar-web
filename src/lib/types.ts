/**
 * RabbitRadar API Types
 */

export interface CoinData {
  coin_id: string;
  symbol: string;
  name: string;
  rank: number;
  market_cap: number;
  volume_24h: number;
  price: number;
  rr_score: number | null;
  consistency_score: number | null;
  volume_score: number | null;
  persistence_score: number | null;
  red_flags_penalty: number | null;
  base_velocity: number | null;
  days_tracking: number | null;
  phase: string | null;
  market_context_multiplier: number | null;
  timestamp: string;
}

export interface DashboardResponse {
  success: boolean;
  data: CoinData[];
  count: number;
  filters: {
    minRank: number;
    maxRank: number;
    minScore: number;
    limit?: number;
    offset?: number;
  };
  marketContext: {
    btcDominance: number;
    sentiment: string | null;
    timestamp: string;
  } | null;
  timestamp: string;
}

export interface WatchListItem {
  coin_id: string;
  symbol: string;
  name: string;
  detection_date: string;
  initial_rank: number;
  initial_score: number;
  current_rank: number;
  current_score: number;
  peak_rank?: number;
  peak_date?: string;
  status: string;
  notes: string | null;
}

export interface WatchListResponse {
  success: boolean;
  data: WatchListItem[];
  count: number;
  timestamp: string;
}

export interface CoinHistory {
  timestamp: string;
  rank: number;
  market_cap: number;
  volume_24h: number;
  price: number;
}

export interface ScoreHistory {
  timestamp: string;
  rr_score: number;
  consistency_score: number;
  volume_score: number;
  persistence_score: number;
  red_flags_penalty: number;
  base_velocity: number;
}

export interface CoinDetailsResponse {
  success: boolean;
  coin: {
    id: string;
    symbol: string;
    name: string;
    currentRank: number;
    currentPrice: number;
    marketCap: number;
    volume24h: number;
  };
  score: {
    rrScore: number;
    consistencyScore: number;
    volumeScore: number;
    persistenceScore: number;
    redFlagsPenalty: number;
    baseVelocity: number;
    phase: string;
    daysTracking: number;
  } | null;
  history: {
    rankings: CoinHistory[];
    scores: ScoreHistory[];
  };
  metadata: Record<string, unknown> | null;
  exchangeVolumes: Record<string, unknown> | null;
  watchList: Record<string, unknown> | null;
  timestamp: string;
}
