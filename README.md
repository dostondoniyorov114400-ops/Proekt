# Game Explorer

React + Tailwind + FreeToGame API.

## Ishga tushirish
```bash
npm install
npm run dev
```
Brauzerda http://localhost:5173 oching.

## Sahifalar
- `/` — o'yinlar ro'yxati: qidiruv, platforma, janr, saralash (filtrlar URL'da saqlanadi)
- `/game/:id` — o'yin tafsilotlari: skrinshotlar, tavsif, talablar, "Bepul o'ynash"

## Muhim: CORS
FreeToGame API CORS ruxsat bermaydi. Dev rejimida `vite.config.js` proxy ishlatadi.
Deploy uchun: Vercel'da `vercel.json` tayyor (rewrites). Boshqa hostingda xuddi shunday proxy qoidasi qo'shing
yoki `.env` faylida `VITE_API_BASE=https://sizning-proksi-manzilingiz/api` deb belgilang.
