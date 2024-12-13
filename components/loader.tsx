import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#262626] p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-[#F0B90B] animate-spin" />
        <p className="mt-4 text-white font-semibold">Loading...</p>
      </div>
    </div>
  )
}

