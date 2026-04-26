import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Pitch from './components/Pitch/Pitch'
import Features from './components/Features/Features'
import TwoCol from './components/TwoCol/TwoCol'
import Testimonials from './components/Testimonials/Testimonials'
import Partners from './components/Partners/Partners'
import Closing from './components/Closing/Closing'
import PostFooter from './components/PostFooter/PostFooter'
import WatercolorFilters from './components/WatercolorFilters'
import './App.css'

function App() {
  return (
    <>
      <WatercolorFilters />
      <Nav />
      <Hero />
      <Pitch />
      <Features />
      <TwoCol />
      <Testimonials />
      <Partners />
      {/* <Closing /> */}
      <PostFooter />
    </>
  )
}

export default App
