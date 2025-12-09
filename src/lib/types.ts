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

  // Default scores (14-day for backward compatibility)
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

  // Rank transitions (for selected window)
  start_rank?: number | null;
  end_rank?: number | null;

  // Multi-window scores (optional)
  rr_score_14d?: number | null;
  velocity_14d?: number | null;
  velocity_3d?: number | null;
  velocity_7d?: number | null;
  velocity_30d?: number | null;
  consistency_14d?: number | null;
  volume_14d?: number | null;
  persistence_14d?: number | null;
  red_flags_14d?: number | null;
  phase_14d?: string | null;
  watch_status?: string | null;
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

// ============================================================================
// V2 ENHANCED SCORES TYPES
// ============================================================================

export interface MomentumStrengthResult {
  score: number;
  shortSlope: number;
  mediumSlope: number;
  shortPercentile: number;
  mediumPercentile: number;
  maWindow: number;
}

export interface VelocityAccelerationResult {
  score: number;
  shortVelocity: number;
  mediumVelocity: number;
  day0Velocity: number;
  shortRatio: number;
  mediumRatio: number;
}

export interface VolumeStrengthResult {
  score: number;
  shortAvgVolume: number;
  mediumAvgVolume: number;
  baselineVolume: number;
  shortRatio: number;
  mediumRatio: number;
}

export interface VolumeRankAlignmentResult {
  score: number;
  correlationCoefficient: number;
  dataPoints: number;
}

export interface LiquidityResult {
  score: number;
  liquidityRatio: number;
}

export interface SustainabilityResult {
  score: number;
  streakDays: number;
  direction: 'improving' | 'declining';
}

export interface BalancedRRScoreResult {
  score: number;
  rating: string;
  breakdown: {
    momentumStrength: number;
    velocityAcceleration: number;
    volumeStrength: number;
    volumeRankAlignment: number;
    liquidity: number;
    sustainability: number;
  };
}

export interface EnhancedScores {
  momentumStrength: MomentumStrengthResult;
  velocityAcceleration: VelocityAccelerationResult;
  volumeStrength: VolumeStrengthResult;
  volumeRankAlignment: VolumeRankAlignmentResult;
  liquidity: LiquidityResult;
  sustainability: SustainabilityResult;
  balancedRRScore: BalancedRRScoreResult;
}

export interface DataMaturity {
  level: 'LOW' | 'MODERATE' | 'GOOD' | 'HIGH';
  label: string;
  daysTracked: number;
  reliable: boolean;
}

export interface FormulaDefinition {
  id: string;
  name: string;
  description: string;
  category: 'momentum' | 'volume' | 'composite' | 'metadata';
  formula: string;
  constants: Record<string, any>;
  steps: string[];
  interpretation: {
    high: string;
    medium?: string;
    low: string;
  };
  examples?: Array<{
    scenario: string;
    inputs: Record<string, any>;
    output: number;
    explanation: string;
  }>;
  relatedFormulas?: string[];
  // Calculated values (injected by API)
  calculatedValues?: any;
  score?: number;
}

export interface FormulasWithValues {
  'momentum-strength': FormulaDefinition;
  'velocity-acceleration': FormulaDefinition;
  'volume-strength': FormulaDefinition;
  'volume-rank-alignment': FormulaDefinition;
  'liquidity': FormulaDefinition;
  'sustainability': FormulaDefinition;
  'balanced-rr-score': FormulaDefinition;
  'data-maturity': FormulaDefinition;
}

// ============================================================================
// FORMULAS API TYPES
// ============================================================================

export interface FormulasListResponse {
  success: true;
  count: number;
  formulas: Array<{
    id: string;
    name: string;
    description: string;
    category: 'momentum' | 'volume' | 'composite' | 'metadata';
  }>;
  note: string;
  availableIds: string[];
  timestamp: string;
}

export interface FormulaDetailsResponse {
  success: true;
  formula: FormulaDefinition;
  note: string;
  timestamp: string;
}

export interface EnhancedScoreHistoryPoint {
  timestamp: string;
  momentumStrength: number;
  velocityAcceleration: number;
  volumeStrength: number;
  volumeRankAlignment: number;
  liquidity: number;
  sustainability: number;
  balancedRRScore: number;
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
  // V2 Enhanced Scores (NEW)
  enhancedScores: EnhancedScores | null;
  dataMaturity: DataMaturity | null;
  formulasWithValues: FormulasWithValues | null;
  enhancedScoresHistory: EnhancedScoreHistoryPoint[];
  timestamp: string;
}
