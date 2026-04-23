import { cn } from '@/lib/utils';

export function PageHeader({ title, className }: { title: string, className?: string }) {
  return (
    <header className={cn("mb-8", className)}>
      <h2 className="text-3xl font-bold text-grey-900 tracking-tight">{title}</h2>
    </header>
  );
}
