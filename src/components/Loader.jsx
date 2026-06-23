// components/LoaderFinal.jsx
import React, { useState, useEffect } from "react";

const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 1000; // 1 segundo
    const steps = 100;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadComplete && onLoadComplete();
            }, 300);
          }, 200);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)'
      }}
    >
      <div className="text-center">
        {/* Bandera Argentina con Sol en el Centro */}
        <div className="relative mb-6">
          <svg
            width="280"
            height="180"
            viewBox="0 0 280 180"
            className="mx-auto drop-shadow-2xl"
          >
            {/* Franja Celeste Superior */}
            <rect
              x="0"
              y="0"
              width="280"
              height="60"
              fill="#74ACDF"
              className="animate-fade-in-down"
              style={{
                opacity: progress > 15 ? 1 : 0,
              }}
            />

            {/* Franja Blanca Central - SIN FONDO */}
            <rect
              x="0"
              y="60"
              width="280"
              height="60"
              fill="none"
              className="animate-fade-in"
              style={{
                opacity: progress > 30 ? 1 : 0,
              }}
            />

            {/* Franja Celeste Inferior */}
            <rect
              x="0"
              y="120"
              width="280"
              height="60"
              fill="#74ACDF"
              className="animate-fade-in-up"
              style={{
                opacity: progress > 20 ? 1 : 0,
              }}
            />

            {/* Definir gradiente para el sol */}
            <defs>
              <radialGradient id="sunGradient">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F6B40E" />
              </radialGradient>
            </defs>

            {/* Sol de Mayo - CENTRADO EN LA BANDERA */}
            <g>
              {/* Círculo central del sol con gradiente */}
              <circle 
                cx="140" 
                cy="90" 
                r={progress > 40 ? "18" : "0"}
                fill="url(#sunGradient)" 
                stroke="#F6B40E" 
                strokeWidth="2"
                style={{
                  transition: "r 0.5s ease-out",
                }}
              />

              {/* Rayos del sol - 16 rayos alternados */}
              {[...Array(16)].map((_, i) => {
                const angle = (i * 360) / 16;
                const isLong = i % 2 === 0;
                const length = isLong ? 28 : 22;
                const x1 = 140;
                const y1 = 90;
                const x2 = 140 + Math.cos((angle * Math.PI) / 180) * length;
                const y2 = 90 + Math.sin((angle * Math.PI) / 180) * length;

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#F6B40E"
                    strokeWidth={isLong ? "3" : "2.5"}
                    strokeLinecap="round"
                    opacity={progress > 50 ? "1" : "0"}
                    style={{
                      transition: `opacity 0.3s ease-out ${i * 0.02}s`,
                    }}
                  />
                );
              })}

              {/* Cara del sol */}
              <g opacity={progress > 60 ? "1" : "0"} style={{ transition: "opacity 0.3s ease-out" }}>
                <circle cx="135" cy="86" r="2" fill="#B45309" />
                <circle cx="145" cy="86" r="2" fill="#B45309" />
                <path
                  d="M 134 94 Q 140 98 146 94"
                  stroke="#B45309"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Texto ATAVYT con efecto brillante */}
        <div className="mb-6">
          <h1
            className="text-5xl font-bold text-white mb-2 tracking-wider"
            style={{
              animation: "fadeInScale 0.6s ease-out forwards",
              animationDelay: "0.5s",
              opacity: 0,
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            ATAVYT
          </h1>
          <p
            className="text-blue-100 text-sm tracking-widest uppercase"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.7s",
              opacity: 0,
            }}
          >
            Asociación Tucumana
          </p>
        </div>

        {/* Barra de progreso mejorada */}
        <div className="w-80 mx-auto">
          <div className="h-2 bg-blue-900/40 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-white to-blue-400 transition-all duration-75 ease-linear rounded-full shadow-lg"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)'
              }}
            />
          </div>
          <p className="text-blue-200 text-sm mt-3 font-semibold">{progress}%</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;