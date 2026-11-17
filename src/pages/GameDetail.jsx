import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGame } from '../api.js'

function Fact({ label, value }) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs text-mist">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  )
}

export default function GameDetail() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [error, setError] = useState('')
  const [shot, setShot] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setGame(null)
    setError('')
    setShot(null)
    window.scrollTo(0, 0)
    getGame(id, controller.signal)
      .then(setGame)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message)
      })
    return () => controller.abort()
  }, [id])

  const back = (
    <Link to="/" className="mb-6 inline-block text-sm text-mist hover:text-white">
      ← Barcha o'yinlar
    </Link>
  )

  if (error)
    return (
      <>
        {back}
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm">
          <p className="font-bold">O'yin ma'lumotini yuklab bo'lmadi</p>
          <p className="mt-1 text-mist">{error}</p>
        </div>
      </>
    )

  if (!game)
    return (
      <>
        {back}
        <div className="h-96 animate-pulse rounded-lg bg-panel" />
      </>
    )

  const req = game.minimum_system_requirements
  const shots = game.screenshots || []

  return (
    <>
      {back}

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <img
            src={shot || game.thumbnail}
            alt={game.title}
            className="aspect-video w-full rounded-lg border border-edge object-cover"
          />
          {shots.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {shots.slice(0, 4).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShot(s.image)}
                  className={`overflow-hidden rounded-md border ${shot === s.image ? 'border-token' : 'border-edge'}`}
                  aria-label="Skrinshotni katta ko'rish"
                >
                  <img src={s.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{game.title}</h1>
          <p className="mt-2 text-sm text-ice">{game.genre} · {game.platform}</p>
          <p className="mt-4 text-mist">{game.short_description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-edge bg-panel p-4">
            <Fact label="Ishlab chiquvchi" value={game.developer} />
            <Fact label="Nashriyotchi" value={game.publisher} />
            <Fact label="Chiqqan sana" value={game.release_date} />
            <Fact label="Holati" value={game.status} />
          </dl>

          <a
            href={game.game_url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block rounded-md bg-token px-6 py-3 text-center font-bold text-night hover:brightness-110"
          >
            Bepul o'ynash
          </a>
        </div>
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">O'yin haqida</h2>
        <p className="mt-3 whitespace-pre-line leading-relaxed text-mist">{game.description}</p>
      </section>

      {req && (req.os || req.processor || req.memory || req.graphics || req.storage) && (
        <section className="mt-10 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Minimal talablar</h2>
          <dl className="mt-3 grid grid-cols-2 gap-4 rounded-lg border border-edge bg-panel p-4 sm:grid-cols-3">
            <Fact label="Tizim" value={req.os} />
            <Fact label="Protsessor" value={req.processor} />
            <Fact label="Xotira" value={req.memory} />
            <Fact label="Grafika" value={req.graphics} />
            <Fact label="Joy" value={req.storage} />
          </dl>
        </section>
      )}
    </>
  )
}
