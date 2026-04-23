/**
 * Simulates a randomized delay to mimic real-world network latency.
 * @param min Minimum delay in milliseconds
 * @param max Maximum delay in milliseconds
 */
export const delay = (min: number = 500, max: number = 1500) => {
  const ms = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Budget {
  id: string;
  category: string;
  maximum: number;
  spent: number;
  color: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
}

export interface Pot {
  id: string;
  name: string;
  target: number;
  total: number;
  color: string;
}

export interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  avatar: string;
}

export const getBalance = async (): Promise<Balance> => {
  await delay();
  return {
    current: 4836.00,
    income: 3814.25,
    expenses: 1700.50,
  };
};

export const getBudgets = async (): Promise<Budget[]> => {
  await delay();
  return [
    { id: '1', category: 'Entertainment', maximum: 50.00, spent: 15.00, color: '#277C78' },
    { id: '2', category: 'Bills', maximum: 750.00, spent: 150.00, color: '#82C9D7' },
    { id: '3', category: 'Dining Out', maximum: 75.00, spent: 40.00, color: '#F2CDAC' },
    { id: '4', category: 'Personal Care', maximum: 100.00, spent: 25.00, color: '#626070' },
  ];
};

export const getUserSettings = async () => {
  await delay(200, 500); // Faster fetch for settings
  return {
    currency: 'USD',
    theme: 'light',
    budgetExceededAlert: true,
  };
};

export const getBudgetsWithSettings = async (settings: { currency: string; theme: string; budgetExceededAlert: boolean }): Promise<Budget[]> => {
  // Simulate logic dependent on settings
  console.log(`Fetching budgets using currency: ${settings.currency}`);
  await delay();
  return [
    { id: '1', category: 'Entertainment', maximum: 50.00, spent: 15.00, color: '#277C78' },
    { id: '2', category: 'Bills', maximum: 750.00, spent: 150.00, color: '#82C9D7' },
    { id: '3', category: 'Dining Out', maximum: 75.00, spent: 40.00, color: '#F2CDAC' },
    { id: '4', category: 'Personal Care', maximum: 100.00, spent: 25.00, color: '#626070' },
  ];
};

export const getRecurringBills = async (): Promise<Bill[]> => {
  await delay();
  return [
    { id: '1', name: 'Spark Electric', amount: 100.00, dueDate: 'Monthly-02nd', isPaid: true },
    { id: '2', name: 'Serenity Spa', amount: 25.00, dueDate: 'Monthly-03rd', isPaid: true },
    { id: '3', name: 'Health-conscious', amount: 15.00, dueDate: 'Monthly-11th', isPaid: false },
    { id: '4', name: 'Pixel Playground', amount: 10.00, dueDate: 'Monthly-11th', isPaid: false },
    { id: '5', name: 'Elevate Education', amount: 50.00, dueDate: 'Monthly-15th', isPaid: false },
    { id: '6', name: 'Archive Antiques', amount: 10.00, dueDate: 'Monthly-26th', isPaid: false },
    { id: '7', name: 'Swift Savings', amount: 500.00, dueDate: 'Monthly-26th', isPaid: false },
  ];
};

export const getPots = async (): Promise<Pot[]> => {
  await delay();
  return [
    { id: '1', name: 'Savings', target: 2000.00, total: 159.00, color: '#277C78' },
    { id: '2', name: 'Concert Tickets', target: 150.00, total: 110.00, color: '#626070' },
    { id: '3', name: 'Gift', target: 150.00, total: 40.00, color: '#82C9D7' },
    { id: '4', name: 'New Laptop', target: 1000.00, total: 10.00, color: '#F2CDAC' },
  ];
};

export const getTransactions = async (
  query: string = '', 
  page: number = 1,
  category: string = 'All Categories',
  sort: string = 'Latest'
): Promise<Transaction[]> => {
  await delay();
  const allTransactions: Transaction[] = [
    { id: '1', name: 'Emma Richardson', category: 'General', date: '2024-08-19', amount: 75.50, avatar: '/avatars/emma-richardson.jpg' },
    { id: '2', name: 'Savory Bites Bistro', category: 'Dining Out', date: '2024-08-19', amount: -55.50, avatar: '/avatars/savory-bites-bistro.jpg' },
    { id: '3', name: 'Daniel Carter', category: 'General', date: '2024-08-18', amount: -40.00, avatar: '/avatars/daniel-carter.jpg' },
    { id: '4', name: 'Sunnyside Aubergine', category: 'Dining Out', date: '2024-08-17', amount: 15.00, avatar: '/avatars/sunnyside-aubergine.jpg' },
    { id: '5', name: 'Urban Services', category: 'General', date: '2024-08-17', amount: -25.00, avatar: '/avatars/urban-services.jpg' },
    { id: '6', name: 'Liam Hughes', category: 'Groceries', date: '2024-08-15', amount: 200.00, avatar: '/avatars/liam-hughes.jpg' },
    { id: '7', name: 'Lily Thompson', category: 'General', date: '2024-08-15', amount: -15.00, avatar: '/avatars/lily-thompson.jpg' },
    { id: '8', name: 'James Dixon', category: 'Entertainment', date: '2024-08-14', amount: -120.00, avatar: '/avatars/james-dixon.jpg' },
    { id: '9', name: 'Sebastian Cook', category: 'Transportation', date: '2024-08-14', amount: -35.00, avatar: '/avatars/sebastian-cook.jpg' },
    { id: '10', name: 'Olivia Miller', category: 'Personal Care', date: '2024-08-13', amount: 50.00, avatar: '/avatars/olivia-miller.jpg' },
  ];

  let filtered = [...allTransactions];
  
  // Filter by search query
  if (query) {
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(query.toLowerCase()) || 
      t.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Filter by category
  if (category !== 'All Categories') {
    filtered = filtered.filter(t => t.category === category);
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sort) {
      case 'Oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'Highest':
        return b.amount - a.amount;
      case 'Lowest':
        return a.amount - b.amount;
      case 'Latest':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  return filtered.slice(start, start + pageSize);
};

// Compatibility export for origin/main calls
export const getBills = getRecurringBills;
export const getOverviewData = async () => {
  const [balance, transactions, budgets, pots] = await Promise.all([
    getBalance(),
    getTransactions(),
    getBudgets(),
    getPots()
  ]);
  return { balance, transactions, budgets, pots };
};
