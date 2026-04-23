import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind CSS classes safely using clsx and tailwind-merge.
 * Resolves specificity conflicts (e.g., 'p-2 p-4' results in 'p-4').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
