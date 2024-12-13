import Image from "next/image"
import { useRouter } from 'next/navigation'

interface SimpleMovieCardProps {
  id: number
  image: string
  title: string
}

export function SimpleMovieCard({ id, image, title }: SimpleMovieCardProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/movies/${id}`)
    window.scrollTo(0, 0)
  }

  return (
    <a href={`/movies/${id}`} onClick={handleClick} className="block">
      <div className="group relative overflow-hidden bg-[#1E1E1E] w-full aspect-[2/3] flex flex-col rounded-md">
        <div className="relative -mr-2 h-[100%]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-2 bg-[#1E1E1E] h-[20%] flex items-center">
          <h3 className="text-sm font-bold text-white text-left line-clamp-2">{title}</h3>
        </div>
      </div>
    </a>
  )
}

