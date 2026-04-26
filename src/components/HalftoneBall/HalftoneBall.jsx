import './HalftoneBall.css'

export default function HalftoneBall() {
  return (
    <div className="halftone" aria-hidden="true">
      <img
        src="/ball-8bit.webp"
        alt=""
        className="halftone__canvas"
        draggable={false}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}
