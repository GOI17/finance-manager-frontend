import { cn } from '@/lib/utils';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(shimmer, "relative overflow-hidden rounded-md bg-slate-100", className)}
    />
  );
}

export function BalanceSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-8 w-32" />
        </div>
      ))}
    </div>
  );
}

export function TransactionRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="text-right">
        <Skeleton className="h-4 w-16 mb-2 ml-auto" />
        <Skeleton className="h-3 w-24 ml-auto" />
      </div>
    </div>
  );
}

export function BudgetSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-1 ml-0" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BillSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
