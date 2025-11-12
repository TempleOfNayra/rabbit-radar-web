'use client';

import { useState, useMemo } from 'react';
import CoinRow from './CoinRow';
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

  // Filter and sort coins
  const filteredAndSortedCoins = useMemo(() => {
    let result = [...initialCoins];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
      );
    }

    // Score filter
    if (minScore > 0) {
      result = result.filter((coin) => (coin.rr_score || 0) >= minScore);
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
  }, [initialCoins, search, minScore, sortField, sortDirection]);

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
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div>
      {/* Filters and Search */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
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
              <thead className="bg-gray-800 text-sm">
                <tr>
                  <th
                    onClick={() => handleSort('rank')}
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    Rank {getSortIcon('rank')}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Velocity</th>
                  <th className="px-6 py-4 text-left font-semibold">Coin</th>
                  <th
                    onClick={() => handleSort('price')}
                    className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    Price {getSortIcon('price')}
                  </th>
                  <th
                    onClick={() => handleSort('market_cap')}
                    className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    Market Cap {getSortIcon('market_cap')}
                  </th>
                  <th
                    onClick={() => handleSort('volume_24h')}
                    className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    24h Volume {getSortIcon('volume_24h')}
                  </th>
                  <th
                    onClick={() => handleSort('rr_score')}
                    className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    RR Score {getSortIcon('rr_score')}
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">Phase</th>
                  <th
                    onClick={() => handleSort('days_tracking')}
                    className="px-6 py-4 text-right font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    Days {getSortIcon('days_tracking')}
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
