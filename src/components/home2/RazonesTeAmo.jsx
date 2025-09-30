import React, { useState, useEffect, useCallback } from "react";

// Lista expandida a 20 razones para un amor infinito
const razones = [
  { icon: "🌹", title: "La Rosa Eterna", text: "Eres mi calma y mi pasión. La única persona que me hace sentir que pertenezco a este mundo." },
  { icon: "✨", title: "El Destino Escrito", text: "Mi alma te reconoció. No fue amor a primera vista, fue un reencuentro de dos mitades destinadas." },
  { icon: "🗝️", title: "El Guardián de Mi Paz", text: "Me diste un hogar donde sentirme seguro, justo en el espacio tranquilo entre tus brazos." },
  { icon: "👑", title: "Mi Joya Más Preciada", text: "Cada momento, cada error y cada victoria: no importa, porque lo vives conmigo." },
  { icon: "🎶", title: "La Melodía Infinita", text: "Tu voz es la única música que necesito escuchar para saber que todo estará bien." },
  { icon: "🌌", title: "Mi Universo Entero", text: "Antes de ti, solo estrellas sueltas. Contigo, el universo tiene sentido y dirección." },
  { icon: "⚓", title: "Mi Ancla de Fe", text: "Amo tu inmensa paciencia, es la fuerza silenciosa que me sostiene siempre." },
  { icon: "⏳", title: "El Tiempo Detenido", text: "Contigo, cada hora se siente como un suspiro eterno; el tiempo ya no nos domina." },
  { icon: "💡", title: "Luz en la Sombra", text: "Eres mi claridad en la duda. Tu perspectiva me guía hacia el camino correcto." },
  { icon: "🔥", title: "El Fuego Sagrado", text: "Amo la intensidad con la que vivimos. Eres mi aventura, la chispa que nunca se apaga." },
  { icon: "🪄", title: "Tu Magia Diaria", text: "Tienes el don de convertir cualquier día ordinario en algo memorable y perfecto." },
  { icon: "🗺️", title: "El Fin del Viaje", text: "Eres mi destino final. No busco nada más allá de donde tú estés." },
  { icon: "💖", title: "La Valentía de Amar", text: "Me diste el coraje de ser vulnerable y el regalo de ser amado incondicionalmente." },
  { icon: "🌊", title: "La Calma en el Caos", text: "Tus manos son mi refugio. Un solo toque borra todas mis preocupaciones." },
  { icon: "🌟", title: "Mi Norte y Guía", text: "Eres el estándar de todo lo bueno. Me inspiras a ser una persona mejor cada mañana." },
  { icon: "💐", title: "Tu Delicadeza", text: "Amo la ternura con la que tratas mi corazón y cómo cuidas nuestros sueños." },
  { icon: "🦋", title: "La Metamorfosis", text: "Junto a ti, florezco. Me has ayudado a transformarme en la persona que siempre debí ser." },
  { icon: "🧩", title: "La Pieza Faltante", text: "Eres la mitad que no sabía que me hacía falta. Mi vida encajó al encontrarte." },
  { icon: "🥂", title: "El Brindis de la Vida", text: "Celebro tu existencia. Eres mi razón para sonreír y mi alegría más pura." },
  { icon: "📜", title: "La Promesa Eterna", text: "Te amo. Hoy, mañana, y en cada vida que el destino me permita compartir contigo." },
];

