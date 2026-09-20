import { ImageResponse } from 'next/og';

export const alt = 'Tahsin Ahmed Refat, full-stack developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Load Geist from Google Fonts for the card; fall back to the built-in face if the fetch fails */
async function loadGeist(weight: 500 | 600): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&display=swap`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [g600, g500] = await Promise.all([loadGeist(600), loadGeist(500)]);
  const fonts = [
    g600 && { name: 'Geist', data: g600, weight: 600 as const, style: 'normal' as const },
    g500 && { name: 'Geist', data: g500, weight: 500 as const, style: 'normal' as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600; style: 'normal' }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#f8f8fa',
          color: '#2b2c33',
          fontFamily: 'Geist, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
            <rect x="15" y="15" width="50" height="12" rx="6" fill="#2b2c33" />
            <rect x="35" y="15" width="10" height="50" rx="5" fill="#2b2c33" />
            <circle cx="40" cy="70" r="4" fill="#2b2c33" opacity="0.6" />
          </svg>
          <span style={{ fontSize: 26, fontWeight: 500, color: '#6b6d78' }}>tahsinahmedrefat.com</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Tahsin Ahmed Refat
          </div>
          <div style={{ fontSize: 34, fontWeight: 500, color: '#6b6d78', lineHeight: 1.3 }}>
            Full-stack developer. Web products, GoHighLevel apps, and ERP systems.
          </div>
        </div>

        <div style={{ display: 'flex', width: 120, height: 6, borderRadius: 999, background: '#3d8a86' }} />
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
