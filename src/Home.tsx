import "./Home.css";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";

const Home = () => {
  return (
    <main className="bg-[#faf7f2] text-gray-800">
      {/* HERO */}
      <Hero />

      {/* COUNTDOWN */}
      <section className="py-16">
        <Countdown />
      </section>

      {/* MENSAGEM DO CASAL */}
      <section className="max-w-3xl mx-auto text-center px-6 py-16">
        <h2 className="text-3xl font-light mb-4">O nosso dia especial</h2>
        <p className="text-lg font-light leading-relaxed">
          É com enorme alegria que vos convidamos a celebrar connosco este
          momento tão importante das nossas vidas. Mal podemos esperar para
          partilhar este dia convosco 💛
        </p>
      </section>

      {/* PROGRAMA */}
      <section className="py-16 bg-white">
        <Timeline />
      </section>

      {/* ONDE E QUANDO */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-light mb-4">Onde & Quando</h2>

        <div className="max-w-xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-medium">Cerimónia</h3>
            <p className="text-gray-700">15 de Setembro 2025 — 14:30</p>
            <p className="text-gray-700">Igreja de Santa Maria</p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Festa</h3>
            <p className="text-gray-700">15 de Setembro 2025 — 16:00</p>
            <p className="text-gray-700">Quinta das Flores</p>
          </div>

          <a
            href="https://maps.app.goo.gl/7B3x5zPe8kW6pVB4A"
            target="_blank"
            className="inline-block mt-5 px-6 py-3 bg-black text-white rounded-full shadow hover:bg-gray-800 transition"
          >
            Ver no Google Maps
          </a>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.523400573323!2d-7.82302562221118!3d40.64039147140475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2335003bba2ec1%3A0x2de4eaeacf7dd470!2sHotel%20Rural%20Vila%20Me%C3%A3!5e0!3m2!1sen!2spt!4v1763129927376!5m2!1sen!2spt"
            width="600"
            height="450"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Home;
