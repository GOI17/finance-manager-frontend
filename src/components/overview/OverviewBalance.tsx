import { getBalance } from "@/lib/data";

export async function OverviewBalance() {
  const balance = await getBalance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900 p-6 rounded-xl shadow-sm text-white">
        <p className="text-slate-400 text-sm mb-2">Current Balance</p>
        <p className="text-3xl font-bold">${balance.current.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-slate-500 text-sm mb-2">Income</p>
        <p className="text-3xl font-bold">${balance.income.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-slate-500 text-sm mb-2">Expenses</p>
        <p className="text-3xl font-bold">${balance.expenses.toFixed(2)}</p>
      </div>
    </div>
  );
}
