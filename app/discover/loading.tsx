import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar skeleton */}
      <div className="mb-8">
        <Skeleton className="h-12 w-full max-w-2xl mx-auto" />
      </div>

      {/* Categories skeleton */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>

      {/* Recipe grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
