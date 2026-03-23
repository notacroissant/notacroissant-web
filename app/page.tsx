import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Process from '@/components/Process'
import HowItWorks from '@/components/HowItWorks'
import Testimonial from '@/components/Testimonial'
import Order from '@/components/Order'
import Waitlist from '@/components/Waitlist'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Story />
      <Process />
      <HowItWorks />
      <Testimonial />
      <Order />
      <Waitlist />
      <FAQ />
      <Footer />
    </main>
  )
}
