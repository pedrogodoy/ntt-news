export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="h-48 w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex gap-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-20 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
