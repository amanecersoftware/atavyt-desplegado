// components/TravelNews.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";

const TravelNews = () => {
  const navigate = useNavigate();
  const { newsItems } = useNews();
  const [displayedNews, setDisplayedNews] = useState([]);

  // Obtener las 3 noticias más recientes
  useEffect(() => {
    const sortedNews = [...newsItems].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setDisplayedNews(sortedNews.slice(0, 3));
  }, [newsItems]);

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Section bgColor="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Actualidad
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Noticias del{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Sector
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Mantente al día con las últimas novedades del turismo en Tucumán y el mundo.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayedNews.map((item, index) => (
            <div
              key={item.id}
              className="group"
            >
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute bottom-4 right-4">
                    <span
                      className="px-3 py-1 backdrop-blur-sm text-xs font-medium rounded-full shadow-lg"
                      style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#111827' }}
                    >
                      {formatDate(item.date)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-1">
                    {item.excerpt}
                  </p>
                  
                  {/* Button - Always at bottom */}
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/news/${item.id}`)}
                      className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg"
                    >
                      Leer más
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/news")}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Ver todas las noticias
            <svg
              className="inline-block ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default TravelNews;