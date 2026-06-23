import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";
import useScrollReveal from "../components/useScrollReveal";
import useCountUp from "../ui/useCountUp";

const AboutImproved = () => {
  const navigate = useNavigate();
  useScrollReveal();

  // Contadores animados
  const [count40, ref40] = useCountUp(40, 2000);
  const [count150, ref150] = useCountUp(150, 2500);
const [count200, ref200] = useCountUp(200, 2000);
  const [count98, ref98] = useCountUp(98, 1500);

  return (
    <Section bgColor="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container className="relative py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna Izquierda - Stats con números animados */}
          <div className="scroll-reveal-left">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                  Nuestra Trayectoria
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Liderando el{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    turismo tucumano
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Como organización sin fines de lucro, nuestro compromiso es
                  impulsar el crecimiento sostenible del sector turístico de Tucumán.
                </p>
              </div>

              {/* Stats Grid con números animados */}
              <div className="grid grid-cols-2 gap-6">
                <div ref={ref40} className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1 counter-number">
                    {count40}+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Años fortaleciendo el turismo
                  </div>
                </div>

                <div ref={ref150} className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1 counter-number">
                    {count150}+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Agencias asociadas
                  </div>
                </div>

                <div ref={ref200} className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1 counter-number">
                      {count200}+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Eventos organizados
                  </div>
                </div>

                <div ref={ref98} className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1 counter-number">
                    {count98}%
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Satisfacción de socios
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Contenido */}
          <div className="scroll-reveal-right space-y-6">
            {/* Tarjeta de misión */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white p-8 rounded-2xl shadow-2xl">
              <div className="flex items-start mb-4">
              
               
                <div>
                  <h3 className="text-2xl font-bold mb-2">Nuestra Misión</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Defender los intereses y representar a las Agencias de Viajes: tanto a las dedicadas al turismo emisivo, como receptivo o interno, cualquiera resulte su especialización o actividad, como turismo religioso, estudiantil, aventura y otros específicos, tendiendo a la capacitación y profesionalización de los Agentes de Viajes de forma tal de asegurar una excelencia en la prestación de los servicios de turismo para beneficio de las propias empresas y de los usuarios de estos servicios.
                  </p>
                </div>
              </div>
            </div>

            {/* Valores/Características */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Confianza",
                  description: "Respaldo institucional"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: "Capacitación",
                  description: "Formación continua"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Alcance",
                  description: "Presencia nacional"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Profesionalismo",
                  description: "Calidad garantizada"
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
           
          </div>
        </div>
      </Container>
    </Section>
  );
};


export default AboutImproved;