import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/sections/Services'
import Work from '@/components/sections/Work'
import Testimonials from '@/components/sections/Testimonials'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
