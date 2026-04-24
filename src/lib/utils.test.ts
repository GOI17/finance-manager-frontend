import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge basic Tailwind classes', () => {
    // Scenario 2.2: verify merging basic Tailwind classes
    const result = cn('p-4', 'bg-red-500');
    expect(result).toBe('p-4 bg-red-500');
  });

  it('should handle conditional class logic', () => {
    // Scenario 2.3: verify conditional class logic (truthy/falsy inputs)
    const isPrimary = true;
    const isSecondary = false;
    
    const result = cn(
      'btn',
      isPrimary && 'btn-primary',
      isSecondary && 'btn-secondary'
    );
    
    expect(result).toContain('btn');
    expect(result).toContain('btn-primary');
    expect(result).not.toContain('btn-secondary');
  });

  it('should resolve conflicting Tailwind classes using tailwind-merge', () => {
    // Scenario 2.4: verify tailwind-merge resolving conflicting classes
    // p-8 should override p-4 because it comes later and tailwind-merge handles specificity
    const result = cn('p-4', 'p-8');
    expect(result).toBe('p-8');
  });

  it('should handle undefined, null, and boolean values correctly', () => {
    // Edge case testing for pedagogical value
    const result = cn('base', undefined, null, false, 'extra');
    expect(result).toBe('base extra');
  });
});
