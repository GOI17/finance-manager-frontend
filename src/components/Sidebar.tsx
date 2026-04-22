"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/data/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <h1 className="text-2xl font-bold italic">finance</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-white text-slate-900 font-bold' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <span className="capitalize">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
