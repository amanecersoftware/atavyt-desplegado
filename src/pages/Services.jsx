// pages/ServicesComplete.jsx
import React from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";
import useScrollReveal from "../components/useScrollReveal";

const Services= () => {
  useScrollReveal();

  const serviceCategories = [
    {
      title: "Para Agencias de Viajes",
      gradient: "from-blue-500 to-blue-600",
      services: [
        {
          title: "Representación Institucional",
          description:
            "Representamos a nuestros asociados ante organismos públicos y privados, defendiendo sus intereses y promoviendo políticas favorables para el sector.",
          icon: (
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          ),
        },
        {
          title: "Capacitación Continua",
          description:
            "Ofrecemos programas de formación para que nuestros asociados se mantengan actualizados con las últimas tendencias, normativas y herramientas del sector.",
          icon: (
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
        },
        {
          title: "Asesoramiento Legal y Normativo",
          description:
            "Brindamos asesoramiento sobre aspectos legales, fiscales y normativos que afectan la operación de las agencias de viajes.",
          icon: (
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
        },
        {
          title: "Networking y Alianzas",
          description:
            "Facilitamos la creación de redes de colaboración entre agencias, operadores turísticos y proveedores de servicios a nivel local, nacional e internacional.",
          icon: (
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Para el Sector Turístico",
      gradient: "from-purple-500 to-purple-600",
      services: [
        {
          title: "Promoción del Destino",
          description:
            "Trabajamos en conjunto con organismos locales y nacionales para promover a Tucumán como destino turístico a nivel nacional e internacional.",
          icon: (
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          title: "Eventos y Ferias",
          description:
            "Organizamos y participamos en eventos, workshops y ferias que contribuyen al desarrollo del turismo y la promoción de nuestros asociados.",
          icon: (
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          title: "Estudio e Investigación",
          description:
            "Realizamos estudios e investigaciones sobre el mercado turístico local y nacional para aportar información valiosa para la toma de decisiones.",
          icon: (
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <Section bgColor="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 text-white">
        <Container className="py-20 scroll-reveal">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              Nuestros Servicios
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Soluciones integrales para{" "}
              <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                tu agencia
              </span>
            </h1>
            <p className="text-xl text-blue-100">
              Conoce cómo trabajamos para fortalecer el sector turístico en Tucumán
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <Section
          key={categoryIndex}
          bgColor={categoryIndex % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
        >
          <Container>
            <div className="scroll-reveal text-center mb-16">
              <div className={`inline-block px-6 py-3 bg-gradient-to-r ${category.gradient} text-white rounded-full text-sm font-semibold mb-6 shadow-lg`}>
                {category.title}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {category.services.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  className={`scroll-reveal delay-${(serviceIndex + 1) * 100} group`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 h-full transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${category.gradient} text-white rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ))}

     
      
     
    </div>
  );
};

export default Services;