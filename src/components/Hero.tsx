const Hero = () => {
  return (
    <section
      className="relative w-full h-[85vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-4">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">
          Maria & Tiago
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8">
          O nosso dia está a chegar ✨
        </p>

        <a
          href="/rsvp"
          className="px-6 py-3 bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition"
        >
          Confirmar Presença
        </a>
      </div>
    </section>
  );
};

export default Hero;
