import { getTransactions } from '@/lib/data';
import TransactionForm from '@/components/demos/TransactionForm';
import OptimisticTransactionList from '@/components/demos/OptimisticTransactionList';
import ResetButton from '@/components/demos/ResetButton';

export const metadata = {
  title: 'Server Actions Lab - Finance Manager',
  description: 'Practice Next.js Server Actions, useActionState, and useOptimistic.',
};

export default async function ActionsLabPage() {
  // Fetch initial data on the server
  const { transactions } = await getTransactions();

  return (
    <div className="container mx-auto max-w-5xl p-6 lg:p-10">
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-grey-900">Server Actions Lab</h1>
          <p className="text-grey-500">
            Experiment with mutations, revalidation, and optimistic UI updates.
          </p>
        </div>
        
        <ResetButton />
      </header>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 space-y-6">
            <TransactionForm />
            
            <div className="rounded-xl bg-grey-100 p-6">
              <h3 className="mb-2 text-sm font-bold text-grey-900">How it works</h3>
              <ul className="list-inside list-disc space-y-2 text-xs text-grey-500">
                <li>Uses <strong>useActionState</strong> for form feedback.</li>
                <li>Uses <strong>useFormStatus</strong> for the loading button.</li>
                <li>Uses <strong>revalidatePath</strong> to refresh server data.</li>
                <li>Simulates persistence with an in-memory <strong>Mock DB</strong>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-2">
          <OptimisticTransactionList initialTransactions={transactions} />
        </div>
      </div>
    </div>
  );
}
