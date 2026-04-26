import { GrainGradient } from '@paper-design/shaders-react'

export default function DotsBg() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <GrainGradient
        style={{ width: '100%', height: '100%', display: 'block' }}
        colors={['#2d5a2e', '#3a7a3b', '#f5f0e0', '#8a8878']}
        colorBack="#f5f0e0"
        softness={0.8}
        intensity={0.4}
        noise={0.5}
        shape="dots"
        speed={0.3}
        scale={0.5}
      />
    </div>
  )
}
