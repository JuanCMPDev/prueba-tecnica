'use client'

import Slider from "react-slick"
import { MovieCard } from './movie-card'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from './movie-category.module.css'

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

interface MovieCategoryProps {
  title: string
  movies: Movie[]
}

export function MovieCategory({ title, movies }: MovieCategoryProps) {
  if (!movies || movies.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  }

  return (
    <div className={styles.category}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className={styles.slideItem}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                date={movie.release_date}
                rating={Math.round(movie.vote_average * 10)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

