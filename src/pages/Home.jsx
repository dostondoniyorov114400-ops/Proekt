import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, PLATFORMS, SORTS, getGames } from '../api.js'
import GameCard from '../components/GameCard.jsx'

const PAGE_SIZE = 24

export default function Home() {
  const [params, setParams] = useSearchParams()
  const platform = params.get('platform') || 'all'
  const category = params.get('category') || 'all'
  const sort = params.get('sort') || 'popularity'

  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    next.set(key, value)
    setParams(next, { replace: true })
  }

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    setVisible(PAGE_SIZE)
    getGames({ platform, category, sort }, controller.signal)
      .then((data) => setGames(Array.isArray(data) ? data : []))
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [platform, category, sort])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return games
    return games.filter((g) => g.title.toLowerCase().includes(q))
  }, [games, query])

  const select = 'rounded-md border border-edge bg-panel px-3 py-2 text-sm text-white'

  return (
    <>
      <section className="mb-8 max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Keyingi o'yiningizni toping
        </h1>
        <p className="mt-3 text-mist">
          Kompyuter va brauzer uchun yuzlab bepul o'yinlar. Janr, platforma bo'yicha saralang yoki nomi bilan qidiring.
        </p>
      </section>

      <div className="sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap items-center gap-3 border-b border-edge bg-night/95 px-4 py-3 backdrop-blur">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="O'yin nomini qidiring"
          aria-label="O'yin nomini qidiring"
          className={`${select} min-w-[200px] flex-1 placeholder:text-mist`}
        />

        <div className="flex overflow-hidden rounded-md border border-edge" role="group" aria-label="Platforma">
          {PLATFORMS.map((p) => (
            <button
              key={p.value}
              onClick={() => setParam('platform', p.value)}
              aria-pressed={platform === p.value}
              className={`px-3 py-2 text-sm ${
                platform === p.value ? 'bg-token font-bold text-night' : 'bg-panel text-mist hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <select value={category} onChange={(e) => setParam('category', e.target.value)} aria-label="Janr" className={select}>
          <option value="all">Barcha janrlar</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setParam('sort', e.target.value)} aria-label="Saralash" className={select}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm">
          <p className="font-bold">O'yinlarni yuklab bo'lmadi</p>
          <p className="mt-1 text-mist">{error}. Internetni tekshirib, sahifani qayta yuklang.</p>
        </div>
      )}

      {loading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-panel" />
          ))}
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="mb-4 text-sm text-mist">{filtered.length} ta o'yin topildi</p>
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-mist">
              Hech narsa topilmadi. Qidiruvni qisqartiring yoki filtrlarni o'zgartiring.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, visible).map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          )}
          {visible < filtered.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-md bg-token px-6 py-2.5 font-bold text-night hover:brightness-110"
              >
                Ko'proq ko'rsatish
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
