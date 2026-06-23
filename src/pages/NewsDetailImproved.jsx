// pages/NewsDetailImproved.jsx - SOPORTA GALERÍA, INTEGRADO Y VIDEOS
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";
import VideoEmbed from "../components/VideoEmbed";
import ImageLightbox from "../components/ImageLightbox";

// IMPORTANTE: estos dos componentes viven a nivel de módulo (fuera de
// NewsDetailImproved) a propósito. Si se definieran dentro del cuerpo del
// componente, cada actualización de `readingProgress` (que cambia en cada
// pixel de scroll) generaría una función nueva en cada render, y React
// trataría a ImageWithCaption/VideoBlock como un tipo de componente
// distinto al anterior — eso forzaba un desmontaje + remontaje completo
// del iframe de YouTube (o del script de FB/IG/TikTok/X) cada vez que el
// usuario scrolleaba, lo que se veía como "el video se recarga".

// Componente de imagen con epígrafe. Si recibe onClick, se vuelve
// clickeable (cursor zoom-in) para abrir el lightbox.
const ImageWithCaption = ({ img, title, className = "", onClick }) => (
  <figure className={`my-8 ${className}`}>
    <div
      className={`relative rounded-xl overflow-hidden shadow-2xl ${onClick ? "cursor-zoom-in group" : ""}`}
      onClick={onClick}
    >
      <img
        src={img.url}
        alt={img.caption || title}
        className="w-full h-auto"
      />
      {onClick && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6M7 10h6" />
          </svg>
        </div>
      )}
    </div>
    {img.caption && (
      <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic px-4">
        {img.caption}
      </figcaption>
    )}
  </figure>
);

// Wrapper de video para mantener el mismo espaciado que las imágenes
const VideoBlock = ({ video, className = "" }) => (
  <div className={`my-8 ${className}`}>
    <VideoEmbed url={video.url} />
  </div>
);

