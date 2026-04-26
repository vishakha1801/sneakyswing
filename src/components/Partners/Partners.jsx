import { useEffect, useRef, useState } from 'react'
import './Partners.css'

const partners = [
  { name: 'Carnegie Mellon', src: '/partners/cmu_logo.png', size: 'sm' },
  { name: 'Olympus', src: '/partners/olympus_logo.png', size: 'lg' },
  { name: 'UIUC', src: '/partners/uiuc logo.png' },
  { name: 'Greenscape Golf', src: '/partners/67deb0b0-a0a9-4ad8-8628-9b7bb0a53dc4.png', size: 'lg' },
  { name: 'PGA', src: '/partners/pga_logo.png', size: 'lg' },
]

export default function Partners() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`section partners${visible ? ' is-visible' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="partners__head">
          <div className="eyebrow partners__eyebrow">Collaborations</div>
          <h2 className="display partners__display" style={{ marginTop: 24 }}>Built with <em>brilliant partners.</em></h2>
          <p className="partners__desc">We extend our deepest gratitude to the brilliant minds and dedicated partners who work their hardest to make SneakySwing a reality.</p>
        </div>

        <div className="partners__grid">
          {partners.map((p, i) => (
            <div className="partner" key={p.name} style={{ '--i': i }}>
              <img
                src={p.src}
                alt={p.name}
                className={`partner__logo${p.size === 'sm' ? ' partner__logo--sm' : ''}${p.size === 'lg' ? ' partner__logo--lg' : ''}`}
                draggable={false}
              />
              <span className="partner__name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
