const About = () => {
  return (
    <section id="about" className="w-full bg-white">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-lg text-gray-600">
            We help patients easily book, manage, and attend their appointments through our intuitive online scheduling platform. With a focus on healthcare efficiency, we’re redefining how patients interact with medical professionals.
          </p>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/about-image.jpg"
            alt="About Illustration"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>

    </section>
  )
}

export default About