import { Budget } from "@/lib/types";

export function BudgetCard({ budget }: { budget: Budget }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-1 h-6 rounded-full" 
          style={{ backgroundColor: budget.theme }}
        />
        <h3 className="text-xl font-bold font-public-sans text-slate-900">{budget.category}</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Maximum</span>
          <span className="text-lg font-bold font-public-sans text-slate-900">${budget.maximum.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        
        <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden flex items-center px-4">
          <div 
            className="h-full -mx-4 transition-all" 
            style={{ backgroundColor: budget.theme, opacity: 0.15, width: '40%' }} // Simulated spent 40%
          />
          <span className="text-xs font-bold text-slate-500 relative z-10">40% spent</span>
        </div>
      </div>
    </div>
  );
}
