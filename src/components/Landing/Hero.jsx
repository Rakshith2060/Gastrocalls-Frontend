import { Button } from '@headlessui/react'

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex justify-center items-center overflow-hidden"
    >

      <div className="absolute inset-0 -z-20">
    <img
      src="/hero-image.jpg"
      alt="Hero Background"
      className="w-full h-full object-cover"
    />
  </div>

      <div className="relative z-10 mt-40 max-w-10xl text-center bg-black/15 backdrop-blur rounded-2xl px-8 py-10 text-white shadow">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-black drop-shadow-md">
          Streamlined Patient Appointment Scheduling
        </h1>
        <p className="text-2xl mb-6 text-white drop-shadow-black drop-shadow-md">
          Easily book and manage your appointments online!
        </p>
        <Button className='inline-flex items-center rounded-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'>
          Get Started
        </Button>
      </div>
    </section>
  )
}

export default Hero