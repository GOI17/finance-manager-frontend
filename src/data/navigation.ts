export const NAV_ITEMS = [
  { name: 'Overview', href: '/overview', icon: 'overview' },
  { name: 'Transactions', href: '/transactions', icon: 'transactions' },
  { name: 'Budgets', href: '/budgets', icon: 'budgets' },
  { name: 'Pots', href: '/pots', icon: 'pots' },
  { name: 'Recurring Bills', href: '/recurring-bills', icon: 'recurring-bills' },
] as const;

export type NavItem = typeof NAV_ITEMS[number];
