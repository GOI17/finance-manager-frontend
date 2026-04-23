import { getTransactions } from "@/lib/data";
import Image from "next/image";

export async function OverviewTransactions() {
  const transactions = await getTransactions();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Transactions</h2>
        <a href="/transactions" className="text-sm text-slate-500 hover:text-slate-900">View All</a>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                {/* Fallback for missing images in mock data */}
                <div className="h-full w-full flex items-center justify-center bg-slate-200 text-slate-500 text-xs uppercase">
                  {transaction.name.charAt(0)}
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-900">{transaction.name}</p>
                <p className="text-sm text-slate-500">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </p>
              <p className="text-sm text-slate-500">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
