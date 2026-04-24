import { PageHeader } from "@/components/PageHeader";
import { TransactionsContainer } from "@/components/transactions/TransactionsContainer";
import { getTransactions } from "@/lib/data";

// [CONCEPT: Hybrid RSC + CSR Boundary]
// This page is a React Server Component (RSC).
// It fetches initial data server-side and passes it to a 'use client' container.
// This ensures fast initial render (LCP) and interactive filtering (UX).

// [CONCEPT: Dynamic Rendering]
// Use force-dynamic to always provide fresh transaction data.
export const dynamic = 'force-dynamic';

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page || "1");

  const data = await getTransactions(query, page);

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" />
      <TransactionsContainer initialData={data} />
    </div>
  );
}
