import Footer from '../Footer/Footer'
import './PostFooter.css'

export default function PostFooter() {
  return (
    <>
      <Footer />
      <div className="post-footer__blend" aria-hidden="true" />
      <section
        className="post-footer"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <div className="post-footer__fixed">
          <div className="post-footer__drawer">
            <img src="/footer.png" alt="" className="post-footer__img" />
          </div>
        </div>
      </section>
    </>
  )
}