const NewsDetailImproved = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNewsById, newsItems } = useNews();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  // null = lightbox cerrado; un número = índice de la imagen abierta
  // dentro de `galleryImages` (imagen principal + galería, en orden).
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const newsItem = getNewsById(id);
    if (newsItem) {
      setNews(newsItem);
      
      // Asegurar compatibilidad con noticias antiguas
      if (!newsItem.images || newsItem.images.length === 0) {
        if (newsItem.image) {
          newsItem.images = [{ url: newsItem.image, caption: "", isMain: true, position: 0 }];
        }
      }
      
      // Asegurar que imageMode existe
      if (!newsItem.imageMode) {
        newsItem.imageMode = "gallery";
      }

      // Asegurar que videos existe (compatibilidad con noticias antiguas)
      if (!newsItem.videos) {
        newsItem.videos = [];
      }
      
      const related = newsItems
        .filter(item => item.category === newsItem.category && item.id !== newsItem.id)
        .slice(0, 3);
      setRelatedNews(related);
    } else {
      navigate("/news");
    }
  }, [id, getNewsById, newsItems, navigate]);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = `${news.title} - ATAVYT`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `${news.title} - ATAVYT`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTelegram = () => {
    const url = window.location.href;
    const text = `${news.title} - ATAVYT`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado al portapapeles!');
  };

  // Estos useMemo deben ejecutarse SIEMPRE, en el mismo orden, en cada
  // render — incluso mientras `news` todavía es null (durante la carga
  // inicial). Por eso van ANTES del early-return de abajo, y manejan el
  // caso `news === null` devolviendo un array vacío en lugar de fallar.
  // Moverlos después del return rompía las Rules of Hooks: React detectaba
  // un número distinto de hooks entre el render de "cargando" (sin estos
  // useMemo) y el render con la noticia ya cargada (con ellos), lo cual
  // tira "Rendered more hooks than during the previous render".
  const paragraphs = useMemo(
    () => (news ? news.content.split('\n').filter(p => p.trim()) : []),
    [news]
  );

  // Lista plana de TODAS las imágenes del artículo, en el orden en que se
  // muestran (principal primero, después el resto), para el lightbox.
  // Es independiente del modo de visualización: tanto si las imágenes
  // están intercaladas en el texto como si van en la grilla de galería,
  // el lightbox navega por esta misma lista completa.
  const galleryImages = useMemo(() => {
    if (!news) return [];
    const imgs = news.images || [];
    const main = imgs.find((img) => img.isMain) || imgs[0];
    const rest = imgs.filter((img) => img !== main);
    return main ? [main, ...rest] : rest;
  }, [news]);

  const openLightbox = useCallback(
    (img) => {
      const index = galleryImages.findIndex((g) => g === img);
      setLightboxIndex(index >= 0 ? index : 0);
    },
    [galleryImages]
  );

  // Contenido memoizado: se recalcula SOLO cuando cambia la noticia, nunca
  // por `readingProgress` (que cambia en cada scroll). Esto es lo que evita
  // que los iframes/embeds de video se desmonten y remonten al scrollear.
  const articleContent = useMemo(() => {
    if (!news) return [];

    const images = news.images || [];
    const videos = news.videos || [];

    if (news.imageMode === "integrated") {
      // MODO INTEGRADO: Imágenes y videos entre párrafos (EXCEPTO LA IMAGEN PRINCIPAL)
      const contentWithMedia = [];

      paragraphs.forEach((paragraph, pIndex) => {
        // Imágenes que van ANTES de este párrafo (position === pIndex y NO son principales)
        const imagesBefore = images.filter(img => img.position === pIndex && !img.isMain);
        imagesBefore.forEach((img, imgIndex) => {
          contentWithMedia.push(
            <ImageWithCaption
              key={`img-before-${pIndex}-${imgIndex}`}
              img={img}
              title={news.title}
              className="max-w-4xl mx-auto"
              onClick={() => openLightbox(img)}
            />
          );
        });

        // Videos que van ANTES de este párrafo (position === pIndex)
        const videosBefore = videos.filter(video => video.position === pIndex);
        videosBefore.forEach((video, vidIndex) => {
          contentWithMedia.push(
            <VideoBlock
              key={`video-before-${pIndex}-${vidIndex}`}
              video={video}
              className="max-w-3xl mx-auto"
            />
          );
        });

        // Agregar el párrafo
        contentWithMedia.push(
          <p
            key={`p-${pIndex}`}
            className="text-gray-800 dark:text-gray-200 mb-6 leading-relaxed text-lg font-serif"
          >
            {paragraph}
          </p>
        );
      });

      // Imágenes que van DESPUÉS del último párrafo (NO principales)
      const imagesAfter = images.filter(img => img.position >= paragraphs.length && !img.isMain);
      imagesAfter.forEach((img, imgIndex) => {
        contentWithMedia.push(
          <ImageWithCaption
            key={`img-after-${imgIndex}`}
            img={img}
            title={news.title}
            className="max-w-4xl mx-auto"
            onClick={() => openLightbox(img)}
          />
        );
      });

      // Videos que van DESPUÉS del último párrafo (incluye "al final del artículo")
      const videosAfter = videos.filter(video => video.position >= paragraphs.length);
      videosAfter.forEach((video, vidIndex) => {
        contentWithMedia.push(
          <VideoBlock
            key={`video-after-${vidIndex}`}
            video={video}
            className="max-w-3xl mx-auto"
          />
        );
      });

      return contentWithMedia;
    } else {
      // MODO GALERÍA: texto seguido, videos según su posición elegida igualmente,
      // imágenes adicionales al final (en la sección de Galería más abajo).
      const contentWithVideos = [];

      paragraphs.forEach((paragraph, pIndex) => {
        const videosBefore = videos.filter(video => video.position === pIndex);
        videosBefore.forEach((video, vidIndex) => {
          contentWithVideos.push(
            <VideoBlock
              key={`video-before-${pIndex}-${vidIndex}`}
              video={video}
              className="max-w-3xl mx-auto"
            />
          );
        });

        contentWithVideos.push(
          <p
            key={`p-${pIndex}`}
            className="text-gray-800 dark:text-gray-200 mb-6 leading-relaxed text-lg font-serif"
          >
            {paragraph}
          </p>
        );
      });

      const videosAfter = videos.filter(video => video.position >= paragraphs.length);
      videosAfter.forEach((video, vidIndex) => {
        contentWithVideos.push(
          <VideoBlock
            key={`video-after-${vidIndex}`}
            video={video}
            className="max-w-3xl mx-auto"
          />
        );
      });

      return contentWithVideos;
    }
  }, [news, paragraphs, openLightbox]);

  // El early-return va DESPUÉS de todos los hooks (useState, useEffect,
  // useMemo, useCallback), nunca antes — así el número y orden de hooks
  // es idéntico en todos los renders, cumpliendo las Rules of Hooks.
  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  const images = news.images || [];
  const mainImage = images.find(img => img.isMain) || images[0];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Container className="py-3">
          <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => navigate("/")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Inicio
            </button>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <button
              onClick={() => navigate("/news")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Noticias
            </button>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{news.category}</span>
          </nav>
        </Container>
      </div>

      {/* Article Header */}
      <Section bgColor="bg-white dark:bg-gray-900" py="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase rounded">
                {news.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {news.title}
            </h1>

            {/* Excerpt en recuadro celeste */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 p-6 mb-6">
              <p className="text-xl text-gray-800 dark:text-gray-200 font-serif leading-relaxed">
                {news.excerpt}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={news.date}>{formatDate(news.date)}</time>
              </div>

              {news.author && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Por {news.author}</span>
                  </div>
                </>
              )}

              {news.featured && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-yellow-600">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm font-semibold">Destacado</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Image - SIEMPRE SE MUESTRA SI EXISTE (en ambos modos) */}
      {mainImage && (
        <Section bgColor="bg-white dark:bg-gray-900" py="py-0">
          <Container>
            <div className="max-w-5xl mx-auto mb-8">
              <ImageWithCaption
                img={mainImage}
                title={news.title}
                onClick={() => openLightbox(mainImage)}
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Compartir en redes (Sticky) */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg dark:shadow-gray-900 p-3 space-y-3">
          <button
            onClick={shareOnFacebook}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110"
            title="Compartir en Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </button>

          <button
            onClick={shareOnTwitter}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-all hover:scale-110"
            title="Compartir en Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </button>

          <button
            onClick={shareOnWhatsApp}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-110"
            title="Compartir en WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>

          <button
            onClick={shareOnLinkedIn}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-all hover:scale-110"
            title="Compartir en LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>

          <button
            onClick={shareOnTelegram}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all hover:scale-110"
            title="Compartir en Telegram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </button>

          <button
            onClick={copyLink}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-all hover:scale-110"
            title="Copiar enlace"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Article Content */}
      <Section bgColor="bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Contenido del artículo (incluye imágenes y videos intercalados) */}
            <article className="prose prose-lg max-w-none">
              {articleContent}
            </article>

            {/* Galería de imágenes adicionales (solo en modo galería) */}
            {news.imageMode === "gallery" && images.length > 1 && (
              <div className="my-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Galería de imágenes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.filter(img => !img.isMain).map((img, index) => (
                    <figure key={index} className="group">
                      <div
                        className="relative overflow-hidden rounded-lg cursor-zoom-in"
                        onClick={() => openLightbox(img)}
                      >
                        <img
                          src={img.url}
                          alt={img.caption || `Imagen ${index + 1}`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6M7 10h6" />
                          </svg>
                        </div>
                      </div>
                      {img.caption && (
                        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                Temas relacionados
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  {news.category}
                </span>
                <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  Turismo
                </span>
                <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  ATAVYT
                </span>
              </div>
            </div>

            {/* Share Section Mobile */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 lg:hidden">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Compartir este artículo
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  onClick={shareOnFacebook}
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </button>
                
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center justify-center px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </button>
                
                <button
                  onClick={shareOnWhatsApp}
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </button>

                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center justify-center px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>

                <button
                  onClick={shareOnTelegram}
                  className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </button>

                <button
                  onClick={copyLink}
                  className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedNews.length > 0 && (
        <Section bgColor="bg-gray-100 dark:bg-gray-800">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-10">
                Artículos Relacionados
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedNews.map((item) => (
                  <article
                    key={item.id}
                    className="group cursor-pointer bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      navigate(`/news/${item.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image || (item.images && item.images[0]?.url) || ""}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDateShort(item.date)}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Leer artículo
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Back to News CTA */}
      <Section bgColor="bg-white dark:bg-gray-900">
        <Container>
          <div className="text-center py-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/news")}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300"
            >
              ← Ver todas las noticias
            </Button>
          </div>
        </Container>
      </Section>

      {/* Lightbox: se puede abrir desde la imagen principal, desde las
          imágenes intercaladas en el contenido, o desde la grilla de
          galería — todas comparten la misma lista (galleryImages) y por
          eso se puede navegar entre TODAS las imágenes del artículo sin
          importar desde cuál se entró. */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default NewsDetailImproved;