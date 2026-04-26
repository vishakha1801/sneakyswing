import { useEffect, useRef, useState } from 'react'
import { DotOrbit } from '@paper-design/shaders-react'
import './Testimonials.css'

const testimonials = [
  {
    title: 'Revolutionary',
    quote: '"I have been one of the early beta testers for this app and have been using it for a while. This is unlike all other AI golf apps that just give you a score or feedback, because I actually contact my coach on this platform. It is more than an app, this is the infrastructure for golf coaching of the future."',
    initials: 'zb',
    name: 'zbonmnobwo',
    source: 'App Store',
  },
  {
    title: 'Recommend this for golf lovers!',
    quote: '"The feedback is finally clear and not a wall of text, and it actually tells me what to do next, not just what I did wrong."',
    initials: 'JJ',
    name: 'JiayiJennie',
    source: 'App Store',
  },
  {
    title: 'Great coach app',
    quote: '"Really impressed by how clearly it breaks down the swing. Feels much more personalized than generic golf tips. Super helpful."',
    initials: 'Mo',
    name: 'Momo0335',
    source: 'App Store',
  },
]

export default function Testimonials() {
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
    <section className={`section testimonials${visible ? ' is-visible' : ''}`} ref={sectionRef}>
      <div className="testimonials__container">
        <div className="testimonials__shader">
          <DotOrbit
            style={{ width: '100%', height: '100%', display: 'block' }}
            colors={['#2d5a2e']}
            colorBack="#1a3a1c"
            stepsPerColor={2}
            size={0.25}
            sizeRange={0}
            spreading={0.3}
            speed={2}
            scale={0.55}
          />
        </div>
        <div className="testimonials__inner">
        <div className="testimonials__head">
          <div className="eyebrow testimonials__eyebrow">Real reviews from the App Store</div>
          <h2 className="display testimonials__display" style={{ marginTop: 24 }}>Loved by golfers <em>and coaches alike.</em></h2>
        </div>

        <div className="tcards">
          {testimonials.map((t, i) => (
            <article
              className="tcard"
              key={t.name}
              style={{ '--card-index': i }}
            >
              <div className="tcard__stars">★★★★★</div>
              <h3 className="tcard__title">{t.title}</h3>
              <p className="tcard__quote">{t.quote}</p>
              <div className="tcard__meta">
                <div className="tcard__avatar">{t.initials}</div>
                <div>
                  <div className="tcard__name">{t.name}</div>
                  <div className="tcard__source">{t.source}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
