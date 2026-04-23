'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { mockDb } from './mock-db';

/**
 * Revalidates a specific path on-demand.
 * Used to demonstrate Full Route Cache and Data Cache invalidation.
 */
export async function purgePath(path: string) {
  revalidatePath(path);
}

/**
 * Revalidates a specific cache tag on-demand.
 * Used to demonstrate granular Data Cache invalidation.
 */
export async function purgeTag(tag: string) {
  revalidateTag(tag, 'page');
}

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: any;
};

/**
 * Helper to standardise revalidation after an action
 */
export async function revalidateAction(path: string = '/demos/actions', tag: string = 'transactions') {
  revalidatePath(path);
  revalidateTag(tag, 'page');
}

/**
 * Server Action: Create a new transaction
 */
export async function createTransaction(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get('name') as string;
  const amountStr = formData.get('amount') as string;
  const category = formData.get('category') as string;

  const errors: Record<string, string[]> = {};

  if (!name || name.trim().length < 3) {
    errors.name = ['Name must be at least 3 characters long'];
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount === 0) {
    errors.amount = ['Please enter a valid amount'];
  }

  if (!category) {
    errors.category = ['Please select a category'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Validation failed',
      errors,
    };
  }

  // Scenario: Simulated Server Error
  if (name.toLowerCase().includes('error')) {
    return {
      success: false,
      message: 'A simulated server error occurred. Transaction not saved.',
    };
  }

  try {
    mockDb.addTransaction({
      name,
      amount,
      category,
      avatar: '/avatars/general.jpg',
    });

    await revalidateAction();

    return {
      success: true,
      message: 'Transaction created successfully!',
    };
  } catch (e) {
    return {
      success: false,
      message: 'Failed to create transaction',
    };
  }
}

/**
 * Server Action: Delete a transaction
 */
export async function deleteTransaction(id: string): Promise<ActionState> {
  try {
    mockDb.deleteTransaction(id);
    await revalidateAction();
    return { success: true, message: 'Transaction deleted' };
  } catch (e) {
    return { success: false, message: 'Failed to delete transaction' };
  }
}

/**
 * Server Action: Reset the mock database
 */
export async function resetDatabase(): Promise<ActionState> {
  try {
    mockDb.reset();
    await revalidateAction();
    return { success: true, message: 'Database reset' };
  } catch (e) {
    return { success: false, message: 'Failed to reset database' };
  }
}
