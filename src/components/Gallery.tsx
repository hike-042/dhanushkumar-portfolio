'use client'

import SectionLabel from './ui/section-label'
import WordReveal from './ui/word-reveal'

const photos = [
  '/gallery/photo1.jpg',
  '/gallery/photo2.jpg',
  '/gallery/photo3.jpg',
  '/gallery/photo4.jpg',
  '/gallery/photo5.jpg',
  '/gallery/photo6.jpg',
  '/gallery/photo7.jpeg',
]

const items = [...photos, ...photos]

export default function Gallery() {
  return (
    <section id="gallery" className="site-section">
      <SectionLabel>Gallery</SectionLabel>

      <h2
        className="font-fraunces"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400,
          lineHeight: 1.1, letterSpacing: '-.02em',
          color: 'var(--text)', marginBottom: 48,
        }}
      >
        <WordReveal text={"Moments that\nmattered."} delay={0.07} />
      </h2>

      <div className="gallery-slider">
        <div className="list">
          {items.map((src, i) => (
            <div key={i} className="item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Gallery photo ${(i % photos.length) + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
