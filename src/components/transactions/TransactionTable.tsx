'use client';

import { Transaction } from '@/lib/types';

interface TransactionTableProps {
  transactions: Transaction[];
}

// [CONCEPT: Shared UI in Client Boundary]
// This component displays data filtered by the client-side state of its parent.
// Even though it's UI only, it lives inside the Client Boundary to update instantly.

export default function TransactionTable({ transactions }: TransactionTableProps) {
  if (!transactions.length) {
    return <div className="p-8 text-center text-gray-500">No transactions found.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4">Transaction Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Transaction Date</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map(transaction => {
              const dateObj = new Date(transaction.date);
              const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
              const isExpense = transaction.amount < 0;

              return (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img 
                           src={transaction.avatar} 
                           alt={transaction.name} 
                           className="w-full h-full object-cover"
                           onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                      <span className="font-bold text-gray-900">{transaction.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{transaction.category}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{formattedDate}</td>
                  <td className={`px-6 py-4 text-right font-bold ${isExpense ? 'text-gray-900' : 'text-green-600'}`}>
                    {isExpense ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
