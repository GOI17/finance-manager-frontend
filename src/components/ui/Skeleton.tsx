import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
      aria-hidden="true"
    />
  );
};

export const BalanceSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-32 w-full" />
    ))}
  </div>
);

export const WidgetSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm h-full">
    <div className="flex justify-between items-center mb-6">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  </div>
);
