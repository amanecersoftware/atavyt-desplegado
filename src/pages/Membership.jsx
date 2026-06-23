import React from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";

const Membership = () => {
  const benefits = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Respaldo Institucional",
      description:
        "Tu agencia contará con el respaldo de una institución con casi 40 años de trayectoria en el sector turístico.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Capacitación Continua",
      description:
        "Acceso a cursos, talleres y seminarios especializados para mantener a tu equipo actualizado con las últimas tendencias del mercado.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      title: "Asesoría Legal y Normativa",
      description:
        "Consultoría en aspectos legales, fiscales y normativos específicos del sector turístico para operar con tranquilidad.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Networking Estratégico",
      description:
        "Conexión con proveedores, operadores y otras agencias para establecer alianzas estratégicas y ampliar tu oferta de servicios.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
      title: "Visibilidad y Promoción",
      description:
        "Tu agencia formará parte del directorio oficial de ATAVYT y tendrá presencia en nuestras plataformas digitales y eventos promocionales.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Participación en Eventos",
      description:
        "Acceso preferencial a ferias, workshops y eventos turísticos nacionales e internacionales para expandir tu cartera de clientes.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Solicitud de información",
      description:
        "Haz clic en el botón 'Solicitar asociación' al final de esta sección para completar el formulario de contacto, o comunícate directamente con nosotros para recibir información detallada sobre el proceso de asociación.",
      highlight: true, // Para destacar este paso
    },
    {
      number: "02",
      title: "Presentación de documentación",
      description:
        "Deberás presentar la documentación requerida que acredite la habilitación legal de tu agencia de viajes.",
    },
    {
      number: "03",
      title: "Aprobación de solicitud",
      description:
        "Tu solicitud será evaluada por la Comisión Directiva en la próxima reunión programada.",
    },
    {
      number: "04",
      title: "Bienvenida oficial",
      description:
        "¡Felicidades! Ya eres parte de ATAVYT. Recibirás tu kit de bienvenida y acceso a todos los beneficios.",
    },
  ];

  return (
    <div>
      <Section bgColor="bg-blue-900 text-white">
        <Container className="py-16">
          <h1 className="text-4xl font-bold mb-4">Asociados</h1>
          <p className="text-xl text-blue-100">
            Descubre los beneficios de formar parte de ATAVYT y conoce a
            nuestros miembros.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Beneficios de ser asociado
            </h2>
            <p className="text-gray-600">
              Formar parte de ATAVYT significa acceder a una amplia gama de
              beneficios diseñados para potenciar el crecimiento y
              profesionalización de tu agencia de viajes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bgColor="bg-blue-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Cómo asociarse?
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex ${step.highlight ? 'bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800' : ''}`}
                >
                  <div className={`flex-shrink-0 w-16 h-16 ${step.highlight ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg' : 'bg-blue-600'} text-white rounded-full flex items-center justify-center text-xl font-bold mr-6`}>
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      {step.highlight && (
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                          EMPIEZA AQUÍ
                        </span>
                      )}
                    </div>
                    <p className={`${step.highlight ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div id="solicitar-asociacion" className="mt-12 text-center">
              <Button variant="primary" size="lg">
                Solicitar asociación
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECCIÓN COMENTADA - SE AGREGARÁ EN EL FUTURO CON IMÁGENES Y LINKS A PÁGINAS DE AGENCIAS
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Asociados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estas agencias de viajes forman parte de ATAVYT y comparten
              nuestro compromiso con la calidad y el profesionalismo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-36 bg-gray-200">
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">
                    Agencia de Viajes {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    San Miguel de Tucumán
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="#directorio-asociados" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <span>Ver Directorio Completo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </Container>
      </Section>
      FIN DE SECCIÓN COMENTADA */}

      {/* Directorio de Asociados */}
      <Section id="directorio-asociados" bgColor="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Container className="py-20">
          <div className="scroll-reveal-top text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
              Nuestros Asociados
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Directorio de{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Agencias
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Conoce a las agencias de viajes que forman parte de ATAVYT y llevan el turismo tucumano al siguiente nivel
            </p>
          </div>

          {/* Grid de Asociados Destacados (con web/redes) */}
          <div className="scroll-reveal-bottom mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Agencias Destacadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredAgencies.map((agency, index) => (
                <div
                  key={agency.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Header con Logo */}
                  <div className={`relative h-32 bg-gradient-to-br ${agency.logoColor || 'from-blue-500 to-blue-700'} dark:${agency.logoColor ? agency.logoColor.replace('from-', 'from-').replace('to-', 'to-') : 'from-blue-700 to-blue-900'} flex items-center justify-center p-6 overflow-hidden`}>
                    {/* Patrón decorativo */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                    </div>
                    
                    {/* Logo o inicial */}
                    <div className="relative z-10 flex items-center justify-center">
                      {agency.logo ? (
                        <img 
                          src={agency.logo} 
                          alt={agency.name}
                          className="max-h-20 max-w-[200px] object-contain filter drop-shadow-lg"
                          onError={(e) => {
                            // Si el logo falla, ocultar imagen y mostrar inicial
                            const parent = e.target.parentElement;
                            e.target.style.display = 'none';
                            const fallback = parent.querySelector('.logo-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`logo-fallback ${agency.logo ? 'hidden' : 'flex'} w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center text-white text-3xl font-bold shadow-xl border-2 border-white/30`}
                      >
                        {agency.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {agency.name}
                    </h3>

                    {/* Información de contacto */}
                    <div className="space-y-3 mb-6">
                      {agency.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="line-clamp-2">{agency.address}</span>
                        </div>
                      )}
                      
                      {agency.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{agency.phone}</span>
                        </div>
                      )}

                      {agency.experience && (
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                            {agency.experience}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-2">
                      {agency.website && (
                        <a
                          href={agency.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                        >
                          <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <span>Sitio Web</span>
                        </a>
                      )}
                      
                      {agency.social && (
                        <a
                          href={agency.social}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${agency.website ? 'flex' : 'flex-1'} items-center justify-center gap-2 px-4 py-3 ${agency.website ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-600'} ${agency.website ? 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300' : 'hover:bg-blue-700 text-white'} rounded-xl font-semibold transition-all duration-300 group/btn`}
                        >
                          {agency.socialType === 'instagram' ? (
                            <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          )}
                          {!agency.website && <span>Redes</span>}
                        </a>
                      )}
                      
                      {agency.whatsapp && (
                        <a
                          href={`https://wa.me/${agency.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                          title="WhatsApp"
                        >
                          <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid del resto de agencias (más compacto) */}
          <div className="scroll-reveal-bottom">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Todas las Agencias Asociadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {allAgencies.map((agency, index) => (
                <div
                  key={agency.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                      {agency.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {agency.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Agencia asociada
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="scroll-reveal-bottom mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {featuredAgencies.length + allAgencies.length}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Agencias Asociadas
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-800">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                40+
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Años de Historia
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                100%
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Profesionalismo
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 text-center border border-orange-200 dark:border-orange-800">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                24/7
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Compromiso
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

// Agencias destacadas (con web/redes sociales y/o información completa)
const featuredAgencies = [
  {
    id: 1,
    name: "ABBA TOUR AND MEETING",
    address: "San Lorenzo 475, San Miguel de Tucumán",
    phone: "0381 233-5141",
    whatsapp: "5493815240668",
    email: "info@abba-tour.com",
    website: "https://www.abba-tour.com/#!/-abba-tour-meeting/",
    social: "https://www.instagram.com/abbatourtuc/",
    socialType: "instagram",
    logo: "/logos/abba-tour.png",
    logoColor: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    name: "AGO VIAJES",
    address: "Marcos Paz 194 PB, San Miguel de Tucumán",
    phone: "0381 421-5796",
    whatsapp: "5493814215796",
    website: "https://agoviajes.com.ar",
    logo: "/logos/ago-viajes.png",
    logoColor: "from-sky-500 to-blue-600",
  },
  {
    id: 3,
    name: "ALAS TURISMO",
    website: "https://alasturismo.com",
    logo: "/logos/alas-turismo.png",
    logoColor: "from-indigo-600 to-purple-600",
  },
  {
    id: 4,
    name: "ARQUEZ VIAJES",
    address: "Leandro Araoz 131, Monteros, Tucumán",
    phone: "03863 427-817",
    whatsapp: "5493863427817",
    social: "https://www.facebook.com/arquezviajesyturismo/",
    socialType: "facebook",
    logo: "/logos/arquez-viajes.png",
    logoColor: "from-emerald-600 to-teal-600",
  },
  {
    id: 5,
    name: "ARRIVEDERCI",
    address: "Av. Aconquija 688 - Local 3, Yerba Buena",
    website: "https://arrivederci.ar/",
    social: "https://www.instagram.com/arrivederci.ar/",
    socialType: "instagram",
    logo: "/logos/arrivederci.png",
    logoColor: "from-pink-600 to-rose-600",
  },
  {
    id: 10,
    name: "CAMINO DEL INCA",
    address: "Catamarca 375 PB, San Miguel de Tucumán",
    phone: "0381 421-0660",
    whatsapp: "5493814210660",
    website: "https://www.caminodelincaevt.com.ar/",
    logo: "/logos/camino-del-inca.png",
    logoColor: "from-amber-600 to-orange-600",
  },
  {
    id: 12,
    name: "CAP TRIP",
    phone: "0381 302-3835",
    whatsapp: "5493813023835",
    email: "captrips3@gmail.com",
    logo: "/logos/captrip.png",
    logoColor: "from-teal-600 to-emerald-600",
  },
  {
    id: 13,
    name: "CAROLA TOURS",
    address: "Las Heras 375, San Miguel de Tucumán",
    phone: "0381 431-1479",
    whatsapp: "5493813020331",
    email: "adriana@carolatours.tur.ar",
    logo: "/logos/carola-tours.png",
    logoColor: "from-purple-600 to-violet-600",
  },
  {
    id: 14,
    name: "COLTRAVEL",
    address: "Marcos Paz 428, San Miguel de Tucumán",
    phone: "0381 422-6675",
    whatsapp: "5493814226675",
    website: "https://coltravel.com.ar/",
    logo: "/logos/coltravel.png",
    logoColor: "from-cyan-600 to-blue-600",
  },
  {
    id: 16,
    name: "DECOLLER",
    address: "Salas y Valdez 1852, Yerba Buena",
    phone: "0381 213-2105",
    whatsapp: "5493812132105",
    email: "decoller@decollerviajes.com",
    logo: "/logos/decoller.png",
    logoColor: "from-blue-500 to-indigo-600",
  },
  {
    id: 20,
    name: "LUIS JAPAZE TOURS",
    address: "Cuba 50, San Miguel de Tucumán",
    phone: "0381 504-2555",
    whatsapp: "5493815042555",
    email: "federico@luisjapazetours.com",
    logo: "/logos/japaze-tours.png",
    logoColor: "from-orange-600 to-red-600",
  },
  {
    id: 23,
    name: "JUAN TOSELLI INTERNATIONAL TOURS",
    address: "Salta 78 1°C, San Miguel de Tucumán",
    phone: "0810-888-6735",
    email: "tucuman@juantoselli.com",
    website: "https://www.juantoselli.com",
    logo: "/logos/juan-toselli.png",
    logoColor: "from-slate-600 to-gray-700",
  },
  {
    id: 26,
    name: "JUVENTUS VIAJES",
    address: "Complejo Hotel Hilton Garden Inn (ex Abasto)",
    whatsapp: "54381333-8222",
    email: "tucuman@almundofr.com",
    logo: "/logos/juventus-viajes.png",
    logoColor: "from-green-600 to-emerald-600",
  },
  {
    id: 27,
    name: "KAYANKA TURISMO CULTURAL",
    address: "Crisóstomo Alvarez 1560, San Miguel de Tucumán",
    phone: "0381 433-7080",
    whatsapp: "5493815339609",
    email: "turismokayanka@gmail.com",
    social: "https://www.instagram.com/kayankaturismo/",
    socialType: "instagram",
    logo: "/logos/kayanka.png",
    logoColor: "from-rose-600 to-pink-600",
  },
  {
    id: 32,
    name: "MALU TURISMO",
    address: "Ayacucho 179, San Miguel de Tucumán",
    phone: "0381 547-0906",
    whatsapp: "5493815470906",
    email: "maluuturismo@gmail.com",
    website: "https://www.maluturismo.com",
    social: "https://www.instagram.com/maluevt/",
    socialType: "instagram",
    logo: "/logos/malu-turismo.png",
    logoColor: "from-fuchsia-600 to-purple-600",
  },
  {
    id: 33,
    name: "MATIAS TURISMO",
    address: "Acasuso 75, Local 5, Yerba Buena",
    phone: "0381 322-7755",
    whatsapp: "5493813227755",
    email: "info@matiasturismo.com",
    logo: "/logos/matias-turismo.png",
    logoColor: "from-lime-600 to-green-600",
  },
  {
    id: 34,
    name: "NOROESTE VIAJES",
    address: "Gral. José de San Martín 773, SMT",
    phone: "0381 430-6461",
    whatsapp: "5493815525271",
    email: "licberianoroeste@gmail.com",
    social: "https://www.facebook.com/people/Noroeste-Viajes/100057563315188/",
    socialType: "facebook",
    logo: "/logos/noroeste-viajes.png",
    logoColor: "from-violet-600 to-purple-600",
  },
  {
    id: 35,
    name: "NORTE ADVENTOURS",
    address: "Crisóstomo Alvarez 538, San Miguel de Tucumán",
    phone: "0381 456-2676",
    whatsapp: "5493814562676",
    email: "norteadventours@hotmail.com.ar",
    website: "https://www.norteadventours.tur.ar",
    social: "https://www.facebook.com/norteadventours.turismo/",
    socialType: "facebook",
    logo: "/logos/norte-adventours.png",
    logoColor: "from-emerald-700 to-teal-700",
  },
  {
    id: 37,
    name: "PARME TURISMO",
    address: "San Martín 667 Piso 7 Oficina K, SMT",
    phone: "0381 422-7569",
    whatsapp: "5493814227569",
    email: "parmetursimo@gmail.com",
    logo: "/logos/parme-turismo.png",
    logoColor: "from-sky-600 to-cyan-600",
  },
  {
    id: 38,
    name: "PATSA TURISMO",
    address: "Crisóstomo Álvarez 731 Piso 2° Of. A, SMT",
    phone: "0381 486-2700",
    whatsapp: "5493813936091",
    email: "Patsa@patsa.com.ar",
    logo: "/logos/patsa-turismo.png",
    logoColor: "from-blue-700 to-indigo-700",
  },
  {
    id: 39,
    name: "RYC TURISMO",
    phone: "0381 645-0295",
    whatsapp: "5493816450295",
    email: "rycturweb@gmail.com",
    logo: "/logos/ryc-turismo.png",
    logoColor: "from-red-600 to-orange-600",
  },
  {
    id: 42,
    name: "SAMANÁ TURISMO",
    address: "Las Rosas 1051 - Local 15, Yerba Buena, Tucumán",
    phone: "0381 273-0001",
    whatsapp: "5493812730001",
    social: "https://www.instagram.com/samana.turismo/",
    socialType: "instagram",
    facebook: "https://www.facebook.com/share/1Bwsv4y6vj/",
    logo: "/logos/samana-turismo.png",
    logoColor: "from-teal-600 to-cyan-600",
  },
  {
    id: 47,
    name: "TRAVEL CAR",
    address: "Crisóstomo Álvarez 956, San Miguel de Tucumán",
    phone: "0381 131-85155",
    whatsapp: "5493816442943",
    email: "turismo.travelcar@gmail.com",
    logo: "/logos/travel-car.png",
    logoColor: "from-gray-700 to-slate-700",
  },
  {
    id: 48,
    name: "TRAVEL NOW",
    phone: "0381 503-0491",
    whatsapp: "5493815030491",
    email: "travelnowturismotuc@gmail.com",
    logo: "/logos/travel-now.png",
    logoColor: "from-indigo-700 to-purple-700",
  },
  {
    id: 54,
    name: "ZTUR VIAJES Y TURISMO",
    address: "Corrientes 247, San Miguel de Tucumán",
    phone: "0381 409-7279",
    whatsapp: "5493814097279",
    email: "info@ztur.com.ar",
    website: "https://www.ztur.com.ar",
    logo: "/logos/ztur.png",
    logoColor: "from-cyan-700 to-blue-700",
  },
];

// Resto de agencias asociadas (sin información completa aún)
const allAgencies = [
  { id: 6, name: "ATARAXIA" },
  { id: 7, name: "AURORA TRAVEL" },
  { id: 8, name: "BOEDEANDO YUNGAS" },
  { id: 9, name: "CAMELOT VIAJES Y SERVICIOS" },
  { id: 11, name: "CANDY VIAJES" },
  { id: 15, name: "CVL TURISMO" },
  { id: 17, name: "DUPORT TURISMO" },
  { id: 18, name: "EXDEL TURISMO" },
  { id: 19, name: "HUERGO TRAVEL" },
  { id: 21, name: "JARTRAVEL" },
  { id: 22, name: "JF TURISMO" },
  { id: 24, name: "JUNAZA VIAJES" },
  { id: 25, name: "JUST TRAVEL" },
  { id: 28, name: "KM1000" },
  { id: 29, name: "LECFER VIAJES Y TURISMO" },
  { id: 30, name: "LEVYS TOURS" },
  { id: 31, name: "LIDERA VIAJES" },
  { id: 36, name: "NTS" },
  { id: 40, name: "RAND TOURS" },
  { id: 41, name: "RAVELLO TURISMO" },
  { id: 43, name: "SIWAR TRAVEL" },
  { id: 44, name: "SOL NACIENTE" },
  { id: 45, name: "SOUL BEACH" },
  { id: 46, name: "TAFI TRAVEL" },
  { id: 49, name: "TUCSON TRAVEL" },
  { id: 50, name: "TURISMO COOPERAR" },
  { id: 51, name: "TURISMO DEL TUCUMAN" },
  { id: 52, name: "VENTURANCE" },
  { id: 53, name: "VINCENT TRAVEL" },
];

export default Membership;