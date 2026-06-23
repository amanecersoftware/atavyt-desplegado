// components/VideoThumbnail.jsx
// <img> que intenta maxresdefault.jpg primero (mejor calidad, pero no
// todos los videos la generan) y cae a hqdefault.jpg (siempre existe)
// si la primera falla. Solo aplica a YouTube; el resto de plataformas
// no tienen una API pública/gratuita de thumbnails.
//
// IMPORTANTE: cuando maxresdefault no existe, YouTube no devuelve un 404.
// Devuelve una imagen placeholder gris de 120x90px con código 200 OK,
// así que el evento onError nunca se dispara. Por eso la detección real
// es por dimensión: el placeholder siempre mide 120x90; cualquier
// thumbnail real (hqdefault en adelante) mide 480x360 o más.
import React, { useState, useEffect } from "react";
import { getYouTubeThumbnail, getYouTubeThumbnailFallback } from "../utils/videoUtils";

const PLACEHOLDER_WIDTH = 120;

const VideoThumbnail = ({ url, alt = "", className = "" }) => {
  const [src, setSrc] = useState(() => getYouTubeThumbnail(url));
  const [triedFallback, setTriedFallback] = useState(false);

  // Si la URL del video cambia (ej. al editar otro video en la lista),
  // reiniciamos el intento desde maxresdefault.
  useEffect(() => {
    setSrc(getYouTubeThumbnail(url));
    setTriedFallback(false);
  }, [url]);

  if (!src) return null;

  const handleLoad = (e) => {
    const isPlaceholder = e.target.naturalWidth <= PLACEHOLDER_WIDTH;
    if (isPlaceholder && !triedFallback) {
      setSrc(getYouTubeThumbnailFallback(url));
      setTriedFallback(true);
    }
  };

  const handleError = () => {
    if (!triedFallback) {
      setSrc(getYouTubeThumbnailFallback(url));
      setTriedFallback(true);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default VideoThumbnail;