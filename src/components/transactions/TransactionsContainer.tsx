'use client';

import { Transaction } from "@/lib/data";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TransactionsContainerProps {
  initialData: Transaction[];
}

// [CONCEPT: State Management at Client Boundary]
// This component encapsulates the filtering state and integrates with URL via searchParams.
// It uses SWR for client-side data fetching/caching while honoring initial RSC data.
export function TransactionsContainer({ initialData }: TransactionsContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || 'All Categories';
  const sort = searchParams.get('sort') || 'Latest';
  const page = searchParams.get('page') || '1';
  
  const { data, error, isLoading } = useSWR<Transaction[]>(
    `/api/transactions?query=${query}&category=${category}&sort=${sort}&page=${page}`,
    fetcher,
    { fallbackData: initialData }
  );

  const [searchTerm, setSearchTerm] = useState(query);

  const handleParamChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    params.set('page', '1'); // Reset page on filter change
    router.push(`/transactions?${params.toString()}`);
  };

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== query) {
        handleParamChange('query', searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, query]);

  const transactions = data || initialData;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search transactions"
              className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-2.5 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-4">
            <select 
              value={sort}
              onChange={(e) => handleParamChange('sort', e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Highest">Highest</option>
              <option value="Lowest">Lowest</option>
            </select>
            <select 
              value={category}
              onChange={(e) => handleParamChange('category', e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="All Categories">All Categories</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Groceries">Groceries</option>
              <option value="Dining Out">Dining Out</option>
              <option value="Transportation">Transportation</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Shopping">Shopping</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm">
                <th className="pb-4 font-normal">Recipient / Sender</th>
                <th className="pb-4 font-normal">Category</th>
                <th className="pb-4 font-normal">Transaction Date</th>
                <th className="pb-4 font-normal text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading && !data ? (
                <tr>
                   <td colSpan={4} className="py-8 text-center text-slate-400 italic">Loading transactions...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                   <td colSpan={4} className="py-8 text-center text-slate-400 italic">No transactions found.</td>
                </tr>
              ) : (
                transactions.map((t: Transaction) => (
                  <tr key={t.id} className="text-sm">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-500">{t.category}</td>
                    <td className="py-4 text-slate-500">{new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className={`py-4 text-right font-bold ${t.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                      {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              disabled={parseInt(page) <= 1}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', (parseInt(page) - 1).toString());
                router.push(`/transactions?${params.toString()}`);
              }}
            >
              Prev
            </button>
            <button 
              className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              disabled={transactions.length < 10}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', (parseInt(page) + 1).toString());
                router.push(`/transactions?${params.toString()}`);
              }}
            >
              Next
            </button>
          </div>
          <p className="text-sm text-slate-500">Page {page}</p>
        </div>
      </div>
    </div>
  );
}
