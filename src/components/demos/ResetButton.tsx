'use client';

import { useTransition } from 'react';
import { resetDatabase } from '@/lib/actions';

export default function ResetButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      type="button"
      disabled={isPending}
      onClick={() => startTransition(async () => {
        await resetDatabase();
      })}
      className="rounded-lg border border-grey-300 px-4 py-2 text-sm font-medium text-grey-900 transition-colors hover:bg-grey-100 disabled:opacity-50"
    >
      {isPending ? 'Resetting...' : 'Reset Lab Data'}
    </button>
  );
}
