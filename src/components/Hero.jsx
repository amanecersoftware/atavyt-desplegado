// components/HeroFinal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import TypingText from "./TypingText";

const Hero = () => {
  const navigate = useNavigate();

  const typingWords = [
    "Conectando destinos",
    "Fortaleciendo el turismo",
    "Profesionalizando el sector",
    "40 años de experiencia",
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-black dark:via-blue-950 dark:to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container className="relative py-20 md:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-blue-200">
                Desde 1984 • 40+ años de trayectoria
              </span>
            </div>

            {/* Main Heading con typing effect */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent block mb-2">
                  Asociación Tucumana
                </span>
                <span className="text-blue-300 block mb-4">
                  de Agencias de Viajes
                </span>
              </h1>
              <div className="h-20 md:h-16">
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  <TypingText 
                    words={typingWords}
                    typingSpeed={100}
                    deletingSpeed={50}
                    delayBetweenWords={2000}
                  />
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 delay-400">
              <button
                onClick={() => navigate("/membership")}
                className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-full font-semibold group inline-flex items-center transform hover:scale-105"
              >
                Asociarse
                <svg
                  className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              <button
                onClick={() => navigate("/about")}
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Conocer más
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 delay-600">
              <div className="group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                  40+
                </div>
                <div className="text-sm text-blue-200">Años de experiencia</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                  150+
                </div>
                <div className="text-sm text-blue-200">Agencias asociadas</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                  100%
                </div>
                <div className="text-sm text-blue-200">Compromiso</div>
              </div>
            </div>
          </div>

          {/* Right Visual - Logo ATAVYT sin fondo */}
          <div className="relative hidden lg:block animate-fade-in delay-200">
            <div className="relative z-10">
              {/* Main Logo Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                <img
                  src="/mnt/user-data/uploads/1769897490543_image.png"
                  alt="ATAVYT Logo"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.src = "/src/assets/images/logoAta.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl animate-float z-20">
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">150+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Miembros activos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 md:h-24 text-white dark:text-gray-900"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;