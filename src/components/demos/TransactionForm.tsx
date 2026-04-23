'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createTransaction, ActionState } from '@/lib/actions';

const initialState: ActionState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-grey-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-grey-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Processing...' : 'Add Transaction'}
    </button>
  );
}

export default function TransactionForm() {
  const [state, formAction] = useActionState(async (prevState: ActionState | null, formData: FormData) => {
    const name = formData.get('name') as string;
    const amount = parseFloat(formData.get('amount') as string);
    const category = formData.get('category') as string;

    // Trigger optimistic update if the adder exists on window
    if (typeof window !== 'undefined' && (window as any).addOptimisticTransaction && name && !isNaN(amount) && category) {
      (window as any).addOptimisticTransaction({
        id: 'temp-' + Date.now(),
        name,
        amount,
        category,
        date: new Date().toISOString(),
        avatar: '/avatars/general.jpg',
        isPending: true // We can use this to style it
      });
    }

    return createTransaction(prevState, formData);
  }, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-grey-900">Add New Transaction</h2>
      
      {state.message && (
        <div 
          className={`rounded-lg p-3 text-sm ${
            state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-xs font-bold text-grey-500">
          Transaction Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="e.g. Monthly Rent"
          className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-grey-900 ${
            state.errors?.name ? 'border-red-500' : 'border-grey-300'
          }`}
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="mb-1 block text-xs font-bold text-grey-500">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          step="0.01"
          placeholder="e.g. 1500"
          className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-grey-900 ${
            state.errors?.amount ? 'border-red-500' : 'border-grey-300'
          }`}
        />
        {state.errors?.amount && (
          <p className="mt-1 text-xs text-red-500">{state.errors.amount[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-xs font-bold text-grey-500">
          Category
        </label>
        <select
          id="category"
          name="category"
          className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-grey-900 ${
            state.errors?.category ? 'border-red-500' : 'border-grey-300'
          }`}
        >
          <option value="">Select Category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Education">Education</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Shopping">Shopping</option>
          <option value="General">General</option>
        </select>
        {state.errors?.category && (
          <p className="mt-1 text-xs text-red-500">{state.errors.category[0]}</p>
        )}
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>

      <p className="text-center text-[10px] text-grey-500">
        Tip: Type "error" in name to simulate a server failure.
      </p>
    </form>
  );
}
