import React, { useState, useEffect, useCallback } from "react";

// Lista de mensajes
const mensajes = [
    "Eres mi paz y mi aventura favorita. 💖",
    "Te elegiría a ti, una y mil vidas más. 💍",
    "Encontré el hogar de mi alma justo en ti. 🏡",
    "Tu sonrisa es el sol que ilumina mi mundo. ☀️",
    "Cada latido mío tiene tu nombre. ❤️",
    "Mi alma reconoció la tuya desde el inicio. ✨",
    "Mi lugar más seguro en el mundo es a tu lado. ⚓",
    "Eres la melodía que siempre quise escuchar. 🎶",
    "Contigo, el infinito no es suficiente. ♾️",
    "Simplemente, te amo más de lo que las palabras pueden decir. 🙏",
    "Eres el sueño del que nunca quiero despertar. 🌙",
    "Cada día contigo es un regalo que agradezco. 🎁",
    "Mi corazón late solo por ti. 💓",
    "Eres mi razón para sonreír incluso en los días grises. 🌈",
    "Amarte es la aventura más hermosa de mi vida. 🚀",
    "Tus abrazos son mi refugio favorito. 🤗",
    "Contigo, todo tiene sentido. 🔑",
    "Eres mi pensamiento feliz constante. 🌸",
    "No necesito nada más mientras tenga tu amor. 💕",
    "Eres mi lugar favorito en el mundo. 🏞️",
    "Cada mirada tuya es un poema que me enamora. 📖",
    "Mi corazón encontró su hogar en tu pecho. 🏠",
    "Eres la chispa que enciende mi alma. 🔥",
    "Junto a ti, todo es posible. 🌟",
    "Tu voz es la melodía que calma mis tormentas. 🎵",
    "Amarte es tan natural como respirar. 🌬️",
    "Eres el abrazo que mi corazón siempre buscó. 🤍",
    "Mi vida tiene sentido porque estás en ella. 💫",
    "Tu amor es mi motor y mi guía. 🛤️",
    "Eres la luz que disipa todas mis sombras. 💡",
    "A tu lado, descubrí el verdadero significado de la felicidad. 😊",
    "Cada día contigo es un capítulo nuevo de amor. 📚",
    "Eres mi lugar seguro en un mundo incierto. 🛡️",
    "Amarte me hace mejor persona. 🌱",
    "Tus ojos son mi cielo favorito. 🌌",
    "Eres la razón por la que creo en la magia. ✨",
    "Cada beso tuyo es un instante eterno. 💋",
    "Eres mi calma y mi tormenta al mismo tiempo. 🌊",
    "Contigo, aprendí que el amor verdadero existe. 💞",
    "Mi corazón sonríe cada vez que pienso en ti. 😍",
    "Eres la pieza que completó mi rompecabezas. 🧩",
    "Amarte es mi destino más feliz. 🌠",
    "Tu amor es el refugio donde siempre quiero estar. 🏰",
    "Eres mi razón de ser y de soñar. 💭",
    "Cada momento contigo es un tesoro. 💎",
    "Eres mi inspiración y mi alegría constante. 🎨",
    "Contigo, cada día es primavera. 🌷",
    "Eres la melodía que mi corazón siempre canta. 🎼",
    "No hay distancia que apague lo que siento por ti. 🌍",
    "Eres mi sol en los días nublados. ☁️☀️",
    "Cada palabra tuya es un suspiro de amor. 💌",
    "Eres la historia más bonita que mi corazón ha leído. 📖❤️",
    "Amarte es mi acto de valentía favorito. 🦋",
    "Tu risa es el mejor sonido del mundo. 😂💖",
    "Eres el abrazo que calma todas mis dudas. 🤗",
    "Cada instante contigo es eterno en mi memoria. ⏳",
    "Eres mi paz en medio del caos. 🌪️",
    "Amarte es la aventura más dulce que conozco. 🍯",
    "Tus manos son mi hogar. 🤲",
    "Eres la estrella que guía mis noches. 🌟",
    "Contigo aprendí que el amor es simple y puro. 🕊️",
    "Eres mi refugio y mi fortaleza. 🏔️",
    "Cada mirada tuya es un canto de amor. 🎤❤️",
    "Eres la magia que colorea mi vida. 🌈",
    "Amarte es mi poema favorito. ✍️💖",
    "Tus palabras son caricias para mi alma. 📝",
    "Eres mi lugar favorito para perderme. 🌀",
    "Cada día contigo es un regalo inesperado. 🎁",
    "Eres mi alegría y mi calma al mismo tiempo. ☀️🌙",
    "Contigo, la vida sabe mejor. 🍫",
    "Eres mi sueño que se hizo realidad. 🌠",
    "Amarte es mi viaje más emocionante. 🚢",
    "Tus abrazos son la medicina de mi corazón. 💊❤️",
    "Eres mi amanecer en los días oscuros. 🌅",
    "Cada beso tuyo es un suspiro de eternidad. 💋",
    "Eres mi felicidad cotidiana. ☀️",
    "Amarte es un arte que nunca dejaré de practicar. 🎨",
    "Tus ojos son faros que guían mi camino. 🕯️",
    "Eres mi historia favorita sin final. 📖",
    "Contigo, todo es más brillante. 💎",
    "Eres mi refugio en la tormenta. ⛈️",
    "Cada momento sin ti es un preludio de felicidad contigo. 🎶",
    "Eres el abrazo que siempre soñé. 🤗",
    "Amarte es mi certeza más grande. 🔒",
    "Tu amor es mi hogar eterno. 🏡",
    "Eres la melodía que calma mis días. 🎵",
    "Cada palabra tuya es un tesoro que guardo. 🗝️",
    "Eres mi calma y mi emoción a la vez. 🌊",
    "Amarte es descubrir un mundo nuevo cada día. 🌍",
    "Tus besos son el idioma que entiende mi corazón. 💋",
    "Eres mi inspiración para ser mejor. 🌱",
    "Contigo aprendí lo que significa amar de verdad. 💞",
    "Eres mi sol y mi luna, todo en uno. ☀️🌙",
    "Cada sonrisa tuya ilumina mi alma. ✨",
    "Eres el sueño que quiero vivir despierto. 🌌",
    "Amarte es mi hábito favorito. ❤️",
    "Tus abrazos son mi paz en cualquier lugar. 🕊️",
    "Eres la magia que transforma mis días. 🌟",
    "Cada instante contigo es un regalo que atesoro. 🎁",
    "Eres mi corazón y mi razón. 💓",
    "Amarte es la mejor decisión de mi vida. ✅",
    "Tu amor es mi brújula en este mundo. 🧭",
    "Eres mi hogar aunque viaje lejos. 🏡",
    "Cada beso tuyo es un capítulo de felicidad. 📖💋",
    "Eres mi alegría constante. 😊",
    "Amarte es mi aventura más dulce. 🍭",
    "Tus palabras son música para mi corazón. 🎶",
    "Eres la luz que ilumina mi camino. 💡",
    "Cada mirada tuya me enamora de nuevo. 😍",
    "Eres mi refugio y mi cielo en la tierra. 🌤️",
    "Amarte es mi regalo diario. 🎁❤️",
    "Tus abrazos son mi lugar seguro. 🤗",
    "Eres la melodía que da ritmo a mi vida. 🎵",
    "Cada día contigo es un sueño hecho realidad. 🌠",
    "Eres mi inspiración y mi amor eterno. 💖",
    "Amarte es mi felicidad infinita. ♾️",
    "Tu sonrisa es mi energía y mi luz. ☀️",
    "Eres mi tesoro más valioso. 💎",
    "Cada instante contigo es un suspiro de alegría. 🌸",
    "Eres mi amor y mi vida. ❤️",
  ];
  

