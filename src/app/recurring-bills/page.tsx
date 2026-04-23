import { PageHeader } from "@/components/PageHeader";
import { getBills } from "@/lib/data";

// [CONCEPT: ISR (Incremental Static Regeneration)]
// This page is statically pre-rendered at build time.
// It will be background-regenerated every 60 seconds if requests come in.
export const revalidate = 60;

export default async function RecurringBillsPage() {
  const bills = await getBills();

  const totalUpcoming = bills.reduce((acc, bill) => acc + bill.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Recurring Bills" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Totals */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-black text-white p-6 rounded-xl shadow-sm">
            <p className="text-sm opacity-70 mb-2 font-medium uppercase tracking-wider">Total Bills</p>
            <p className="text-3xl font-bold font-public-sans text-white">
              ${totalUpcoming.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold font-public-sans text-slate-900 mb-6">Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">Paid Bills</span>
                <span className="text-sm font-bold font-public-sans text-slate-900">
                  {bills.filter(b => b.isPaid).length} (${bills.filter(b => b.isPaid).reduce((acc, b) => acc + b.amount, 0).toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">Total Upcoming</span>
                <span className="text-sm font-bold font-public-sans text-slate-900">
                  {bills.filter(b => !b.isPaid).length} (${bills.filter(b => !b.isPaid).reduce((acc, b) => acc + b.amount, 0).toFixed(2)})
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Detailed List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-100 mb-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Bill Name</div>
              <div className="col-span-4">Due Date</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            
            <div className="space-y-4">
              {bills.map((bill) => (
                <div key={bill.name} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold uppercase">
                      {bill.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold font-public-sans text-slate-900">{bill.name}</span>
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <span className={`text-xs font-medium ${bill.isPaid ? 'text-green-600' : 'text-slate-500'}`}>
                      {bill.dueDate}
                    </span>
                    {bill.isPaid && (
                      <div className="bg-green-100 p-0.5 rounded-full">
                        <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 text-right text-sm font-bold font-public-sans text-slate-900">
                    ${bill.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
