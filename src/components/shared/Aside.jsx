import { useState, useEffect, useRef } from "react";
import heartLogo from "../../assets/heart.svg";
import commentLogo from "../../assets/comment-2-svgrepo-com.svg";
import musicLogo from "../../assets/music-svgrepo-com.svg";
import roseLogo from "../../assets/rose-7-svgrepo-com.svg";
// import songFile from "../../assets/tuCancion.mp3"; 
// import roseVideo from "../../assets/roseVideo.mp4";
import Chat from "./Chat.jsx";
export default function RomanticSidebar() {
  const [activeModal, setActiveModal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [roseText, setRoseText] = useState("Te amo  Damaris❤️");

  const icons = [
    { id: "music", label: "Música", icon: musicLogo.src },
    { id: "heart", label: "Corazón", icon: heartLogo.src },
    { id: "message", label: "Mensaje", icon: commentLogo.src },
    { id: "rose", label: "Rosa", icon: roseLogo.src },
  ];

  // Cambiar texto en Rosa cada 5s
  useEffect(() => {
    if (activeModal === "rose") {
      const interval = setInterval(() => {
        setRoseText((prev) =>
          prev === "Te amo ❤️" ? "Siempre te amare 💖" : "Te amo ❤️"
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeModal]);

  // URL de tu bin
// const BIN_ID = "TU_BIN_ID"; 
// const API_KEY = "TU_API_KEY"; 
const API_KEY = '$2a$10$qqbjeDc2aTIuZyWr73WrSOaImxT0p.jNG0IGNWWlCz1vdk4vMXTMa';
const BIN_ID = '683ef9b28960c979a5a4c21f';
// GET mensajes
useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          "X-Master-Key": API_KEY,
        },
      });
      const data = await res.json();
      setMessages(data.record || []); // record contiene tu JSON
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
    }
  };
  fetchMessages();
}, []);

// POST (actualizar mensajes en JSONBin)
const handleSendMessage = async () => {
  if (!inputMsg.trim()) return;

  const newMessage = { sender: "Damaris", text: inputMsg };
  const updatedMessages = [...messages, newMessage];

  try {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(updatedMessages),
    });

    setMessages(updatedMessages);
    setInputMsg("");

    // Respuesta automática
    setTimeout(() => {
      const reply = { sender: "Tú", text: "Yo también te amo 😍" };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  } catch (error) {
    console.error("Error al guardar mensaje:", error);
  }
};
  return (
    <>
      {/* Sidebar */}
      <aside className="
        fixed left-1/2 transform -translate-x-1/2 bottom-5 sm:top-20 sm:left-5 sm:translate-x-0 h-auto
        sm:flex-col flex flex-row space-x-6 sm:space-x-0 sm:space-y-6
        bg-black/30 backdrop-blur-md rounded-xl p-3 z-50 shadow-lg
      ">
        {icons.map((icon) => (
          <button
            key={icon.id}
            type="button"
            onClick={() => {
              setActiveModal(icon.id);
              if (icon.id === "music" && audioRef.current) audioRef.current.play();
            }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-white shadow-md hover:bg-pink-300/30 hover:scale-110 transition-all duration-300 animate-bounce-slow z-50"
            title={icon.label}
          >
            <img src={icon.icon} alt={icon.label} className="w-8 h-8" />
          </button>
        ))}
      </aside>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40" onClick={(e) => {
          // Evita que el modal se cierre al hacer click fuera del contenido
          if (e.target === e.currentTarget) return;
        }}>
          <div className="relative z-50 bg-gradient-to-r from-pink-400 via-pink-600 to-purple-700 rounded-3xl p-8 max-w-sm w-full mx-auto text-center text-white shadow-2xl animate-modal-scale">

            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-pink-200"
              onClick={() => {
                setActiveModal(null);
                if (audioRef.current) audioRef.current.pause();
              }}
            >
              &times;
            </button>

            {/* Música */}
            {activeModal === "music" && (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-extrabold mb-2 animate-pulse tracking-wider text-white drop-shadow-lg">
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-8 h-8 text-pink-200 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                    </svg>
                    🎵  Canción
                  </span>
                </h2>
                <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-purple-700 rounded-2xl p-6 w-full flex flex-col items-center shadow-2xl animate-modal-scale">
                  <div className="relative w-48 h-48 mb-4 flex items-center justify-center">
                    <img src="/music/01.jpg" alt="Carátula" className="w-48 h-48 rounded-lg shadow-lg object-cover border-4 border-pink-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/80 drop-shadow animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white text-lg mb-2 font-medium drop-shadow-lg flex items-center gap-2">
                    <svg className="w-6 h-6 text-pink-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-2v13" />
                    </svg>
                    Canción: <span className="font-bold text-pink-100"> Amor 💖</span>
                  </p>
                  <audio ref={audioRef} src="/music/roi.mp3" autoPlay loop style={{ display: 'none' }} />
                </div>
                <style jsx>{`
                  .animate-spin-slow { animation: spin 3s linear infinite; }
                  @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
              </div>
            )}

            {/* Corazón */}
            {activeModal === "heart" && (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-extrabold text-white drop-shadow-lg animate-pulse">💖 Mensaje de Amor</h2>
                <div className="bg-gradient-to-tr from-pink-400 via-pink-600 to-purple-700 p-6 rounded-3xl shadow-2xl animate-modal-scale text-white text-center max-w-md">
                  <p className="text-lg leading-relaxed font-medium drop-shadow-lg">
                    Por lo cual estoy seguro de que 
                    ni la muerte , ni la vida ,ni angeles ,
                    ni potestades,ni principados ,ni lo presente,
                    ni lo por venir , ni lo alto ni lo 
                    profundo , ni ninguna otra cosa creada
                    no podra separar. Te Amo Damaris
                    Damaris, cada instante contigo es un regalo que ilumina mi alma. 
                  
                  </p>
                </div>
              </div>
            )}

            {/* Modal del chat */}
            {activeModal === "message" && (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-extrabold text-white drop-shadow-lg animate-pulse">💬 Chat de Amor</h2>
                <div className="bg-gradient-to-tr from-pink-400 via-pink-600 to-purple-700 p-6 rounded-3xl shadow-2xl animate-modal-scale text-white text-center max-w-md w-full">
                  <Chat
                    messages={messages}
                    inputMsg={inputMsg}
                    setInputMsg={setInputMsg}
                    handleSendMessage={handleSendMessage}
                    chatContainerRef={chatContainerRef}
                  />
                </div>
              </div>
            )}

            {/* Rosa */}
            {activeModal === "rose" && (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-extrabold text-white drop-shadow-lg animate-pulse">🌹 Rosa Para Ti</h2>
                <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
                  <video src='' autoPlay loop muted className="w-full rounded-2xl" />
                  <p className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-white drop-shadow-xl animate-fade-in-out">
                    {roseText}
                  </p>
                </div>
              </div>
            )}

            <style jsx>{`
              @keyframes fade-in-out { 0%,100%{opacity:0; transform:translateY(-10px);}50%{opacity:1; transform:translateY(0);} }
              .animate-fade-in-out { animation: fade-in-out 5s infinite; }
              .animate-bounce-slow { animation: bounce 2.5s infinite; }
              @keyframes modal-scale { 0%{transform:scale(0.7);opacity:0;}50%{transform:scale(1.05);opacity:1;}100%{transform:scale(1);opacity:1;} }
              .animate-modal-scale { animation: modal-scale 0.5s ease-out; }
              .animate-pulse { animation: pulse 1.5s infinite; }
              @keyframes pulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.05);} }
            `}</style>

          </div>
        </div>
      )}
    </>
  );
}
