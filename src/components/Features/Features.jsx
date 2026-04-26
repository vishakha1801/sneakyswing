import { useState, useEffect, useRef } from 'react'
import { DotOrbit } from '@paper-design/shaders-react'
import './Features.css'

const features = [
  {
    num: '01',
    title: 'AI Swing',
    titleEm: 'Analysis.',
    body: 'Get a full radar breakdown of your swing — from composure and rhythm to turf interaction. Our AI scores every dimension so you know exactly where you stand.',
    image: '/screenshots/IMG_2733.PNG',
  },
  {
    num: '02',
    title: 'Phase',
    titleEm: 'Annotation.',
    body: 'Every frame of your swing broken into phases — Address through Follow-through. See exactly what your body is doing at each critical position.',
    image: '/screenshots/IMG_2734.PNG',
  },
  {
    num: '03',
    title: 'Cause &',
    titleEm: 'Fix.',
    body: 'Skeletal overlay pinpoints the root cause of your faults with specific corrections. No guesswork — just clear biomechanical insight.',
    image: '/screenshots/IMG_2735.PNG',
  },
  {
    num: '04',
    title: 'Actionable',
    titleEm: 'Drills.',
    body: 'Personalized practice plans built from your diagnosis. Each drill targets your specific faults and adapts session by session.',
    image: '/screenshots/IMG_2736.PNG',
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewH = window.innerHeight

      const scrolled = -rect.top / (sectionHeight - viewH)
      const clamped = Math.max(0, Math.min(1, scrolled))

      const idx = Math.min(
        features.length - 1,
        Math.floor(clamped * features.length)
      )
      setActive(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="features" id="features" ref={sectionRef}>
      <div className="features__sticky">
        <div className="features__container">
          {/* Shader background */}
          <div className="features__shader">
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

          <div className="features__layout">
            {/* Text left */}
            <div className="features__text">
              <div className="features__head">
                <div className="eyebrow features__eyebrow">How it works</div>
                <h2 className="display features__display">
                  From swing to <em>improvement.</em>
                </h2>
              </div>

              <div className="features__cards">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className={`fcard${i === active ? ' active' : ''}`}
                  >
                    <div className="fcard__num">No. {f.num}</div>
                    <h3 className="fcard__title">
                      {f.title} <em>{f.titleEm}</em>
                    </h3>
                    <p className="fcard__body">{f.body}</p>
                  </div>
                ))}

                <div className="features__dots">
                  {features.map((_, i) => (
                    <div
                      key={i}
                      className={`features__dot${i === active ? ' active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Phone right */}
            <div className="features__visual">
              <div className="phone">
                <div className="phone__notch" />
                <div className="phone__screen">
                  {features.map((f, i) => (
                    <img
                      key={i}
                      src={f.image}
                      alt={`${f.title} ${f.titleEm}`}
                      className={`phone__img${i === active ? ' active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
