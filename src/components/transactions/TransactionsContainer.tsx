'use client';

import { useState, useMemo } from 'react';
import { Transaction } from '@/lib/types';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';

interface TransactionsContainerProps {
  initialTransactions: Transaction[];
  categories: string[];
}

// [CONCEPT: State Management at Client Boundary]
// This component encapsulates the filtering state to update without re-rendering the whole page or 
// triggering a full browser refresh. This is the 'Hybrid RSC + CSR' pattern.

export default function TransactionsContainer({ initialTransactions, categories }: TransactionsContainerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredTransactions = useMemo(() => {
    let list = [...initialTransactions];

    if (searchTerm) {
      list = list.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (category !== 'all') {
      list = list.filter(t => t.category === category);
    }

    if (sortBy === 'latest') {
      list = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      list = list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'highest') {
      list = list.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    } else if (sortBy === 'lowest') {
      list = list.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
    } else if (sortBy === 'a-z') {
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'z-a') {
      list = list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [initialTransactions, searchTerm, category, sortBy]);

  return (
    <>
      <TransactionFilters 
        onSearch={setSearchTerm} 
        onFilter={setCategory} 
        onSort={setSortBy} 
        categories={categories}
      />
      <TransactionTable transactions={filteredTransactions} />
    </>
  );
}
