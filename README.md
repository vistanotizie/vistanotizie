# VistaNotizie - progetto Next.js

Base pubblicabile della web app news.

## Avvio locale
1. Installa Node.js 20.9 o superiore
2. Apri il terminale nella cartella del progetto
3. Esegui:

```bash
npm install
npm run dev
```

4. Apri http://localhost:3000

## Struttura
- app/page.tsx
- app/api/news/route.ts
- components/NewsClient.tsx
- lib/mock-news.ts
- lib/types.ts

## Cosa c'è già
- layout responsive
- filtri categoria/città
- dati demo
- route API demo
- link fonte

## Passi successivi
- collegare provider news reale
- aggiungere database
- aggiungere AI lato server
- pubblicare su Vercel
