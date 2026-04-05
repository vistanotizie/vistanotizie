import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') || 'VistaNotizie').slice(0, 120);
  const category = searchParams.get('category') || 'news';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, rgb(10, 15, 30), rgb(27, 42, 70) 50%, rgb(59, 130, 246))',
          color: 'white',
          padding: '56px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '999px',
              padding: '12px 20px',
              fontSize: 28,
            }}
          >
            VistaNotizie
          </div>
          <div style={{ fontSize: 28, opacity: 0.85 }}>{category.toUpperCase()}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 30, opacity: 0.8 }}>News RSS • Riassunto AI • Next.js</div>
        </div>
      </div>
    ),
    size,
  );
}
