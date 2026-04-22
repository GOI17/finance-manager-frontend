export function PageHeader({ title }: { title: string }) {
  return (
    <header className="mb-8">
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
    </header>
  );
}
