import './Footer.css'

export default function Footer() {
  return (
    <>
      <footer className="footer" id="get">
        <div className="footer__row">
          <nav className="footer__links" aria-label="Footer">
            <a href="#top">Home</a>
            <a href="#method">About</a>
            <a href="#letters">Writing</a>
            <a href="#stories">Careers</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#about">Company</a>
          </nav>

          <div className="footer__right">
            <a className="footer__inbox" href="#get">
              Get updates in your inbox
              <span className="footer__inbox-arrow">›</span>
            </a>
          </div>
        </div>
      </footer>
      <div className="footer__blend" />
     </>
  )
}