import { Suspense } from 'react'
import { HomeContent } from '@/components/home-content'
import { Loader } from "@/components/loader"

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <HomeContent />
    </Suspense>
  )
}

