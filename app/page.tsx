import { Hero } from "@/components/hero"
import { MovieSection } from "@/components/movie-section"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#454545]">
      <Hero
        title="Kung Fu Panda 4"
        description="Join Po and the Furious Five on a new epic adventure! Discover the power of friendship and the strength within! Get ready to unleash your inner warrior! 🥋✨"
        image="/assets/hero/banner.png"
        rating={97}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MovieSection />
      </div>
    </div>
  )
}

