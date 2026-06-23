// components/HeroImproved.jsx - LOGO VISIBLE EN DARK MODE
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import logoAta from "../assets/images/logoAta.png";

const AnimatedLogo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 1800);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      {/* Logo Container - FONDO BLANCO FORZADO */}
      <div 
        className={`logo-card-white relative z-10 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-gray-200 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ backgroundColor: '#ffffff' }}
      >
        <img
          src={logoAta}
          alt="ATAVYT - Asociación Tucumana de Agencias de Viajes y Turismo"
          className="relative z-10 w-full h-auto"
        />
      </div>
    </div>
  );
};

const HeroImproved = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1800);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-400/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s' }} />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-300/5 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"
             style={{ animationDelay: "1s", animationDuration: '6s' }} />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e908_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e908_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0ea5e918_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e918_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container className="relative py-12 md:py-20 w-full">
        <div 
          className={`grid lg:grid-cols-2 gap-12 md:gap-16 items-center transition-opacity duration-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Left Content - Texto Principal */}
          <div className="space-y-8 order-1 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
              <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                Desde 1984 • 40+ años de trayectoria
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400 bg-clip-text text-transparent block">
                  Conectando destinos,
                </span>
                <span className="text-blue-800 dark:text-blue-300 block mt-2">
                  fortaleciendo el turismo
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                Profesionalizamos el sector turístico en Tucumán desde hace
                cuatro décadas, promoviendo la excelencia y el crecimiento
                sostenible.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate("/membership")}
                className="bg-blue-900 dark:bg-blue-600 text-white hover:bg-blue-800 dark:hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-full font-semibold group inline-flex items-center transform hover:scale-105"
              >
                Asociarse ahora
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
                className="border-2 border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-400 hover:bg-blue-900 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Conocer más
              </button>
            </div>

            {/* Badges informativos */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Certificación Oficial</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Red de Asociados</span>
              </div>
            </div>
          </div>

          {/* Right Content - Logo */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-2">
            <AnimatedLogo />
          </div>
        </div>
      </Container>

      {/* Bottom Wave - Suave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 md:h-20 text-white dark:text-gray-900"
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

export default HeroImproved;