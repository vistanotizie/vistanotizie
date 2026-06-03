import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, rgb(10, 15, 30), rgb(27, 42, 70) 50%, rgb(59, 130, 246))',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
            }}
          >
            VistaNotizie
          </div>

          <div
            style={{
              fontSize: 28,
              opacity: 0.8,
            }}
          >
            Le ultime notizie dall'Italia e dal mondo
          </div>
        </div>
      </div>
    ),
    size,
  );
}
