// components/Partners.jsx - CUADRADOS CLAROS EN DARK MODE
import React, { useRef, useEffect, useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import useScrollReveal from "../hooks/useScrollReveal";
import partner1 from "../assets/images/partner1.png";
import partner2 from "../assets/images/partner2.png";
import partner3 from "../assets/images/partner3.png";
import partner4 from "../assets/images/partner4.png";
import partner5 from "../assets/images/partner5.png";

const Partners = () => {
  useScrollReveal();

  const trackRef = useRef(null);
  const [animationStyle, setAnimationStyle] = useState({
    animationDuration: "20s",
    "--scroll-distance": "-50%",
  });

  const partners = [
    {
      id: 1,
      name: "Ministerio de Turismo",
      logo: partner1,
      url: "https://www.argentina.gob.ar/turismoydeportes",
    },
    {
      id: 2,
      name: "LATAM Airlines",
      logo: partner2,
      url: "https://www.latamairlines.com/ar/es",
    },
    {
      id: 3,
      name: "FIT América Latina",
      logo: partner3,
      url: "https://fit.org.ar/",
    },
    {
      id: 4,
      name: "Gobierno de Tucumán",
      logo: partner4,
      url: "https://www.tucuman.gob.ar/",
    },
    {
      id: 5,
      name: "Ente Tucumán Turismo",
      logo: partner5,
      url: "https://www.tucumanturismo.gob.ar/",
    },
  ];

  // Duplicar partners para efecto infinito
  const duplicatedPartners = [...partners, ...partners];

  // Calcula la animación en base al ancho REAL del set original (no un 50% fijo),
  // y fija una velocidad constante en px/segundo para que se vea igual de
  // rápido en mobile y desktop, sin importar cuántas tarjetas entren en pantalla.
  //
  // IMPORTANTE: no podemos confiar en el evento "load" de window, porque en una
  // SPA el componente casi siempre se monta DESPUÉS de que la página ya cargó,
  // así que ese evento nunca se vuelve a disparar y el cálculo queda hecho con
  // las imágenes todavía sin su ancho real (0px) -> duration muy corta -> el
  // carousel "reinicia" después de pocos logos. Por eso recalculamos cuando
  // cada imagen individual termina de cargar, y además observamos cambios de
  // tamaño del propio track con ResizeObserver como red de seguridad.
  useEffect(() => {
    const PIXELS_PER_SECOND = 60; // velocidad constante, ajustable a gusto

    const calculate = () => {
      if (!trackRef.current) return;

      const fullWidth = trackRef.current.scrollWidth;
      const singleSetWidth = fullWidth / 2;

      if (singleSetWidth <= 0) return;

      const duration = singleSetWidth / PIXELS_PER_SECOND;

      setAnimationStyle({
        animationDuration: `${duration}s`,
        "--scroll-distance": `-${singleSetWidth}px`,
      });
    };

    calculate();

    window.addEventListener("resize", calculate);

    // Recalcular cuando cada <img> dentro del track termina de cargar
    const imgs = trackRef.current
      ? Array.from(trackRef.current.querySelectorAll("img"))
      : [];
    imgs.forEach((img) => {
      if (img.complete) {
        calculate();
      } else {
        img.addEventListener("load", calculate);
      }
    });

    // Red de seguridad: si por lo que sea el ancho del track cambia después
    // (fuentes web cargando, fuentes del navegador, etc.), recalculamos.
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      resizeObserver = new ResizeObserver(() => calculate());
      resizeObserver.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener("resize", calculate);
      imgs.forEach((img) => img.removeEventListener("load", calculate));
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const handlePartnerClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Section bgColor="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
      <Container>
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Alianzas Estratégicas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Aliados
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Trabajamos en conjunto con organizaciones que comparten nuestra
            visión de fortalecer el turismo en Tucumán y la región.
          </p>
        </div>

        {/* Carousel Infinito */}
        <div className="relative overflow-hidden py-8 scroll-reveal delay-200">
          {/* Gradientes laterales para efecto fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 via-gray-50 dark:from-gray-900 dark:via-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 via-gray-50 dark:from-gray-900 dark:via-gray-900 to-transparent z-10" />

          {/* Container del carousel */}
          <div
            ref={trackRef}
            className="flex w-max animate-scroll-left"
            style={animationStyle}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 mx-3 sm:mx-6 group cursor-pointer"
                onClick={() => handlePartnerClick(partner.url)}
              >
                {/* CUADRADOS MÁS CLAROS EN DARK MODE */}
                <div
                  className="
                    partner-card
                    w-40 h-28 sm:w-64 sm:h-40
                    flex items-center justify-center
                    p-5 sm:p-8 rounded-2xl
                    bg-white dark:bg-white
                    border border-gray-100
                    dark:border-gray-200
                    shadow-[0_10px_25px_rgba(0,0,0,0.15)]
                    dark:shadow-[0_12px_45px_rgba(0,0,0,0.65)]
                    hover:-translate-y-2
                    transition-all duration-300
                  "
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 sm:max-h-24 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=3b82f6&color=fff&size=200`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 scroll-reveal delay-400">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ¿Interesado en convertirte en aliado estratégico?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Contáctanos
            <svg
              className="w-5 h-5 ml-2"
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
          </a>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--scroll-distance, -50%));
          }
        }

        .animate-scroll-left {
          animation-name: scroll-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
};

export default Partners;