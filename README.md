# VistaNotizie

Template completo per un sito news moderno in **Next.js App Router**, pronto per **Vercel**.

## Funzioni incluse

- news reali da **feed RSS**
- pagina dettaglio articolo
- **riassunto AI** tramite OpenAI Responses API
- fallback locale se la chiave API non è configurata
- **immagini dinamiche** con `next/og`
- dark / light mode con persistenza in `localStorage`
- struttura già pronta per deploy

## Avvio locale

```bash
npm install
npm run dev
```

Apri `http://localhost:3000`

## Variabili ambiente

Copia `.env.example` in `.env.local` e imposta:

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5.4
RSS_MAX_ITEMS=40
```

Se `OPENAI_API_KEY` non è presente, il sito resta funzionante e usa un riassunto locale.

## Deploy su Vercel

1. Crea un nuovo progetto su Vercel.
2. Carica il repository o questa cartella.
3. Imposta le variabili ambiente in Project Settings.
4. Esegui il deploy.

## Feed RSS configurati

Puoi modificarli in `lib/feeds.ts`.

## Note pratiche

- Le immagini vengono prese dal feed quando disponibili.
- Se una notizia non contiene immagine, viene generata automaticamente tramite `/api/og`.
- La pagina dettaglio rilegge l'articolo dai feed correnti. Se una notizia esce dal feed, la pagina può non essere più disponibile.
