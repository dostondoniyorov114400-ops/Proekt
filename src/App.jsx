import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GameDetail from './pages/GameDetail.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-edge">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
            Game<span className="text-token">Explorer</span>
          </Link>
          <a
            href="https://www.freetogame.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-mist hover:text-white"
          >
            Ma'lumot: FreeToGame
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route
            path="*"
            element={
              <p className="py-20 text-center text-mist">
                Sahifa topilmadi. <Link to="/" className="text-token underline">Bosh sahifaga qaytish</Link>
              </p>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
