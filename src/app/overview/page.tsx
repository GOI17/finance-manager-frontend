import { PageHeader } from "@/components/PageHeader";

export default function OverviewPage() {
  return (
    <div>
      <PageHeader title="Overview" />
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-slate-600 italic">Financial overview content placeholder...</p>
      </div>
    </div>
  );
}
