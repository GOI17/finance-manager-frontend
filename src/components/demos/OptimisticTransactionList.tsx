'use client';

import { useOptimistic, startTransition } from 'react';
import { Transaction } from '@/lib/types';
import { deleteTransaction } from '@/lib/actions';
import Image from 'next/image';

interface OptimisticTransactionListProps {
  initialTransactions: Transaction[];
}

export default function OptimisticTransactionList({
  initialTransactions,
}: OptimisticTransactionListProps) {
  // Expose the optimistic adder via window for verification/integration demo
  // In a real app, this would be passed via context or props to the form
  if (typeof window !== 'undefined') {
    (window as any).addOptimisticTransaction = (transaction: Transaction) => {
      startTransition(() => {
        setOptimisticTransactions({ action: 'add', payload: transaction });
      });
    };
  }

  const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
    initialTransactions,
    (state, { action, payload }: { action: 'delete' | 'add'; payload: any }) => {
      if (action === 'delete') {
        return state.filter((t) => t.id !== payload);
      }
      if (action === 'add') {
        return [payload, ...state];
      }
      return state;
    }
  );

  const handleDelete = async (id: string) => {
    startTransition(() => {
      setOptimisticTransactions({ action: 'delete', payload: id });
    });
    
    await deleteTransaction(id);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-grey-900">Recent Transactions</h2>
        <span className="text-xs text-grey-500">
          Showing {optimisticTransactions.length} items
        </span>
      </div>

      <div className="space-y-4">
        {optimisticTransactions.length === 0 ? (
          <p className="py-10 text-center text-sm text-grey-500">No transactions found.</p>
        ) : (
          optimisticTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between border-b border-grey-100 pb-4 last:border-0 last:pb-0 ${
                (transaction as any).isPending ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={transaction.avatar || '/avatars/general.jpg'}
                    alt={transaction.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-grey-900">{transaction.name}</h3>
                  <p className="text-xs text-grey-500">{transaction.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className={`text-sm font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-700'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-grey-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-xs font-medium text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
