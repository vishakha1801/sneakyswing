import useReveal from '../../hooks/useReveal'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import HalftoneBall from '../HalftoneBall/HalftoneBall'
import './Pitch.css'

export default function Pitch() {
  const ref = useReveal()
  useSmoothScroll()

  return (
    <section className="section pitch" id="method" ref={ref}>
      <div className="container pitch__row">
        <div className="pitch__visual reveal">
          <HalftoneBall />
        </div>
        <div className="pitch__content">
          <div className="pitch__eyebrow eyebrow reveal">Powered by AI</div>
          <h1 className="display pitch__heading reveal">Your AI golf <em>copilot.</em></h1>
          <p className="pitch__body reveal">
            SneakySwing helps golfers improve their swings through AI feedback and personalized drills — with real coaches in the loop when you need them.
          </p>
          <div className="pitch__ctas reveal">
            <a className="btn btn--primary" href="#get">Analyze swing now</a>
            <a className="btn btn--ghost" href="#demo">Watch demo</a>
          </div>
          <p className="stars reveal"><span>★★★★★</span> 5.0 rated on the App Store</p>
        </div>
      </div>
    </section>
  )
}
