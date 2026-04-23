import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { PotsList } from "@/components/pots/PotsList";
import { WidgetSkeleton } from "@/components/ui/Skeleton";

// [CONCEPT: Dynamic SSR]
// Explicitly opt-out of static generation to fetch fresh pots data on every request.
export const dynamic = 'force-dynamic';

export default function PotsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pots" />
      
      <Suspense fallback={<WidgetSkeleton />}>
        <PotsList />
      </Suspense>
    </div>
  );
}
