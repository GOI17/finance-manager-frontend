export interface CacheDemoData {
  message: string;
  timestamp: number;
  data: {
    value: number;
    status: string;
  };
}

export async function getCacheDemoData(): Promise<CacheDemoData> {
  // Simulate a delay to make caching more apparent
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    message: 'Cache demo data fetched successfully',
    timestamp: Date.now(),
    data: {
      value: Math.random(),
      status: 'success'
    }
  };
}
