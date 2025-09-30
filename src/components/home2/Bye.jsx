import React, { useRef, useEffect, useState } from "react";

const videoSrc = '02.mp4';
const RomanticVideoWithHearts = () => {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);

    const heartEmojis = ["❤️","💖","💗","💕","💞","💘","💝"];
    const heartsCount = Math.min(50, Math.floor(width / 20));
    const hearts = Array.from({ length: heartsCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 24 + Math.random() * 36,
      speed: 0.2 + Math.random() * 1,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.05,
      bounce: Math.random() * 0.5 + 0.2,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      scale: 1 + Math.random() * 0.5,
      scaleDir: Math.random() > 0.5 ? 0.01 : -0.01,
      glow: 15 + Math.random() * 15
    }));

    const particlesCount = Math.min(80, Math.floor(width / 15));
    const particles = Array.from({ length: particlesCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 3,
      speed: 0.1 + Math.random() * 0.3,
      alpha: 0.2 + Math.random() * 0.5
    }));

    const drawHeart = (h) => {
      ctx.save();
      ctx.shadowColor = "pink";
      ctx.shadowBlur = h.glow;
      ctx.translate(h.x, h.y);
      ctx.rotate(h.angle);
      ctx.font = `${h.size * h.scale}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(h.emoji, 0, 0);
      ctx.restore();
    };

    let animationFrame;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.002;
      const glowAlpha = 0.3 + Math.sin(time) * 0.25;

      // Overlay ligero para destacar corazones sobre el video
      ctx.fillStyle = `rgba(255,192,203,0.2)`;
      ctx.fillRect(0, 0, width, height);

      // Partículas
      particles.forEach(p => {
        const dx = (mouse.x - p.x) * 0.002;
        const dy = (mouse.y - p.y) * 0.002;
        p.x += dx;
        p.y += dy - p.speed;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      // Corazones
      hearts.forEach(h => {
        h.y -= h.speed;
        h.angle += h.spin;
        h.y += Math.sin(time + h.x) * h.bounce;
        h.scale += h.scaleDir;
        if (h.scale > 1.5 || h.scale < 0.8) h.scaleDir *= -1;
        if (h.y < -50) h.y = height + 50;
        drawHeart(h);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse]);

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Video de fondo */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Canvas sobre el video */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" />

      {/* Texto centrado */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 animate-pulse">
          Gracias Por Estar Aquí
        </h1>
        <p className="text-white text-xl sm:text-2xl md:text-3xl italic max-w-2xl mx-auto">
          Cada momento contigo es un tesoro,<br />
          cada sonrisa tuya ilumina mi mundo.<br />
          Siempre serás mi inspiración y mi corazón.
        </p>
      </div>
    </div>
  );
};

export default RomanticVideoWithHearts;
