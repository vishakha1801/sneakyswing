import { useState, useEffect } from 'react'
import './Nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav__brand">
        <a className="nav__logo" href="#top" aria-label="SneakySwing home">
          <img src="/sneakyswing.png" alt="" width="29" height="29" decoding="async" />
        </a>
      </div>
      <nav className="nav__links" aria-label="Primary">
        <a href="#method">About</a>
        <a href="#letters">Writing</a>
        <a href="#stories">Careers</a>
      </nav>
      <a className="nav__cta" href="#get">Get early access</a>
    </header>
  )
}
