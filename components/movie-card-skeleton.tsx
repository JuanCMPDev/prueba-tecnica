export function MovieCardSkeleton() {
  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="w-full aspect-[2/3] bg-gray-700 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3" />
      </div>
    </div>
  )
}

