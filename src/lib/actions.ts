'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

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
