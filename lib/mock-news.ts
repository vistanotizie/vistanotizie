import type { NewsItem } from "./types";

export const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Vertice sulle nuove misure economiche per famiglie e imprese",
    summary: "Il governo discute un nuovo pacchetto di misure. In produzione qui entrerà il riassunto generato dall'AI con link finale alla fonte reale.",
    category: "politica",
    city: "Roma",
    date: "2026-04-03 09:15",
    sourceName: "Fonte Demo Politica",
    sourceUrl: "https://example.com/politica",
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["governo", "misure", "famiglie"]
  },
  {
    id: 2,
    title: "Operazione contro i furti nei magazzini della zona industriale",
    summary: "La cronaca mostra come l'app possa aggregare e spiegare rapidamente notizie operative e territoriali senza copiare l'articolo integrale.",
    category: "cronaca",
    city: "Bologna",
    date: "2026-04-03 08:40",
    sourceName: "Fonte Demo Cronaca",
    sourceUrl: "https://example.com/cronaca",
    image: "https://images.pexels.com/photos/60626/security-protection-anti-virus-software-60626.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["cronaca", "sicurezza", "indagini"]
  },
  {
    id: 3,
    title: "Derby in arrivo: allenamento aperto e grande attesa in città",
    summary: "La sezione sport può combinare risultati, anticipi e notizie locali, mantenendo sempre una struttura leggibile su mobile e desktop.",
    category: "sport",
    city: "Rimini",
    date: "2026-04-03 10:20",
    sourceName: "Fonte Demo Sport",
    sourceUrl: "https://example.com/sport",
    image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["sport", "derby", "allenamento"]
  },
  {
    id: 4,
    title: "Mercati in movimento: inflazione, tassi e titoli energetici",
    summary: "La parte economia e finanza può essere sintetizzata dall'AI con tag mirati, mantenendo in piccolo il link alla testata di origine.",
    category: "economia",
    city: "Milano",
    date: "2026-04-03 11:05",
    sourceName: "Fonte Demo Economia",
    sourceUrl: "https://example.com/economia",
    image: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["borsa", "energia", "inflazione"]
  },
  {
    id: 5,
    title: "Viabilità e lavori pubblici: cambia la circolazione in centro",
    summary: "Le notizie locali vengono filtrate in base alla città scelta dal lettore, così l'homepage resta personale e più utile.",
    category: "locale",
    city: "Rimini",
    date: "2026-04-03 07:55",
    sourceName: "Fonte Demo Locale",
    sourceUrl: "https://example.com/locale-rimini",
    image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["traffico", "centro", "viabilità"]
  },
  {
    id: 6,
    title: "Nuovo progetto urbano per mobilità sostenibile e spazi verdi",
    summary: "Un'altra notizia locale, adatta a future sponsorizzazioni territoriali o notifiche per gli utenti che seguono una città specifica.",
    category: "locale",
    city: "Milano",
    date: "2026-04-03 09:50",
    sourceName: "Fonte Demo Milano",
    sourceUrl: "https://example.com/locale-milano",
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["mobilità", "verde", "città"]
  }
];
