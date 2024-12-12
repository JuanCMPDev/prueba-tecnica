'use client'

import Slider from "react-slick"
import { MovieCard } from './movie-card'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from './movie-category.module.css'

interface Movie {
  title: string
  image: string
  date: string
  rating: number
}

interface MovieCategoryProps {
  title: string
  movies: Movie[]
}

export function MovieCategory({ title, movies }: MovieCategoryProps) {
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
          {movies.map((movie, index) => (
            <div key={index} className={styles.slideItem}>
              <MovieCard {...movie} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

