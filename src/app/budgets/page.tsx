import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { getBudgets } from "@/lib/data";
import { BudgetCard } from "@/components/budgets/BudgetCard";
import { WidgetSkeleton } from "@/components/ui/Skeleton";

// [CONCEPT: Dynamic SSR]
// Explicitly opt-out of static generation to fetch fresh budget calculations on every request.
export const dynamic = 'force-dynamic';

export default async function BudgetsPage() {
  const budgets = await getBudgets();

  return (
    <div className="space-y-6">
      <PageHeader title="Budgets" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {budgets.map((budget) => (
          <Suspense key={budget.category} fallback={<WidgetSkeleton />}>
            <BudgetCard budget={budget} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
