'use client';

import { useState } from 'react';
import { Transaction } from '@/lib/types';

interface TransactionFiltersProps {
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
  onSort: (sortBy: string) => void;
  categories: string[];
}

// [CONCEPT: Client Boundary]
// This component uses 'use client' because it handles interactive state (search, dropdowns).
// It receives initial config or functions from the parent RSC.

export default function TransactionFilters({ onSearch, onFilter, onSort, categories }: TransactionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
      <div className="flex-1 relative">
        <label htmlFor="search-transactions" className="sr-only">Search transactions</label>
        <input
          id="search-transactions"
          type="text"
          placeholder="Search transaction"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <span className="absolute right-3 top-2.5 text-gray-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
           </svg>
        </span>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-sm text-gray-500">Sort by</label>
          <select 
            id="sort-by"
            onChange={(e) => onSort(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-a</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="category-filter" className="text-sm text-gray-500">Category</label>
          <select 
            id="category-filter"
            onChange={(e) => onFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">All Transactions</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
