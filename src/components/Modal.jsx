import React, { useState, useEffect } from "react";

const RomanticChatBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [message, setMessage] = useState("");

  const romanticMessages = [
    "Cada momento contigo es un tesoro 💖",
    "Tu sonrisa ilumina mi día 🌞",
    "Eres mi inspiración y mi alegría ✨",
    "Siempre estás en mi corazón 💌",
    "Cada día a tu lado es especial 💕",
    "Eres mi pensamiento favorito 🥰",
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    let greet = "¡Hola mi amor!";
    if (hour >= 6 && hour < 12) greet = "¡Buenos días! 🌅";
    else if (hour >= 12 && hour < 18) greet = "¡Buenas tardes! 🌸";
    else greet = "¡Buenas noches! 🌙";

    setGreeting(greet);

    const randomMsg =
      romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    setMessage(randomMsg);
  }, []);

  const handleNewMessage = () => {
    const randomMsg =
      romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    setMessage(randomMsg);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 right-2 transform -translate-y-1/2 bg-pink-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-pink-600 transition z-50 animate-pulse text-sm"
        >
          💌 Chat
        </button>
      )}

      {isOpen && (
        <div className="fixed top-1/2 right-2 transform -translate-y-1/2 z-50 w-64 sm:w-72 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 rounded-2xl shadow-xl p-4 text-center text-white relative overflow-hidden">
          {/* Corazones animados */}
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="absolute text-pink-200 opacity-50 animate-heart-float pointer-events-none select-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${1 + Math.random() * 1.5}rem`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              ❤️
            </span>
          ))}

          {/* Botón cerrar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white/70 hover:text-white font-bold text-lg"
          >
            ✖
          </button>

          {/* Saludo */}
          <h2 className="text-sm sm:text-base font-semibold mb-1 drop-shadow-md">
            {greeting}
          </h2>

          {/* Mensaje romántico */}
          <p className="text-sm sm:text-base font-medium leading-snug mb-3 drop-shadow-md">
            {message}
          </p>

          {/* Nuevo mensaje */}
          <button
            onClick={handleNewMessage}
            className="w-full bg-white/30 hover:bg-white/50 text-white font-bold py-1 rounded-lg text-sm transition"
          >
            💖 Otro
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes heart-float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-150px) scale(1.2);
            opacity: 0;
          }
        }
        .animate-heart-float {
          animation: heart-float linear infinite;
        }
      `}</style>
    </>
  );
};

export default RomanticChatBot;
