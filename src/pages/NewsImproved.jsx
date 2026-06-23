// src/pages/NewsImproved.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";

const NewsImproved = () => {
  const navigate = useNavigate();
  const { newsItems, getFeaturedNews, getNewsByCategory } = useNews();

  const newsCategories = [
    "Todos",
    "Eventos",
    "Capacitación",
    "Turismo Internacional",
    "Turismo Nacional",
    "Transporte",
    "Noticias ATAVYT",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filteredNews, setFilteredNews] = useState([]);
  const [paginatedNews, setPaginatedNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);

  useEffect(() => {
    setFilteredNews(getNewsByCategory(selectedCategory));
    setCurrentPage(1);
  }, [selectedCategory, newsItems]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setPaginatedNews(filteredNews.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage, filteredNews]);

  useEffect(() => {
    setFeaturedNews(getFeaturedNews());
  }, [newsItems]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section Mejorado */}
      <Section bgColor="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <Container className="py-20">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium mb-4 border border-blue-400/30">
              Actualidad
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Noticias del Sector
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
              Información actualizada sobre el sector turístico, eventos de la
              industria y las últimas novedades de ATAVYT.
            </p>
          </div>
        </Container>
      </Section>

      {/* Filtros Mejorados */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 shadow-sm">
        <Container className="py-4">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {newsCategories.map((category, index) => (
              <button
                key={index}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === selectedCategory
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Section bgColor="bg-gray-50 dark:bg-gray-900">
        <Container>
          {/* Noticias Destacadas - Estilo Editorial */}
          {selectedCategory === "Todos" && featuredNews.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1" />
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white px-6">
                  Destacadas
                </h2>
                <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1" />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {featuredNews.slice(0, 2).map((item, index) => (
                  <div
                    key={item.id}
                    className={`group cursor-pointer ${
                      index === 0 ? "lg:row-span-2" : ""
                    }`}
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                      <div
                        className={`relative overflow-hidden ${
                          index === 0 ? "h-96" : "h-64"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {formatDate(item.date)}
                        </div>
                        <h3
                          className={`font-serif font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                            index === 0 ? "text-3xl" : "text-2xl"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
                            index === 0 ? "text-base" : "text-sm line-clamp-2"
                          }`}
                        >
                          {item.excerpt}
                        </p>
                        <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                          Leer más
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid de Noticias - Estilo Newspaper */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                {selectedCategory === "Todos"
                  ? "Últimas Publicaciones"
                  : selectedCategory}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredNews.length} artículo
                {filteredNews.length !== 1 ? "s" : ""}
              </div>
            </div>

            {paginatedNews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedNews.map((item) => (
                  <article
                    key={item.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-semibold rounded-full shadow-lg">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <time dateTime={item.date}>
                            {formatDate(item.date)}
                          </time>
                        </div>
                        <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                          {item.excerpt}
                        </p>
                        <div className="mt-auto flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                          Continuar leyendo
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No hay artículos en esta categoría.
                </p>
              </div>
            )}

            {/* Paginación Mejorada */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === 1
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md"
                    }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md"
                    }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section bgColor="bg-gradient-to-r from-blue-600 to-blue-800">
        <Container>
          <div className="max-w-3xl mx-auto text-center text-white py-12">
            <h3 className="text-3xl font-bold mb-4">
              Mantente Informado
            </h3>
            <p className="text-blue-100 mb-8">
              Recibe las últimas noticias del sector turístico directamente en
              tu correo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Button
                variant="primary"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold shadow-lg"
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default NewsImproved;