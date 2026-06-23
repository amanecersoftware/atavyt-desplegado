import React, { useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { FiDownload, FiFileText, FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import useScrollReveal from "../components/useScrollReveal";

const Statutes = () => {
  useScrollReveal();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalPages = 18;

  const getCurrentPageFile = () => `/documents/Est.Soc.2012-Pag ${currentPage}.pdf`;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const downloadAll = () => {
    for (let i = 1; i <= totalPages; i++) {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = `/documents/Est.Soc.2012-Pag ${i}.pdf`;
        link.download = `Est.Soc.2012-Pag ${i}.pdf`;
        link.click();
      }, i * 200);
    }
  };

  return (
    <Section bgColor="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container className="py-20">
        {/* Header */}
        <div className="scroll-reveal-top text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Marco Normativo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Estatuto{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Social ATAVYT
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Asociación Tucumana de Agencias de Viajes y Turismo - Año 2012
          </p>
        </div>

        {/* Lector de PDF Principal */}
        <div className="scroll-reveal-bottom max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Barra superior */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <div className="flex items-center gap-3 text-white text-sm font-medium">
                <FiFileText className="w-4 h-4" />
                <span>Página {currentPage} de {totalPages}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getCurrentPageFile()}
                  download
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                  title="Descargar página actual"
                >
                  <FiDownload className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                  title="Pantalla completa"
                >
                  <FiMaximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visor de PDF */}
            <div className={`relative bg-gray-100 dark:bg-gray-900 ${isFullscreen ? 'h-screen' : 'h-[600px]'}`}>
              <iframe
                key={currentPage}
                src={getCurrentPageFile()}
                className="w-full h-full"
                title={`Página ${currentPage}`}
              />
              
              {/* Botones de navegación superpuestos */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <FiChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <FiChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Barra de navegación de páginas */}
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-t border-gray-200 dark:border-gray-700">
              {/* Selector de páginas estilo pills */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Navegar por páginas
                </label>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative group px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-110'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                      }`}
                    >
                      {page}
                      
                      {/* Indicador de página actual */}
                      {currentPage === page && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controles adicionales */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                {/* Navegación rápida */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Ir a:
                  </span>
                  <button
                    onClick={() => goToPage(1)}
                    className="px-5 py-2.5 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md"
                  >
                    Primera
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="px-5 py-2.5 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md"
                  >
                    Última
                  </button>
                </div>

                {/* Botón de descarga mejorado */}
                <button
                  onClick={downloadAll}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-5 h-5 relative">
                    <FiDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform absolute" />
                  </div>
                  <span>Descargar Todas las Páginas</span>
                  <div className="px-2 py-0.5 bg-white/20 rounded-md text-xs font-bold">
                    {totalPages}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="scroll-reveal-bottom max-w-4xl mx-auto">
          {/* Nota informativa principal - Más prominente */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-8 relative overflow-hidden">
            {/* Patrón decorativo de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">
                    Estatuto Social ATAVYT
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-lg">
                    Este estatuto fue aprobado en Asamblea General y establece las normas que rigen 
                    el funcionamiento de la Asociación Tucumana de Agencias de Viajes y Turismo. 
                    Es de acceso público y puede ser consultado libremente.
                  </p>
                </div>
              </div>

              {/* Stats en línea */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{totalPages}</div>
                  <div className="text-blue-200 text-sm">Páginas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">2012</div>
                  <div className="text-blue-200 text-sm">Año</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">PDF</div>
                  <div className="text-blue-200 text-sm">Formato</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Acceso Libre</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Consulta y descarga sin restricciones
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Descarga Rápida</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Formato PDF optimizado y ligero
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Documento Oficial</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aprobado en Asamblea General
              </p>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ¿Necesitas más información o tienes consultas sobre el estatuto?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contactar a ATAVYT</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Statutes;