import { PageHeader } from "@/components/PageHeader";
import { getTransactions } from "@/lib/data";
import TransactionsContainer from "@/components/transactions/TransactionsContainer";

// [CONCEPT: Hybrid RSC + CSR Boundary]
// This page is a React Server Component (RSC).
// It fetches initial data server-side and passes it to a 'use client' container.
// This ensures fast initial render (LCP) and interactive filtering (UX).

// [CONCEPT: Dynamic Rendering]
// Use force-dynamic to always provide fresh transaction data.
export const dynamic = 'force-dynamic';

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  
  // Extract unique categories for the filters
  const categories = Array.from(new Set(transactions.map(t => t.category)));

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" />
      <TransactionsContainer 
        initialTransactions={transactions} 
        categories={categories} 
      />
    </div>
  );
}
