import { PageHeader } from "@/components/PageHeader";
import { TransactionsContainer } from "@/components/transactions/TransactionsContainer";
import { getTransactions } from "@/lib/data";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page || "1");

  const initialTransactions = await getTransactions(query, page);

  return (
    <div>
      <PageHeader title="Transactions" />
      <TransactionsContainer initialData={initialTransactions} />
    </div>
  );
}
