import useReveal from '../../hooks/useReveal'
import './TwoCol.css'

export default function TwoCol() {
  const ref = useReveal()

  return (
    <section className="section two-col" id="stories" ref={ref}>
      <div className="container">
        <div className="two-col__head">
          <div className="eyebrow reveal" style={{ display: 'inline-flex' }}>Two sides of the same game</div>
          <h2 className="display reveal" style={{ marginTop: 24 }}>Built for coaches, <em>beloved by students.</em></h2>
          <p className="reveal">Streamlining the technical workflow for pros while accelerating improvement for players.</p>
        </div>

        <div className="two-col__grid">
          <article className="pane pane--sage reveal">
            <div className="pane__eyebrow eyebrow">For Coaches</div>
            <h3 className="pane__title">Automated screening <em>& triage.</em></h3>
            <p className="pane__body">Eliminate manual video review time. Our AI handles the first pass so you can focus on high-value coaching.</p>
            <ul className="pane__list">
              <li>Auto-detection of swing faults (Sway, Early Extension)</li>
              <li>Instant skeletal & angular biomechanics data</li>
              <li>AI-drafted lesson notes & drill recommendations</li>
            </ul>
            <a className="pane__cta" href="#get">Analyze swing now</a>
          </article>

          <article className="pane pane--cream reveal">
            <div className="pane__eyebrow eyebrow">For Students</div>
            <h3 className="pane__title">A 24/7 <em>feedback loop.</em></h3>
            <p className="pane__body">Bridge the gap between lessons. Get instant feedback on your practice sessions based on your coach's plan.</p>
            <ul className="pane__list">
              <li>Real-time practice analysis & rep counting</li>
              <li>Visual trend tracking over weeks and months</li>
              <li>Gamified drills to reinforce technique</li>
            </ul>
            <a className="pane__cta" href="#get">Analyze swing now</a>
          </article>
        </div>
      </div>
    </section>
  )
}
