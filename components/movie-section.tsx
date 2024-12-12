import { MovieCategory } from "@/components/movie-category"
import styles from './movie-section.module.css'

const sections = ["Popular", "Now Playing", "Upcoming", "Top Rated", "Favorites"]

const movies = [
  { title: "Shrek 3", image: "/assets/movies/shrek-3.png", date: "July 21, 2024", rating: 95 },
  { title: "The Matrix Resurrections", image: "/placeholder.svg?height=330&width=220", date: "August 15, 2024", rating: 88 },
  { title: "Avengers: Secret Wars", image: "/placeholder.svg?height=330&width=220", date: "September 3, 2024", rating: 92 },
  { title: "Jurassic World: Dominion", image: "/placeholder.svg?height=330&width=220", date: "October 12, 2024", rating: 85 },
  { title: "Avatar 3", image: "/placeholder.svg?height=330&width=220", date: "November 28, 2024", rating: 97 },
  { title: "Spider-Man: No Way Home", image: "/placeholder.svg?height=330&width=220", date: "December 17, 2024", rating: 93 },
  { title: "Black Panther: Wakanda Forever", image: "/placeholder.svg?height=330&width=220", date: "January 8, 2025", rating: 96 },
  { title: "Doctor Strange in the Multiverse of Madness", image: "/placeholder.svg?height=330&width=220", date: "February 22, 2025", rating: 89 },
  { title: "Guardians of the Galaxy Vol. 3", image: "/placeholder.svg?height=330&width=220", date: "March 5, 2025", rating: 91 },
  { title: "The Flash", image: "/placeholder.svg?height=330&width=220", date: "April 18, 2025", rating: 87 },
]

export function MovieSection() {
  return (
    <div className={styles.movieSection}>
      <div className={styles.movieSectionContent}>
        {sections.map((section) => (
          <MovieCategory key={section} title={section} movies={movies} />
        ))}
      </div>
    </div>
  )
}

