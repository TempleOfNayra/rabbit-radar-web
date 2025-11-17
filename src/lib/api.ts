/**
 * RabbitRadar API Client
 */

import { DashboardResponse, WatchListResponse, CoinDetailsResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rabbit-radar-api.vercel.app';

class RabbitRadarAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Fetch dashboard data with optional filters
   */
  async getDashboard(params?: {
    minRank?: number;
    maxRank?: number;
    minScore?: number;
    limit?: number;
    offset?: number;
    window?: number;
    sortBy?: 'velocity' | 'score';
    multiWindow?: boolean;
  }): Promise<DashboardResponse> {
    const queryParams = new URLSearchParams();

    if (params?.minRank) queryParams.append('minRank', params.minRank.toString());
    if (params?.maxRank) queryParams.append('maxRank', params.maxRank.toString());
    if (params?.minScore) queryParams.append('minScore', params.minScore.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.window) queryParams.append('window', params.window.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.multiWindow !== undefined) queryParams.append('multiWindow', params.multiWindow.toString());

    const url = `${this.baseURL}/api/dashboard${queryParams.toString() ? `?${queryParams}` : ''}`;

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetch watch list
   */
  async getWatchList(): Promise<WatchListResponse> {
    const url = `${this.baseURL}/api/watchlist`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch watch list: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetch individual coin details
   */
  async getCoinDetails(coinId: string): Promise<CoinDetailsResponse> {
    const url = `${this.baseURL}/api/coins/${coinId}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch coin details: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const rabbitRadarAPI = new RabbitRadarAPI();
export default rabbitRadarAPI;