const Msg = () => {
  const [petalos, setPetalos] = useState([]);
  const [popup, setPopup] = useState({ visible: false, texto: "" });
  const [ultimoMensajeIndex, setUltimoMensajeIndex] = useState(null);

  const getBasePetalSize = () => {
    if (window.innerWidth < 640) return 35;
    if (window.innerWidth < 1024) return 40;
    return 50;
  };

  const generarPetalos = useCallback(() => {
    const nuevosPetalos = [];
    const width = window.innerWidth;
    const numPetalos = width < 640 ? 6 : width < 1024 ? 50 : 60;

    for (let i = 0; i < numPetalos; i++) {
      nuevosPetalos.push({
        id: i,
        left: Math.random() * 95 + 2,
        duration: 10 + Math.random() * 10,
        scale: width < 640 ? 0.7 + Math.random() * 0.5 : 0.6 + Math.random() * 0.6,
        mensaje: mensajes[Math.floor(Math.random() * mensajes.length)],
        delay: Math.random() * 5,
        swayAmount: width < 640 ? Math.random() * 10 - 5 : Math.random() * 60 - 30,
        rotateX: Math.random() * 360,
        rotateY: Math.random() * 360,
      });
    }
    setPetalos(nuevosPetalos);
  }, []);

  useEffect(() => {
    generarPetalos();
    window.addEventListener("resize", generarPetalos);
    return () => window.removeEventListener("resize", generarPetalos);
  }, [generarPetalos]);

  const handlePetalClick = useCallback(() => {
    if (mensajes.length === 0) return;

    let nuevoIndex;
    do {
      nuevoIndex = Math.floor(Math.random() * mensajes.length);
    } while (nuevoIndex === ultimoMensajeIndex && mensajes.length > 1);

    setUltimoMensajeIndex(nuevoIndex);
    setPopup({ visible: true, texto: mensajes[nuevoIndex] });
  }, [ultimoMensajeIndex]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-rose-200 via-pink-400 to-red-500 overflow-hidden flex flex-col items-center justify-center">

      {/* Contenedor central */}
      <div className="z-20 text-center p-4 sm:p-8 mx-4 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl transition-all duration-500 max-w-xs sm:max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-red-600 mb-3 animate-fadeInUp">
          🌹 Mensajes Ocultos en el Viento 🌹
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-6 animate-fadeInUp delay-500">
          Toca cualquier pétalo flotante para que el universo te revele un fragmento de mi corazón.
        </p>
      </div>

      {/* Pétalos móviles con animación */}
      <div className="flex flex-col justify-between items-center w-full h-48 sm:hidden my-4">
        {petalos.slice(0, 6).map((petalo) => (
          <div
            key={petalo.id}
            className="bg-pink-300 bg-opacity-95 text-white rounded-full cursor-pointer select-none shadow-lg p-2 flex items-center justify-center animate-mobilePetal"
            style={{
              width: `${getBasePetalSize()}px`,
              height: `${getBasePetalSize()}px`,
              animationDelay: `${petalo.delay}s`,
              '--sway-amount': `${petalo.swayAmount}px`,
            }}
            onClick={handlePetalClick}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Pétalos flotantes en tablet/desktop */}
      {petalos.map((petalo) =>
        window.innerWidth >= 640 ? (
          <div
            key={petalo.id}
            className="absolute bg-pink-300 bg-opacity-95 text-white rounded-full cursor-pointer select-none shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.8] petal-shape-bg z-10"
            style={{
              left: `${petalo.left}vw`,
              transform: `scale(${petalo.scale}) translateZ(0)`,
              animation: `
                floatPetalo ${petalo.duration}s linear ${petalo.delay}s infinite,
                sway ${petalo.duration / 2}s ease-in-out ${petalo.delay}s infinite alternate
              `,
              '--sway-amount': `${petalo.swayAmount}px`,
              '--initial-rotateX': `${petalo.rotateX}deg`,
              '--initial-rotateY': `${petalo.rotateY}deg`,
              width: `${getBasePetalSize()}px`,
              height: `${getBasePetalSize()}px`,
            }}
            onClick={handlePetalClick}
          >
            <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-base">🌸</span>
          </div>
        ) : null
      )}

      {/* Popup */}
      {popup.visible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm p-4"
          onClick={() => setPopup({ visible: false, texto: "" })}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-10 text-center shadow-3xl max-w-xs sm:max-w-md w-full transform transition-all duration-500 animate-fadeIn border-4 border-red-300"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-4xl mb-4 animate-pulse">✨</p>
            <p className="text-lg sm:text-xl font-serif italic text-red-600 mb-4">
              "{popup.texto}"
            </p>
            <p className="text-sm text-gray-500 mb-4">— Un secreto revelado por el corazón.</p>
            <button
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg hover:bg-red-600 transition transform hover:scale-105"
              onClick={() => setPopup({ visible: false, texto: "" })}
            >
              Cerrar mensaje
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .petal-shape-bg {
          clip-path: polygon(50% 0%, 80% 10%, 100% 50%, 80% 90%, 50% 100%, 20% 90%, 0% 50%, 20% 10%);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,255,255,0.5);
        }

        @keyframes floatPetalo {
          0% { transform: translateY(110vh) rotate3d(1,1,0,var(--initial-rotateX)) scale(var(--scale)); opacity: 0.2; }
          50% { opacity: 1; }
          100% { transform: translateY(-20vh) rotate3d(1,1,0,calc(var(--initial-rotateY)+720deg)) scale(var(--scale)); opacity: 0; }
        }

        @keyframes sway {
          0% { transform: translateX(0) rotateZ(-5deg); }
          100% { transform: translateX(var(--sway-amount)) rotateZ(5deg); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0,20px,0); }
          to { opacity: 1; transform: translate3d(0,0,0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out both; }
        .delay-500 { animation-delay: 0.5s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.6) translateY(50px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(0.68,-0.55,0.265,1.55) forwards; }

        @keyframes mobilePetalAnim {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(var(--sway-amount)); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .animate-mobilePetal {
          animation: mobilePetalAnim 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Msg;
