import { useCallback } from 'react'
import useReveal from '../../hooks/useReveal'
import './Closing.css'

export default function Closing() {
  const ref = useReveal()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const input = e.target.querySelector('input')
    const button = e.target.querySelector('button')
    input.value = ''
    button.textContent = 'Thank you'
  }, [])

  return (
    <section className="section closing" id="letters" ref={ref}>
      <div className="closing__bloom" />
      <div className="closing__inner">
        <p className="closing__quote reveal">The game is too difficult to be taken seriously, and too serious to be taken as a game.</p>
        <p className="closing__attr reveal">— A remark, overheard</p>

        <form className="signup reveal" onSubmit={handleSubmit}>
          <input type="email" placeholder="your email, in a quiet moment" required aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  )
}
