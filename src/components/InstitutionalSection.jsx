// components/InstitutionalSection.jsx - VERSIÓN SIN HOOK EXTERNO
import React, { useEffect, useState, useRef } from "react";
import { FaAward, FaHandshake } from "react-icons/fa";
import Container from "../ui/Container";
import Section from "../ui/Section";

const InstitutionalSection = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, members: 0 });

  // IntersectionObserver integrado
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Animación de contadores
  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const yearStep = 40 / steps;
      const memberStep = 54 / steps;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setCounts({
          years: Math.min(Math.round(yearStep * currentStep), 40),
          members: Math.min(Math.round(memberStep * currentStep), 54),
        });

        if (currentStep >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <Section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Badge destacado con mejor contraste en dark mode */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-blue-600 dark:border-blue-400">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-6 rounded-full">
                    <FaAward className="text-white text-6xl" />
                  </div>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                Certificación Oficial
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Reconocidos por el{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Ministerio de Turismo de la Nación
                </span>{" "}
                y certificados como asociación de agencias de viajes legalmente constituidas.
              </p>

              {/* Estadísticas mejoradas para dark mode */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center p-4 bg-blue-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {counts.years}+
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
                    Años de Trayectoria
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {counts.members}+
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
                    Agencias Asociadas
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Red de asociados con mejor contraste */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 animate-pulse" />
                  <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border-2 border-white/20">
                    <FaHandshake className="text-6xl" />
                  </div>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Red de Asociados
              </h3>
              <p className="text-center text-blue-50 text-lg leading-relaxed mb-6">
                Formamos parte de la{" "}
                <span className="font-semibold">
                  Federación de Agencias de Viajes de Argentina (FAEVYT)
                </span>
                , conectando profesionales del turismo a nivel nacional.
              </p>

              <div className="space-y-3">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  <span className="text-blue-50">Networking nacional e internacional</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  <span className="text-blue-50">Capacitaciones especializadas</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  <span className="text-blue-50">Eventos y workshops semestrales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default InstitutionalSection;