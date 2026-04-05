import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { localSummary } from '@/lib/utils';

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string; content?: string };
  const title = body.title?.trim() || 'Articolo';
  const content = body.content?.trim() || '';

  if (!content) {
    return NextResponse.json({ summary: 'Contenuto insufficiente per il riassunto.' }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ summary: localSummary(`${title}. ${content}`), provider: 'local' });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.4',
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: 'Sei un assistente editoriale. Riassumi in italiano con tono chiaro, neutro, accurato, in massimo 5 frasi.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `Titolo: ${title}\n\nContenuto:\n${content}`,
            },
          ],
        },
      ],
    });

    const summary = response.output_text?.trim() || localSummary(`${title}. ${content}`);
    return NextResponse.json({ summary, provider: 'openai' });
  } catch {
    return NextResponse.json({ summary: localSummary(`${title}. ${content}`), provider: 'local-fallback' });
  }
}
