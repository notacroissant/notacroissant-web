'use client'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Process from '@/components/Process'
import HowItWorks from '@/components/HowItWorks'
import Testimonial from '@/components/Testimonial'
import Order from '@/components/Order'
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
      <Footer />
    </main>
  )
}
