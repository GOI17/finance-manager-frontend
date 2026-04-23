import { getPots } from "@/lib/data";

export async function PotsList() {
  const pots = await getPots();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
      {pots.map((pot) => (
        <div key={pot.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: pot.theme }}
            />
            <h3 className="text-xl font-bold font-public-sans text-slate-900">{pot.name}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Saved</span>
              <span className="text-3xl font-bold font-public-sans text-slate-900">${pot.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all" 
                style={{ 
                  backgroundColor: pot.theme, 
                  width: `${Math.min((pot.total / pot.target) * 100, 100)}%` 
                }}
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">{((pot.total / pot.target) * 100).toFixed(1)}%</span>
              <span className="text-slate-400">Target of ${pot.target.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
