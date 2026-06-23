// context/NewsContext.jsx - ACTUALIZADO PARA USAR GITHUB
import React, { createContext, useContext, useState, useEffect } from "react";
import githubService from "../services/githubService";

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews debe ser usado dentro de NewsProvider");
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar noticias desde GitHub al iniciar
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const news = await githubService.getAllNews();
      setNewsItems(news);
      
      // Guardar copia en localStorage como cache
      localStorage.setItem("atavyt_news_cache", JSON.stringify(news));
    } catch (err) {
      console.error("Error cargando noticias:", err);
      setError(err.message);
      
      // Intentar usar cache de localStorage
      try {
        const cachedNews = localStorage.getItem("atavyt_news_cache");
        if (cachedNews) {
          setNewsItems(JSON.parse(cachedNews));
          console.log("⚠️ Usando datos del cache");
        }
      } catch (cacheErr) {
        console.error("Error cargando cache:", cacheErr);
      }
    } finally {
      setLoading(false);
    }
  };

  // Crear noticia
  const createNews = async (newsData) => {
    try {
      const newNews = await githubService.createNews(newsData);
      
      // Actualizar estado local
      setNewsItems([...newsItems, newNews]);
      
      // Actualizar cache
      localStorage.setItem("atavyt_news_cache", JSON.stringify([...newsItems, newNews]));
      
      return newNews;
    } catch (err) {
      console.error("Error creando noticia:", err);
      throw err;
    }
  };

  // Actualizar noticia
  const updateNews = async (id, newsData) => {
    try {
      await githubService.updateNews(id, newsData);
      
      // Actualizar estado local
      const updatedNews = newsItems.map((news) =>
        news.id === id ? { ...news, ...newsData } : news
      );
      setNewsItems(updatedNews);
      
      // Actualizar cache
      localStorage.setItem("atavyt_news_cache", JSON.stringify(updatedNews));
    } catch (err) {
      console.error("Error actualizando noticia:", err);
      throw err;
    }
  };

  // Eliminar noticia
  const deleteNews = async (id) => {
    try {
      await githubService.deleteNews(id);
      
      // Actualizar estado local
      const updatedNews = newsItems.filter((news) => news.id !== id);
      setNewsItems(updatedNews);
      
      // Actualizar cache
      localStorage.setItem("atavyt_news_cache", JSON.stringify(updatedNews));
    } catch (err) {
      console.error("Error eliminando noticia:", err);
      throw err;
    }
  };

  // Obtener noticia por ID
  const getNewsById = (id) => {
    return newsItems.find((news) => news.id === parseInt(id));
  };

  // Obtener noticias destacadas
  const getFeaturedNews = () => {
    return newsItems.filter((news) => news.featured);
  };

  // Obtener noticias por categoría
  const getNewsByCategory = (category) => {
    if (category === "Todos") return newsItems;
    return newsItems.filter((news) => news.category === category);
  };

  // Recargar noticias desde GitHub
  const refreshNews = async () => {
    await loadNews();
  };

  // Migrar datos desde localStorage a GitHub (una sola vez)
  const migrateToGitHub = async () => {
    try {
      const localData = localStorage.getItem("atavyt_news");
      if (!localData) {
        throw new Error("No hay datos en localStorage para migrar");
      }

      const localNews = JSON.parse(localData);
      
      // Obtener SHA actual si existe
      const { sha } = await githubService.getNewsData();
      
      // Guardar en GitHub
      await githubService.saveNewsData(localNews, sha);
      
      // Actualizar estado
      setNewsItems(localNews);
      
      console.log("✅ Migración completada");
      return { success: true, message: `${localNews.length} noticias migradas` };
    } catch (err) {
      console.error("Error migrando a GitHub:", err);
      throw err;
    }
  };

  const value = {
    newsItems,
    loading,
    error,
    createNews,
    updateNews,
    deleteNews,
    getNewsById,
    getFeaturedNews,
    getNewsByCategory,
    refreshNews,
    migrateToGitHub,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};