// components/MapModern.jsx
import React from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import useScrollReveal from "../components/useScrollReveal";

const Map = () => {
  useScrollReveal();

  return (
    <Section bgColor="bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-900">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna Izquierda - Info */}
          <div className="scroll-reveal-left space-y-6">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                Ubicación
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Visítanos en{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Tucumán
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Estamos en pleno centro de San Miguel de Tucumán,
                listos para atenderte.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Dirección
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Maipú 41 - 3° Piso - Oficina D<br />
                    San Miguel de Tucumán, Tucumán
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Teléfono
                  </h3>
                  <a
                    href="tel:+5493815827168"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    +54 9 381 582-7168
                  </a>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Contacto
                  </h3>
                  <a
                    href="mailto:atavyt@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    atavyt@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Mapa */}
          <div className="scroll-reveal-right">
            <div className="map-container relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
              <iframe
                src="https://maps.google.com/maps?q=Maipú%2041,%20San%20Miguel%20de%20Tucumán&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-96 md:h-[500px]"
                allowFullScreen=""
                loading="lazy"
                title="Mapa ATAVYT"
              ></iframe>
              
              {/* Overlay badge */}
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      ATAVYT
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Oficinas centrales
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Link a Google Maps */}
            <div className="mt-4 text-center">
              <a
                href="https://maps.google.com/?q=Maipú+41,+San+Miguel+de+Tucumán"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Map;