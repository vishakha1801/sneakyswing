import { useState, useEffect, useRef, useCallback } from 'react'
import './Hero.css'

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false)
  const [scrollFaded, setScrollFaded] = useState(false)
  const [closingVisible, setClosingVisible] = useState(false)
  const [blendVisible, setBlendVisible] = useState(false)

  const videoRef = useRef(null)
  const heroRef = useRef(null)
  const stateRef = useRef({
    videoDuration: 0,
    targetTime: 0,
    currentTime: 0,
    lastAppliedVideoTime: 0,
    lastVideoWriteAt: 0,
    lastProgress: -1,
    heroStart: 0,
    heroRange: 1,
    iosUnlocked: !(/iPad|iPhone|iPod/.test(navigator.userAgent)),
    reduced: false,
    ready: false,
  })

  const LERP = 0.5
  const DELTA_THRESHOLD = 0.003
  const VIDEO_WRITE_FPS = 60
  const VIDEO_WRITE_MIN_STEP = 1 / 120
  const HERO_PROGRESS_EPSILON = 0.0005
  const SLOW_SCROLL_PORTION = 0.4
  const SLOW_VIDEO_PORTION = 0.22

  const mapProgressToVideoPortion = useCallback((p) => {
    if (p <= SLOW_SCROLL_PORTION) {
      return (p / SLOW_SCROLL_PORTION) * SLOW_VIDEO_PORTION
    }
    const tailProgress = (p - SLOW_SCROLL_PORTION) / (1 - SLOW_SCROLL_PORTION)
    return SLOW_VIDEO_PORTION + tailProgress * (1 - SLOW_VIDEO_PORTION)
  }, [])

  const updateHeroBounds = useCallback(() => {
    const hero = heroRef.current
    if (!hero) return
    const s = stateRef.current
    s.heroStart = hero.offsetTop
    s.heroRange = Math.max(1, hero.offsetHeight - window.innerHeight)
  }, [])

  // iOS unlock
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const unlock = () => {
      if (stateRef.current.iosUnlocked) return
      video.play().then(() => {
        video.pause()
        stateRef.current.iosUnlocked = true
      }).catch(() => { stateRef.current.iosUnlocked = true })
    }
    document.addEventListener('touchstart', unlock, { once: true, passive: true })
    document.addEventListener('click', unlock, { once: true })
    return () => {
      document.removeEventListener('touchstart', unlock)
      document.removeEventListener('click', unlock)
    }
  }, [])

  // Video metadata & scroll-scrub loop
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const s = stateRef.current
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId = null

    const loop = (now) => {
      if (!s.ready || s.reduced) return
      const delta = s.targetTime - s.currentTime
      if (Math.abs(delta) > DELTA_THRESHOLD) {
        s.currentTime += delta * LERP
        if (
          s.iosUnlocked &&
          now - s.lastVideoWriteAt >= 1000 / VIDEO_WRITE_FPS &&
          Math.abs(s.currentTime - s.lastAppliedVideoTime) >= VIDEO_WRITE_MIN_STEP
        ) {
          try {
            video.currentTime = s.currentTime
            s.lastAppliedVideoTime = s.currentTime
            s.lastVideoWriteAt = now
          } catch (_) {}
        }
      }
      rafId = requestAnimationFrame(loop)
    }

    const onMeta = () => {
      s.videoDuration = video.duration || 7
      s.ready = true
      setVideoReady(true)
      if (s.reduced) {
        video.loop = true
        video.play().catch(() => {})
        return
      }
      try { video.currentTime = 0 } catch (_) {}
      s.currentTime = 0
      s.targetTime = 0
      rafId = requestAnimationFrame(loop)
    }

    if (video.readyState >= 1) onMeta()
    else {
      video.addEventListener('loadedmetadata', onMeta, { once: true })
      video.addEventListener('canplay', () => { if (!s.ready) onMeta() }, { once: true })
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Scroll handler
  useEffect(() => {
    const s = stateRef.current
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const y = window.scrollY

        // Scroll hint
        if (y > 60) setScrollFaded(true)

        // Hero blend + closing text + video scrub
        const p = Math.max(0, Math.min(1, (y - s.heroStart) / s.heroRange))
        const pastHero = y >= s.heroStart + s.heroRange - 0.5
        setBlendVisible(pastHero)

        if (!s.ready || s.reduced) return
        if (Math.abs(p - s.lastProgress) < HERO_PROGRESS_EPSILON) return
        s.lastProgress = p

        const videoPortion = mapProgressToVideoPortion(p)
        s.targetTime = videoPortion * Math.max(0.1, s.videoDuration - 0.05)
        setClosingVisible(p > 0.78)
      })
    }

    const onResize = () => {
      updateHeroBounds()
      onScroll()
    }

    updateHeroBounds()
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [mapProgressToVideoPortion, updateHeroBounds])

  return (
    <>
      <section className="hero" id="top" ref={heroRef} aria-label="Sneaky Swing — opening film">
        <div className="hero__sticky">
          <div className={`hero__loading${videoReady ? ' hidden' : ''}`}>
            <span><em>Loading the morning...</em></span>
          </div>
          <video
            className={`hero__video${videoReady ? ' ready' : ''}`}
            ref={videoRef}
            src="/sneakyswing-hero.mp4"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
          />
          <div className="hero__vignette" />
          <div className="hero__grain" />

          <div className={`hero__closing${closingVisible ? ' visible' : ''}`} aria-hidden="true">
            <span><em>Perfect your shot.</em></span>
          </div>

          <div className={`hero__scroll${scrollFaded ? ' faded' : ''}`}>
            Scroll
          </div>
        </div>
      </section>

      <div className={`hero__blend${blendVisible ? ' is-visible' : ''}`} aria-hidden="true" />
    </>
  )
}
