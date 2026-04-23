import { getOverviewData } from "@/lib/data";

export async function BalanceSummary() {
  const data = await getOverviewData();
  const { balance } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Current Balance */}
      <div className="bg-black text-white p-6 rounded-xl shadow-sm">
        <p className="text-sm opacity-70 mb-2">Current Balance</p>
        <p className="text-3xl font-bold font-public-sans text-white">${balance.current.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>

      {/* Income */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500 mb-2">Income</p>
        <p className="text-3xl font-bold font-public-sans text-slate-900">${balance.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>

      {/* Expenses */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500 mb-2">Expenses</p>
        <p className="text-3xl font-bold font-public-sans text-slate-900">${balance.expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
}
