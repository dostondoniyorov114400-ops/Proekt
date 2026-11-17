// FreeToGame API: https://www.freetogame.com/api-doc
const BASE = import.meta.env.VITE_API_BASE || '/api'

async function request(path, params = {}, signal) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v && v !== 'all')
  ).toString()
  const res = await fetch(`${BASE}${path}${qs ? `?${qs}` : ''}`, { signal })
  if (!res.ok) throw new Error(`Server xatosi: ${res.status}`)
  const data = await res.json()
  if (data && data.status === 0) throw new Error(data.status_message || "Ma'lumot topilmadi")
  return data
}

export const getGames = ({ platform, category, sort }, signal) =>
  request('/games', { platform, category, 'sort-by': sort }, signal)

export const getGame = (id, signal) => request('/game', { id }, signal)

export const PLATFORMS = [
  { value: 'all', label: 'Hammasi' },
  { value: 'pc', label: 'Kompyuter' },
  { value: 'browser', label: 'Brauzer' },
]

export const SORTS = [
  { value: 'popularity', label: 'Ommabop' },
  { value: 'release-date', label: 'Yangi chiqqan' },
  { value: 'alphabetical', label: 'A dan Z gacha' },
  { value: 'relevance', label: 'Mosligi' },
]

export const CATEGORIES = [
  'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social',
  'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel',
  'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down',
  'tower-defense', 'horror', 'mmofps', 'mmotps', 'anime', 'fantasy',
  'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts',
  'flight', 'low-spec', 'card', 'battle-royale', 'mmorts', 'mmo', 'permadeath',
]
