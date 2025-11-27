'use client';

import { useState, useMemo } from 'react';
import CoinRow from './CoinRow';
import WindowSelector from './WindowSelector';
import { CoinData } from '@/lib/types';

interface DashboardClientProps {
  initialCoins: CoinData[];
}

type SortField = 'rank' | 'rr_score' | 'base_velocity' | 'price' | 'market_cap' | 'volume_24h' | 'days_tracking';
type SortDirection = 'asc' | 'desc';

export default function DashboardClient({ initialCoins }: DashboardClientProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [minScore, setMinScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedWindow, setSelectedWindow] = useState<2 | 3 | 7 | 14 | 30 | 90 | 180 | 270 | 365>(14);
  const [coins, setCoins] = useState<CoinData[]>(initialCoins);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data for selected window
  const handleWindowChange = async (window: 1 | 3 | 7 | 14 | 30) => {
    setSelectedWindow(window);
    setIsLoading(true);
    setCurrentPage(1);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://rabbit-radar-api.vercel.app';
      const response = await fetch(`${apiUrl}/api/dashboard?window=${window}&minRank=1&maxRank=1000`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data && Array.isArray(data.data)) {
        setCoins(data.data);
      } else {
        console.error('Invalid API response:', data);
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Data is already in the correct format from API (no mapping needed)
  const coinsWithMappedFields = useMemo(() => {
    return coins;
  }, [coins]);

  // Filter and sort coins
  const filteredAndSortedCoins = useMemo(() => {
    let result = [...coinsWithMappedFields];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
      );
    }

    // Score filter (use base_velocity as fallback if rr_score not available)
    if (minScore > 0) {
      result = result.filter((coin) => {
        const score = typeof coin.rr_score === 'number' ? coin.rr_score :
                     (typeof coin.rr_score === 'string' ? parseFloat(coin.rr_score) : 0);
        return score >= minScore;
      });
    }

    // Sort
    result.sort((a, b) => {
      let aVal: number, bVal: number;

      switch (sortField) {
        case 'rank':
          aVal = a.rank;
          bVal = b.rank;
          break;
        case 'rr_score':
          aVal = a.rr_score || 0;
          bVal = b.rr_score || 0;
          break;
        case 'base_velocity':
          aVal = a.base_velocity || 0;
          bVal = b.base_velocity || 0;
          break;
        case 'price':
          aVal = a.price;
          bVal = b.price;
          break;
        case 'market_cap':
          aVal = a.market_cap;
          bVal = b.market_cap;
          break;
        case 'volume_24h':
          aVal = a.volume_24h;
          bVal = b.volume_24h;
          break;
        case 'days_tracking':
          aVal = a.days_tracking || 0;
          bVal = b.days_tracking || 0;
          break;
        default:
          return 0;
      }

      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [coinsWithMappedFields, search, minScore, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCoins.length / itemsPerPage);
  const paginatedCoins = filteredAndSortedCoins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'rank' ? 'asc' : 'desc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    const isActive = sortField === field;
    const isAsc = sortDirection === 'asc';

    return (
      <span className="inline-flex ml-1 w-4 h-4 items-center justify-center">
        {!isActive ? (
          <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 10l5-5 5 5H5z" />
            <path d="M5 10l5 5 5-5H5z" />
          </svg>
        ) : isAsc ? (
          <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    );
  };

  return (
    <div>
      {/* Filters and Search */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        {/* Window Selector - Prominent */}
        <div className="mb-4 pb-4 border-b border-gray-800">
          <label className="block text-sm text-gray-400 mb-3">📊 Time Window</label>
          <WindowSelector
            selectedWindow={selectedWindow}
            onWindowChange={handleWindowChange}
            disabled={isLoading}
            size="md"
          />
          <p className="text-xs text-gray-500 mt-2">
            Showing R2 scores calculated over the last {selectedWindow} days
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Search Coins</label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name or symbol..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Min Score Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Min RR Score</label>
            <select
              value={minScore}
              onChange={(e) => {
                setMinScore(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value={0}>All Scores</option>
              <option value={4}>4+ (Moderate)</option>
              <option value={6}>6+ (Worth Watching)</option>
              <option value={8}>8+ (Strong Rabbits)</option>
            </select>
          </div>

          {/* Items Per Page */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Per Page</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
              <option value={10000}>ALL</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-3 text-sm text-gray-400">
          Showing {paginatedCoins.length} of {filteredAndSortedCoins.length} coins
          {search && ` matching "${search}"`}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {paginatedCoins.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-gray-400">No coins found matching your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <colgroup>
                <col style={{ width: '60px', minWidth: '60px' }} /> {/* Rank */}
                <col style={{ width: '200px', minWidth: '200px' }} /> {/* Coin */}
                <col style={{ width: '130px', minWidth: '130px' }} /> {/* Price */}
                <col style={{ width: '140px', minWidth: '140px' }} /> {/* Market Cap */}
                <col style={{ width: '140px', minWidth: '140px' }} /> {/* 24h Volume */}
                <col style={{ width: '110px', minWidth: '110px' }} /> {/* RR Score */}
                <col style={{ width: '110px', minWidth: '110px' }} /> {/* Velocity */}
                <col style={{ width: '100px', minWidth: '100px' }} /> {/* Phase */}
                <col style={{ width: '90px', minWidth: '90px' }} /> {/* Days */}
              </colgroup>
              <thead className="bg-gray-800 text-sm">
                <tr>
                  <th colSpan={9} className="p-0">
                    <div
                      className="grid grid-cols-9 gap-2 px-6 py-4"
                      style={{
                        gridTemplateColumns: '60px 200px 130px 140px 140px 110px 110px 100px 90px'
                      }}
                    >
                      <div
                        onClick={() => handleSort('rank')}
                        className="text-left font-semibold cursor-pointer hover:text-blue-400 transition-colors select-none"
                      >
                        <div className="flex items-center">
                          Rank
                          {getSortIcon('rank')}
                        </div>
                      </div>
                      <div className="text-left font-semibold">Coin</div>
                      <div
                        onClick={() => handleSort('price')}
                        className="text-right font-semibold cursor-pointer hover:text-blue-400 transition-colors select-none"
                      >
                        <div className="flex items-center justify-end">
                          Price
                          {getSortIcon('price')}
                        </div>
                      </div>
                      <div
                        onClick={() => handleSort('market_cap')}
                        className="text-right font-semibold cursor-pointer hover:text-blue-400 transition-colors select-none"
                      >
                        <div className="flex items-center justify-end">
                          Market Cap
                          {getSortIcon('market_cap')}
                        </div>
                      </div>
                      <div
                        onClick={() => handleSort('volume_24h')}
                        className="text-right font-semibold cursor-pointer hover:text-blue-400 transition-colors select-none"
                      >
                        <div className="flex items-center justify-end">
                          24h Volume
                          {getSortIcon('volume_24h')}
                        </div>
                      </div>
                      <div
                        onClick={() => handleSort('rr_score')}
                        className="text-right font-semibold cursor-pointer hover:text-blue-400 transition-colors select-none"
                      >
                        <div className="flex items-center justify-end">
                          RR Score
                          {getSortIcon('rr_score')}
                        </div>
                      </div>
                      <div
                        onClick={() => handleSort('base_velocity')}
                        className="text-right font-semibold cursor-pointer hover:text-blue-400 transition-colors select-none"
                      >
                        <div className="flex items-center justify-end">
                          Velocity
                          {getSortIcon('base_velocity')}
                        </div>
                      </div>
                      <div className="text-right font-semibold">Phase</div>
                      <div
                        onClick={() => handleSort('days_tracking')}
                        className="text-right font-semibold cursor-pointer hover:text-blue-400 transition-colors select-none"
                      >
                        <div className="flex items-center justify-end">
                          Days
                          {getSortIcon('days_tracking')}
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginatedCoins.map((coin) => (
                  <CoinRow key={coin.coin_id} coin={coin} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
