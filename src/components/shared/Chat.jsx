import React, { useState, useEffect, useRef } from "react";

const API_KEY = '$2a$10$qqbjeDc2aTIuZyWr73WrSOaImxT0p.jNG0IGNWWlCz1vdk4vMXTMa';
const BIN_ID = '683ef9b28960c979a5a4c21f';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const chatContainerRef = useRef(null);

  // Fetch mensajes desde JSONBin
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: {
            "X-Master-Key": API_KEY,
          },
        });
        const data = await res.json();
        // Espera formato { messages: [...] }
        setMessages(data.record?.messages || []);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };
    fetchMessages();
  }, []);

  // Scroll automático al fondo
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Enviar mensaje y actualizar JSONBin
  const handleSendMessage = async () => {
    if (!inputMsg.trim()) return;
    const newMessage = {
      sender: "Damaris",
      message: inputMsg,
      fecha: new Date().toISOString(),
    };
    const updatedMessages = [...messages, newMessage];
    try {
      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ messages: updatedMessages }), // Formato correcto
      });
      setMessages(updatedMessages);
      setInputMsg("");
      setTimeout(() => {
        const reply = {
          sender: "Tú",
          message: "Yo también te amo 😍",
          fecha: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, reply]);
      }, 1000);
    } catch (error) {
      console.error("Error al guardar mensaje:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md space-y-4">
      <h2 className="text-3xl font-extrabold text-white drop-shadow-lg animate-pulse">
        💌 Chat Romántico
      </h2>
      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="bg-gradient-to-tr from-pink-200 via-pink-400 to-purple-500 rounded-2xl p-4 max-h-72 w-full overflow-y-auto shadow-lg flex flex-col space-y-2"
      >
        {messages && Array.isArray(messages) && messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-3 py-2 rounded-2xl max-w-xs break-words text-sm font-medium shadow-md transition-all duration-500 ${
              msg.sender === "Damaris"
                ? "bg-pink-50 self-end text-right text-pink-900 animate-slide-in-right"
                : "bg-pink-600 text-white self-start text-left animate-slide-in-left"
            }`}
          >
            <b>{msg.sender || "?"}:</b> {msg.message}
            <div className="text-xs text-gray-700">{msg.fecha && new Date(msg.fecha).toLocaleString()}</div>
          </div>
        ))}
      </div>
      {/* Input para DMRS */}
      <div className="flex w-full space-x-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 p-2 rounded-2xl border border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none"
          placeholder="Damaris escribe aquí..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-pink-500 text-white px-4 py-2 rounded-2xl hover:bg-pink-600 transition"
        >
          Enviar
        </button>
      </div>
      {/* Animaciones específicas del chat */}
      <style jsx>{`
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
