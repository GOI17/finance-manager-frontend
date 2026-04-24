import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CacheStatus from './CacheStatus';

describe('CacheStatus Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the label and formatted timestamp correctly', () => {
    const timestamp = new Date('2026-04-24T12:00:00Z').getTime();
    // Setting "now" to 5 seconds after the timestamp
    vi.setSystemTime(new Date('2026-04-24T12:00:05Z'));

    render(<CacheStatus timestamp={timestamp} label="Test Label" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText(/5s ago/)).toBeInTheDocument();
  });

  it('updates the "seconds ago" text every second', () => {
    const timestamp = Date.now();
    render(<CacheStatus timestamp={timestamp} />);

    expect(screen.getByText(/0s ago/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/1s ago/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/3s ago/)).toBeInTheDocument();
  });

  it('applies the correct status color for fresh data', () => {
    const timestamp = Date.now();
    const { container } = render(<CacheStatus timestamp={timestamp} revalidate={10} />);
    
    // 0s ago is fresh (< 75% of 10s)
    const statusDot = container.querySelector('.rounded-full');
    expect(statusDot).toHaveClass('bg-emerald-500');
  });

  it('applies the warning color when nearing revalidation', () => {
    const timestamp = Date.now();
    render(<CacheStatus timestamp={timestamp} revalidate={10} />);

    act(() => {
      // 8s ago is > 75% of 10s (which is 7.5s)
      vi.advanceTimersByTime(8000);
    });

    const statusDot = document.querySelector('.rounded-full');
    expect(statusDot).toHaveClass('bg-amber-500');
  });

  it('applies the stale color and text when revalidation time is exceeded', () => {
    const timestamp = Date.now();
    render(<CacheStatus timestamp={timestamp} revalidate={10} />);

    act(() => {
      vi.advanceTimersByTime(11000);
    });

    const statusDot = document.querySelector('.rounded-full');
    expect(statusDot).toHaveClass('bg-rose-500');
    expect(screen.getByText(/STALE/)).toBeInTheDocument();
  });
});