const RazonesDeMiAlma_Infinita = () => {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Función para pasar a la siguiente razón con animación de transición más suave
  const nextReason = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Inicia el fade-out
    setTimeout(() => {
      // Cambia el contenido
      setCurrentReasonIndex((prevIndex) => (prevIndex + 1) % razones.length);
      // Inicia el fade-in
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // 500ms para el fade-in
    }, 500); // 500ms para el fade-out
  }, [isAnimating]);

  const currentReason = razones[currentReasonIndex];

  return (
    <section className="relative bg-gradient-to-br from-rose-100 via-pink-300 to-red-400 py-24 md:py-40 px-4 text-center overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* Fondo de Partículas de Brillo (4x más denso) */}
      <div className="absolute inset-0 z-0 sparkle-background">
        <span className="sparkle top-[10%] left-[5%] text-2xl">✨</span>
        <span className="sparkle top-[15%] right-[15%] delay-1 text-xl">✨</span>
        <span className="sparkle top-[30%] left-[25%] delay-2 text-3xl">✨</span>
        <span className="sparkle top-[45%] right-[5%] delay-3 text-lg">✨</span>
        <span className="sparkle bottom-[10%] left-[50%] delay-4 text-2xl">✨</span>
        <span className="sparkle bottom-[20%] right-[30%] delay-5 text-xl">✨</span>
        <span className="sparkle bottom-[40%] left-[15%] delay-6 text-3xl">✨</span>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-xl animate-fadeInUp">
          Mi Amor por Ti es...
        </h2>
        
        {/* Tarjeta de Revelación Única con el contenido actual */}
        <div 
          className={`bg-white/95 rounded-3xl shadow-3xl p-8 sm:p-12 md:p-16 mx-auto max-w-2xl border-t-8 border-rose-500 transition-all duration-700 hover-3d-card cursor-pointer ${isAnimating ? 'animate-fade-out-scale' : 'animate-fade-in-scale'}`}
          onClick={nextReason}
        >
          <span className="text-6xl mb-4 p-3 bg-red-100/70 rounded-full border-2 border-rose-400 block mx-auto w-fit animate-pulse-slow">
            {currentReason.icon}
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4 mt-6 font-serif italic">
            {currentReason.title}
          </h3>
          <p className="text-lg sm:text-xl text-gray-700 font-light leading-relaxed">
            {currentReason.text}
          </p>
          <button className="mt-8 text-rose-500 font-bold hover:text-red-600 transition tracking-wider">
            Toca aquí para la Siguiente Revelación ({currentReasonIndex + 1} / {razones.length})
          </button>
        </div>
        
        {/* Indicador de que el ciclo se repite */}
        {currentReasonIndex === razones.length - 1 && (
            <p className="mt-8 text-white/80 italic animate-fadeInUp delay-1000">
                ¡El amor se renueva! Toca para empezar de nuevo.
            </p>
        )}
      </div>

      {/* Estilos CSS & Keyframes (Añadiendo los faltantes y mejorando) */}
      <style jsx>{`
        /* ----------------------- Animación de Fondo y Brillo ----------------------- */
        .sparkle-background {
          pointer-events: none;
        }
        .sparkle {
          position: absolute;
          opacity: 0.8;
          filter: drop-shadow(0 0 5px gold);
          animation: twinkle 10s ease-in-out infinite both; /* Más lento */
        }
        .delay-1 { animation-delay: 1.5s; }
        .delay-2 { animation-delay: 3s; }
        .delay-3 { animation-delay: 4.5s; }
        .delay-4 { animation-delay: 6s; }
        .delay-5 { animation-delay: 7.5s; }
        .delay-6 { animation-delay: 9s; }
        
        @keyframes twinkle {
          0%, 100% {
            transform: scale(1) rotate(0deg) translateY(0);
            opacity: 0.8;
          }
          30% {
            transform: scale(1.5) rotate(10deg) translateY(-10px);
            opacity: 1;
          }
          60% {
            transform: scale(1.2) rotate(-5deg) translateY(5px);
            opacity: 0.7;
          }
        }

        /* ----------------------- Interacción de Tarjeta 3D ----------------------- */
        .hover-3d-card {
            transform-style: preserve-3d;
        }

        .hover-3d-card:hover {
            transform: scale(1.03) rotateX(2deg) rotateY(-2deg);
            box-shadow: 0 25px 50px -12px rgba(220, 38, 38, 0.4), 
                        0 0 20px 5px rgba(255, 105, 180, 0.2);
        }

        /* ----------------------- Animaciones de Transición ----------------------- */
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeOutScale {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(1.05) translateY(-20px); }
        }
        
        .animate-fade-in-scale { animation: fadeInScale 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .animate-fade-out-scale { animation: fadeOutScale 0.5s ease-in both; }
        
        /* ----------------------- Animación de Entrada General ----------------------- */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }

        /* ----------------------- Animación de Pulso Suave (Icono) ----------------------- */
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default RazonesDeMiAlma_Infinita;