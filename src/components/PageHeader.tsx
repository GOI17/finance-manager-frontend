import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function PageHeader({ title, className, as: Tag = 'h1' }: PageHeaderProps) {
  return (
    <header className={cn("mb-8", className)}>
      <Tag className="text-3xl font-bold text-grey-900 tracking-tight">{title}</Tag>
    </header>
  );
}
