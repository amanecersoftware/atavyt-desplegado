// components/ImageLightbox.jsx
// Lightbox a pantalla completa para ver imágenes en detalle.
// - Se abre desde cualquier imagen pasándole el índice inicial.
// - Navega con flechas (desktop, click o teclado) y swipe (mobile/touch).
// - Cierra con click en el fondo, botón X, o tecla Escape.
// - Bloquea el scroll del body mientras está abierto.
import React, { useEffect, useCallback, useRef, useState } from "react";

// Distancia mínima de swipe (px) para considerar que fue un gesto de
// cambio de imagen y no un toque accidental.
const SWIPE_THRESHOLD = 50;

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  // Controla una pequeña animación de transición al cambiar de imagen.
  const [isAnimating, setIsAnimating] = useState(false);

  const total = images.length;
  const current = images[currentIndex];

  const goNext = useCallback(() => {
    setIsAnimating(true);
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  const goPrev = useCallback(() => {
    setIsAnimating(true);
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  // Bloquear scroll del body mientras el lightbox está abierto.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Navegación y cierre por teclado.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  // Reset breve de la animación al cambiar de índice.
  useEffect(() => {
    if (!isAnimating) return;
    const timeout = setTimeout(() => setIsAnimating(false), 200);
    return () => clearTimeout(timeout);
  }, [isAnimating, currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) {
        goNext(); // swipe izquierda -> siguiente
      } else {
        goPrev(); // swipe derecha -> anterior
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imágenes"
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Cerrar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Contador */}
      {total > 1 && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* Flecha anterior (oculta en mobile, ahí se usa swipe) */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Imagen anterior"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Flecha siguiente (oculta en mobile, ahí se usa swipe) */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Imagen siguiente"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Imagen + epígrafe + indicación de swipe en mobile */}
      <div
        className="relative w-full h-full flex items-center justify-center px-4 py-16 sm:px-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-full max-h-full flex flex-col items-center">
          <img
            src={current.url}
            alt={current.caption || ""}
            className={`max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg select-none transition-opacity duration-200 ${
              isAnimating ? "opacity-60" : "opacity-100"
            }`}
            draggable={false}
          />
          {current.caption && (
            <p className="mt-4 text-center text-white/80 text-sm sm:text-base max-w-2xl px-4">
              {current.caption}
            </p>
          )}
        </div>
      </div>

      {/* Indicación de swipe, solo visible en mobile */}
      {total > 1 && (
        <div className="sm:hidden absolute bottom-4 left-0 right-0 flex justify-center">
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs">
            Deslizá para ver más imágenes
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;