import { useEffect, useState } from "react";

const romanticMessages = [
  "Eres mi luz en la oscuridad 💖",
  "Cada latido me recuerda a ti 💓",
  "Tu sonrisa ilumina mi mundo 🌟",
  "Amarte es mi aventura favorita 💌",
  "Contigo todo es magia ✨"
];

export default function NeonRomantic() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % romanticMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Corazones aleatorios
  const hearts = Array.from({ length: 35 }, (_, i) => ({
    left: Math.random() * 100 + "%",
    size: Math.random() * 2 + 1.5 + "rem",
    delay: Math.random() * 5 + "s",
    duration: Math.random() * 12 + 8 + "s",
    opacity: Math.random() * 0.7 + 0.3,
    rotate: Math.random() * 360 + "deg"
  }));

  return (
    <section className="relative w-[100%] h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Corazones flotantes */}
      {hearts.map((heart, idx) => (
        <div
          key={idx}
          className="absolute animate-heart-fall"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
            transform: `rotate(${heart.rotate})`,
            color: "#ff3f81"
          }}
        >
          ❤️
        </div>
      ))}

      {/* Texto central neon */}
      <div className="z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-600 to-pink-500 animate-neon-pulse">
          {romanticMessages[currentMessage]}
        </h1>
      </div>

      {/* Animaciones */}
      <style jsx>{`
        @keyframes heart-fall {
          0% { transform: translateY(-60px) rotate(0deg) scale(0.8); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg) scale(1); opacity: 0; }
        }
        .animate-heart-fall {
          animation-name: heart-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes neon-pulse {
          0%, 100% {
            text-shadow:
              0 0 5px #ff8fcf,
              0 0 10px #ff5aa1,
              0 0 20px #ff2f77,
              0 0 40px #ff1a5c,
              0 0 60px #ff0a3c;
          }
          50% {
            text-shadow:
              0 0 15px #ff8fcf,
              0 0 30px #ff5aa1,
              0 0 50px #ff2f77,
              0 0 80px #ff1a5c,
              0 0 100px #ff0a3c;
          }
        }
        .animate-neon-pulse {
          animation: neon-pulse 1.5s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
