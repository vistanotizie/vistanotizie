'use client';

import { useState } from 'react';

interface SummaryPanelProps {
  title: string;
  content: string;
}

export function SummaryPanel({ title, content }: SummaryPanelProps) {
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleGenerateSummary() {
    try {
      setStatus('loading');
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Errore nella generazione del riassunto');
      }

      const data = (await response.json()) as { summary: string };
      setSummary(data.summary);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="summary-box">
      <div className="summary-header">
        <div>
          <h3>Riassunto AI</h3>
          <p>Genera un riepilogo rapido dell’articolo con fallback locale se la chiave API non è impostata.</p>
        </div>
        <button className="button primary" onClick={handleGenerateSummary} disabled={status === 'loading'}>
          {status === 'loading' ? 'Generazione...' : 'Genera riassunto'}
        </button>
      </div>
      {status === 'error' ? <p>Non è stato possibile generare il riassunto.</p> : null}
      {summary ? <div className="summary-content">{summary}</div> : null}
    </section>
  );
}
