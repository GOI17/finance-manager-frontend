export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  avatar: string;
  isNew?: boolean;
  isPending?: boolean;
}

export interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface Bill {
  name: string;
  dueDate: string;
  amount: number;
  isPaid: boolean;
}

export interface OverviewData {
  balance: {
    current: number;
    income: number;
    expenses: number;
  };
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
}
