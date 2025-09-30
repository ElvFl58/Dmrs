import React, { useState, useEffect } from "react";

// DEFINE LA FECHA DE INICIO DE SU RELACIÓN AQUÍ (Año, Mes, Día)
const START_DATE = new Date("2018-05-10T00:00:00"); 

const ContadorAmorEterno = () => {
  const calculateTime = () => {
    const now = new Date();
    const difference = now.getTime() - START_DATE.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formato para mostrar el tiempo en la cuadrícula
  const timeUnits = [
    { value: time.days, label: "Días" },
    { value: time.hours, label: "Horas" },
    { value: time.minutes, label: "Minutos" },
    { value: time.seconds, label: "Segundos" },
  ];

  return (
    <section className="bg-white py-24 md:py-36 px-4 text-center overflow-hidden">
      <h2 className="text-4xl sm:text-6xl font-extrabold text-red-600 mb-4 drop-shadow-md">
        Contamos Cada Instante Contigo
      </h2>
      <p className="text-xl sm:text-2xl text-gray-500 mb-16 max-w-3xl mx-auto italic">
        "Desde nuestro encuentro, el tiempo se detuvo y solo cuenta para nosotros."
      </p>

      {/* Cuadrícula de Contador (Responsive) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className="p-8 bg-pink-50 rounded-2xl shadow-xl border-b-4 border-red-400 transform hover:scale-105 transition duration-300"
          >
            <p className="text-5xl sm:text-7xl font-mono font-bold text-red-500 mb-2 animate-pulse-slow">
              {unit.value.toLocaleString()}
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-700 uppercase tracking-wider">
              {unit.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-16 text-2xl font-serif italic text-red-600 drop-shadow-sm">
        ... Y la cuenta continúa, por toda la eternidad. ♾️
      </p>

      {/* Estilos para el efecto de pulso suave */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ContadorAmorEterno;