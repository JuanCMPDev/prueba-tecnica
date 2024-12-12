import Image from "next/image"

interface SimpleMovieCardProps {
  image: string
  title: string
}

export function SimpleMovieCard({ image, title }: SimpleMovieCardProps) {
  return (
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
  )
}

