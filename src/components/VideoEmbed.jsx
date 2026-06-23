// components/VideoEmbed.jsx
// Renderiza un video embebido según su plataforma.
// - YouTube: iframe nativo, sin dependencias externas.
// - Facebook / Instagram / TikTok / X: blockquote oficial + carga del
//   script SDK de la plataforma (patrón estándar de embeds oficiales).
import React, { useEffect, useRef } from "react";
import { detectVideoPlatform, getYouTubeEmbedUrl, extractTikTokId } from "../utils/videoUtils";

// Carga un script externo una sola vez (evita duplicar <script> si hay
// varios videos de la misma plataforma en la misma página).
const loadScriptOnce = (src, id) => {
  if (document.getElementById(id)) {
    // Si ya existe, igual reprocesamos los embeds (las libs de FB/Twitter
    // exponen un método para volver a escanear el DOM).
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const VideoEmbed = ({ url, className = "" }) => {
  const platform = detectVideoPlatform(url);
  const containerRef = useRef(null);

  useEffect(() => {
    if (platform === "instagram") {
      loadScriptOnce("https://www.instagram.com/embed.js", "ig-embed-script").then(() => {
        if (window.instgrm) window.instgrm.Embeds.process();
      });
    }

    if (platform === "tiktok") {
      // TikTok no expone una API de re-process documentada y estable, así
      // que el patrón soportado es reinyectar su script para que vuelva a
      // escanear el DOM. Importante: NO removemos el script anterior antes
      // de cargar uno nuevo — si hay varios videos de TikTok en la misma
      // página, remover el script de uno rompía el embed ya renderizado
      // de los demás. En cambio, cada VideoEmbed de TikTok inyecta su
      // propio script con un id único (cache-busted), y los dejamos
      // coexistir; el navegador los descarta solos al desmontar la página.
      const scriptId = `tiktok-embed-script-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      loadScriptOnce(`https://www.tiktok.com/embed.js`, scriptId);
    }

    if (platform === "twitter") {
      loadScriptOnce("https://platform.twitter.com/widgets.js", "twitter-embed-script").then(() => {
        if (window.twttr) window.twttr.widgets.load(containerRef.current);
      });
    }

    if (platform === "facebook") {
      loadScriptOnce(
        "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v19.0",
        "fb-embed-script"
      ).then(() => {
        if (window.FB) window.FB.XFBML.parse(containerRef.current);
      });
    }
  }, [platform, url]);

  if (platform === "youtube") {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (!embedUrl) return null;
    return (
      <div className={`relative w-full ${className}`} style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
          title="YouTube video"
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (platform === "facebook") {
    return (
      <div ref={containerRef} className={`flex justify-center ${className}`}>
        <div
          className="fb-video w-full"
          data-href={url}
          data-width="auto"
          data-show-text="false"
        />
      </div>
    );
  }

  if (platform === "instagram") {
    return (
      <div ref={containerRef} className={`flex justify-center ${className}`}>
        <blockquote
          className="instagram-media w-full"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
        />
      </div>
    );
  }

  if (platform === "tiktok") {
    const tiktokId = extractTikTokId(url);
    return (
      <div ref={containerRef} className={`flex justify-center ${className}`}>
        <blockquote className="tiktok-embed" cite={url} data-video-id={tiktokId || ""}>
          <section></section>
        </blockquote>
      </div>
    );
  }

  if (platform === "twitter") {
    return (
      <div ref={containerRef} className={`flex justify-center ${className}`}>
        <blockquote className="twitter-tweet">
          <a href={url}>Ver publicación</a>
        </blockquote>
      </div>
    );
  }

  // Plataforma no reconocida: mostramos el link tal cual para no perder el contenido.
  return (
    <div className={`p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline break-all"
      >
        {url}
      </a>
    </div>
  );
};

export default VideoEmbed;