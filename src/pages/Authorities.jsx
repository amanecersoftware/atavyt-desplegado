import React, { useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import useScrollReveal from "../components/useScrollReveal";

const Authorities = () => {
  useScrollReveal();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const authoritiesData = [
    {
      id: "comision-directiva",
      title: "Comisión Directiva",
      members: [
        { position: "Presidente", name: "Jorge Javier Acosta", agency: "KM1000" },
        { position: "Vice Presidente", name: "Paula M. Gómez Fuentes", agency: "EXDEL TURISMO" },
        { position: "Secretario", name: "María de los Angeles Vigo", agency: "CAMELOT VIAJES" },
        { position: "Tesorero", name: "Jorge Ponce Andole", agency: "LIDERA TURISMO" },
        { position: "Pro Tesorero", name: "Maximiliano Paz", agency: "JUST TRAVEL" },
        { position: "Vocal Titular 1°", name: "Beria Khrata", agency: "NOROESTE VIAJES" },
        { position: "Vocal Titular 2°", name: "Jorge Gabarain", agency: "CVL" },
        { position: "Vocal Titular 3°", name: "Federico Japaze", agency: "LUIS JAPAZE TOURS" },
        { position: "Vocal Suplente 1°", name: "José Sosa Luna", agency: "TUCSON TRAVEL" },
        { position: "Vocal Suplente 2°", name: "Sebastián Guchea", agency: "ZTUR" },
        { position: "Vocal Suplente 3°", name: "Daniel Peralta", agency: "NORTE ADVENTOURS VIAJES Y TURISMO" }
      ]
    },
    {
      id: "organo-fiscalizacion",
      title: "Órgano de Fiscalización",
      members: [
        { position: "Titular", name: "Mario Weber", agency: "CAMINO DEL INCA VIAJES Y TURISMO" },
        { position: "Suplente", name: "Tomás Ogas", agency: "AGO VIAJES" }
      ]
    },
    {
      id: "tribunal-conducta",
      title: "Tribunal de Conducta y Disciplina",
      members: [
        { position: "Miembro 1°", name: "Adriana Tejerizo", agency: "CAROLA TOURS" },
        { position: "Miembro 2°", name: "Luis Gamboa", agency: "JUNAZA VIAJES Y TURISMO" },
        { position: "Miembro 3°", name: "Eduardo Carlino", agency: "TRAVEL CAR" }
      ]
    }
  ];

  return (
    <Section bgColor="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container className="py-20">
        {/* Header */}
        <div className="scroll-reveal-top text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Nuestra Organización
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Autoridades{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              ATAVYT
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Conoce a las autoridades que lideran nuestra asociación y trabajan incansablemente 
            por el desarrollo del sector turístico de Tucumán.
          </p>
        </div>

        {/* Accordions */}
        <div className="scroll-reveal-bottom max-w-5xl mx-auto space-y-4">
          {authoritiesData.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
            >
              {/* Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all duration-300"
              >
                <h2 className="text-xl md:text-2xl font-bold">
                  {section.title}
                </h2>
                <div className="text-white">
                  {openSection === section.id ? (
                    <FiChevronUp className="w-6 h-6 transform transition-transform duration-300" />
                  ) : (
                    <FiChevronDown className="w-6 h-6 transform transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Content */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openSection === section.id
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                  <div className="grid gap-4">
                    {section.members.map((member, index) => (
                      <div
                        key={index}
                        className="group p-6 bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                                {member.position}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {member.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                              {member.agency}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info adicional */}
        <div className="scroll-reveal-bottom mt-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Compromiso y Dedicación
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Nuestras autoridades son elegidas democráticamente por los asociados y trabajan 
                  de manera honoraria para impulsar el desarrollo sostenible del turismo en Tucumán.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Authorities;