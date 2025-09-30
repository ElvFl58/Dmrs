import { useEffect, useState } from "react";

export default function RomanticHero() {
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Generar corazones
    const newHearts = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 12 + 6),
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
      opacity: Math.random() * 0.5 + 0.5,
      sway: Math.random() * 20 - 10,
    }));
    setHearts(newHearts);

    // Generar destellos
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 6 + 2),
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 4,
      opacity: Math.random() * 0.6 + 0.4,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-pink-200 via-red-300 to-pink-400 flex items-center justify-center text-center overflow-hidden">
      
      {/* Corazones que caen y flotan */}
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="absolute bg-pink-500 rounded-full transform transition-transform duration-500 hover:scale-150"
          style={{
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            left: `${heart.left}%`,
            top: "-5%",
            opacity: heart.opacity,
            animation: `heartFall ${heart.duration}s linear ${heart.delay}s infinite, sway${heart.id % 3} 3s ease-in-out infinite alternate`
          }}
        />
      ))}

      {/* Destellos románticos */}
      {sparkles.map(spark => (
        <span
          key={spark.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            left: `${spark.left}%`,
            top: `${spark.top}%`,
            opacity: spark.opacity,
            animation: `sparkle ${spark.duration}s ease-in-out ${spark.delay}s infinite alternate`
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="z-10 px-4 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-6 animate-pulse">
          💖 Cada latido mío tiene tu nombre
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md animate-fadeIn delay-200">
          Desde que llegaste a mi vida, cada día se siente como un sueño del que nunca quiero despertar.
        </p>
        <a
          href="#historia"
          className="bg-white text-pink-500 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-pink-100 hover:shadow-pink-400/50 transition-all duration-300 animate-bounce"
        >
         Te amo, con un amor inefable.
        </a>
      </div>

      {/* Animaciones */}
      <style jsx>{`
        @keyframes heartFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(50vh) rotate(180deg); }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes sway0 { 0%,100% { transform: translateX(0px); } 50% { transform: translateX(10px); } }
        @keyframes sway1 { 0%,100% { transform: translateX(0px); } 50% { transform: translateX(-10px); } }
        @keyframes sway2 { 0%,100% { transform: translateX(0px); } 50% { transform: translateX(5px); } }

        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(1); opacity: 0.3; }
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }
        .animate-fadeIn { opacity: 0; animation: fadeIn 1.5s ease forwards; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
