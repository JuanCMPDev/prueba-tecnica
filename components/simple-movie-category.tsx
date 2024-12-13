'use client'

import Slider from "react-slick"
import { SimpleMovieCard } from './simple-movie-card'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Movie {
  id: number
  title: string
  image: string
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
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="relative">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-1.5 pb-4">
              <SimpleMovieCard id={movie.id} image={movie.image} title={movie.title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

