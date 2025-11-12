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

export interface CoinDetailsResponse {
  success: boolean;
  coin: CoinData;
  history: CoinHistory[];
  timestamp: string;
}
