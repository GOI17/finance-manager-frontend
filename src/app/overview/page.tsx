import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { BalanceSummary } from "@/components/overview/BalanceSummary";
import { RecentTransactions } from "@/components/overview/RecentTransactions";
import { BalanceSkeleton, WidgetSkeleton } from "@/components/ui/Skeleton";

// [CONCEPT: SSR + Streaming]
// This page is a Server Component. It fetches data and uses Suspense to stream in components.
// The PageHeader and Layout (Sidebar, TopNav) render immediately.
// Widgets stream in as their async data requirements are met.

// [CONCEPT: Dynamic Rendering]
// Force dynamic rendering to ensure the overview always reflects the latest state.
export const dynamic = 'force-dynamic';

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Overview" />

      {/* Primary Balance Metrics - Streamed */}
      <Suspense fallback={<BalanceSkeleton />}>
        <BalanceSummary />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions - Streamed */}
        <Suspense fallback={<WidgetSkeleton />}>
          <RecentTransactions />
        </Suspense>

        {/* Secondary widgets would go here (Budgets, Pots) */}
        <div className="bg-slate-100 rounded-xl p-6 border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
          <p className="text-sm italic">Additional widgets (Budgets, Pots) placeholder...</p>
        </div>
      </div>
    </div>
  );
}
