import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-beige-100 lg:flex-row">
      <Sidebar />
      <main className={cn(
        "flex-1 p-4 pb-24 md:p-8 lg:p-10 lg:pb-10 lg:overflow-y-auto",
        "bg-beige-100 text-grey-900 max-w-full"
      )}>
        <div className="mx-auto max-w-[1440px]">
          {children}
        </div>
      </main>
    </div>
  );
}
