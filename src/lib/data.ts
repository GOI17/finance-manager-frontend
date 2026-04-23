import { Transaction, Budget, Pot, Bill, OverviewData } from './types';

// [CONCEPT: Async Mock Data]
// Using async functions and setTimeout to simulate real server latency.
// This triggers Next.js Suspense and Streaming behaviors naturally in RSCs.

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Emma Richardson', amount: 75.50, category: 'General', date: '2024-08-19T14:23:00', avatar: '/avatars/emma.jpg', isNew: true },
  { id: '2', name: 'Savory Bites Bistro', amount: -55.50, category: 'Dining Out', date: '2024-08-19T20:23:00', avatar: '/avatars/savory.jpg', isNew: false },
  { id: '3', name: 'Daniel Carter', amount: -42.30, category: 'Entertainment', date: '2024-08-18T10:15:00', avatar: '/avatars/daniel.jpg', isNew: false },
  { id: '4', name: 'Sunnyside Grocery', amount: -120.20, category: 'Groceries', date: '2024-08-17T11:45:00', avatar: '/avatars/sunnyside.jpg', isNew: false },
  { id: '5', name: 'Urban Services', amount: -65.00, category: 'Bills', date: '2024-08-16T15:00:00', avatar: '/avatars/urban.jpg', isNew: false },
];

const MOCK_BUDGETS: Budget[] = [
  { category: 'Entertainment', maximum: 50.00, theme: '#277C78' },
  { category: 'Bills', maximum: 750.00, theme: '#82C9D7' },
  { category: 'Groceries', maximum: 400.00, theme: '#F2CDAC' },
  { category: 'Dining Out', maximum: 150.00, theme: '#626070' },
];

const MOCK_POTS: Pot[] = [
  { name: 'Savings', target: 2000, total: 159, theme: '#277C78' },
  { name: 'Concert Tickets', target: 150, total: 110, theme: '#626070' },
  { name: 'Gift', target: 150, total: 40, theme: '#82C9D7' },
  { name: 'New Laptop', target: 1000, total: 10, theme: '#F2CDAC' },
];

const MOCK_BILLS: Bill[] = [
  { name: 'Spark Electric', dueDate: 'Monthly - 2nd', amount: 54.00, isPaid: false },
  { name: 'Serenity Water', dueDate: 'Monthly - 12th', amount: 30.00, isPaid: false },
  { name: 'Nexus Internet', dueDate: 'Monthly - 22nd', amount: 40.00, isPaid: true },
];

export async function getTransactions(): Promise<Transaction[]> {
  await delay(1200); // Simulate network latency
  return MOCK_TRANSACTIONS;
}

export async function getBudgets(): Promise<Budget[]> {
  await delay(800);
  return MOCK_BUDGETS;
}

export async function getPots(): Promise<Pot[]> {
  await delay(600);
  return MOCK_POTS;
}

export async function getBills(): Promise<Bill[]> {
  await delay(1000);
  return MOCK_BILLS;
}

export async function getOverviewData(): Promise<OverviewData> {
  // Simulate a heavier aggregation request
  await delay(1500);
  return {
    balance: {
      current: 4836.00,
      income: 3814.25,
      expenses: 1702.50
    },
    transactions: MOCK_TRANSACTIONS.slice(0, 5),
    budgets: MOCK_BUDGETS,
    pots: MOCK_POTS.slice(0, 4)
  };
}
