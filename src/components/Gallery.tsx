'use client'

import { useCallback } from 'react'
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
  '/gallery/photo8.jpg',
]

const items = [...photos, ...photos]

// Must match `.gallery-slider .list .item` in globals.css.
const ITEM_WIDTH = 260
const ITEM_HEIGHT = 320

/** Tells the CSS how wide the whole photo is at card height, so hover can reveal all of it. */
function measure(img: HTMLImageElement) {
  const item = img.parentElement
  if (!item || !img.naturalWidth || !img.naturalHeight) return
  const fullWidth = Math.round((img.naturalWidth / img.naturalHeight) * ITEM_HEIGHT)
  item.style.setProperty('--full', `${fullWidth}px`)
  item.classList.toggle('is-tall', fullWidth < ITEM_WIDTH)
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  // Cached images can finish loading before React attaches onLoad, so check `complete` too.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) measure(img)
  }, [])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={src} alt={alt} onLoad={e => measure(e.currentTarget)} />
  )
}

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
              <GalleryImage src={src} alt={`Gallery photo ${(i % photos.length) + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
