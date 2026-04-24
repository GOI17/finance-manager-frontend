import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-beige-100 lg:flex-row">
      <Sidebar />
      <main className={cn(
        "flex-1 p-4 md:p-8 lg:p-10 lg:pb-10 lg:overflow-y-auto",
        "bg-beige-100 text-grey-900 max-w-full",
        "pb-[calc(4rem+env(safe-area-inset-bottom)+1rem)] lg:pb-10"
      )}>
        <div className="mx-auto max-w-[1440px]">
          {children}
        </div>
      </main>
    </div>
  );
}
