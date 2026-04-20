import { ImageResponse } from 'next/og'

export const alt = 'Compatips - Ofertas Escondidas en Amazon México'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: '#FF9900',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              fontWeight: 900,
              color: '#111',
            }}
          >
            C
          </div>
          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: '-0.02em' }}>
            Compatips
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Ofertas Escondidas en Amazon México
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#FF9900',
            fontWeight: 600,
          }}
        >
          Descuentos actualizados diariamente
        </div>
      </div>
    ),
    size,
  )
}
