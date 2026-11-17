import { Link } from 'react-router-dom'

export default function GameCard({ game }) {
  return (
    <Link
      to={`/game/${game.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-edge bg-panel transition hover:border-token"
    >
      <div className="aspect-video overflow-hidden bg-night">
        <img
          src={game.thumbnail}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight">{game.title}</h3>
          <span className="shrink-0 rounded bg-token px-2 py-0.5 text-xs font-bold text-night">
            Bepul
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-mist">{game.short_description}</p>
        <p className="mt-auto pt-2 text-xs text-ice">
          {game.genre} · {game.platform}
        </p>
      </div>
    </Link>
  )
}
