"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, NewsItem } from "@/lib/types";

const categories: Array<{ value: "tutte" | Category; label: string }> = [
  { value: "tutte", label: "Tutte" },
  { value: "politica", label: "Politica" },
  { value: "cronaca", label: "Cronaca" },
  { value: "sport", label: "Sport" },
  { value: "economia", label: "Economia" },
  { value: "locale", label: "Locale" }
];

const cities = ["Rimini", "Milano", "Roma", "Bologna", "Torino", "Italia"];

export default function NewsClient() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Italia");
  const [category, setCategory] = useState<"tutte" | Category>("tutte");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const response = await fetch("/api/news", { cache: "no-store" });
        const data = await response.json();
        setItems(data.items || []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return items.filter((item) => {
      const categoryOk = category === "tutte" || item.category === category;
      const cityOk = city === "Italia" || item.category !== "locale" || item.city === city;
      const haystack = `${item.title} ${item.summary} ${item.city} ${item.tags.join(" ")}`.toLowerCase();
      const searchOk = haystack.includes(q);
      return categoryOk && cityOk && searchOk;
    });
  }, [items, search, city, category]);

  return (
    <>
      <section className="toolbar">
        <div className="box">
          <span>🔎</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca notizie, città o tag..."
          />
        </div>

        <div className="box">
          <span>📍</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </div>

        <div className="box">
          <span>🧭</span>
          <select value={category} onChange={(e) => setCategory(e.target.value as "tutte" | Category)}>
            {categories.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="row">
        {categories.map((entry) => (
          <button
            key={entry.value}
            className={`chip ${category === entry.value ? "active" : ""}`}
            onClick={() => setCategory(entry.value)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="meta">
        <span>
          {loading ? "Caricamento notizie..." : `${filtered.length} notizie visibili`}
        </span>
        <span>Città selezionata: {city}</span>
      </div>

      <section className="grid">
        {!loading && filtered.map((item) => (
          <article key={item.id} className="card">
            <div className="media">
              <img src={item.image} alt={item.title} />
              <span className="badge">{item.category}</span>
            </div>

            <div className="body">
              <div className="smallrow">
                <span>{item.city}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>

              <h3 className="title">{item.title}</h3>
              <p className="summary">{item.summary}</p>

              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bottom">
                <small className="source">Fonte: {item.sourceName}</small>
                <a className="link" href={item.sourceUrl} target="_blank" rel="noreferrer">
                  Apri fonte
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
