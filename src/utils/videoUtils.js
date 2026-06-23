// utils/videoUtils.js
// Detecta la plataforma de un link de video y entrega lo necesario para
// renderizarlo (embed directo para YouTube, blockquote + script oficial
// para Facebook / Instagram / TikTok / X) y para obtener una miniatura
// automática (solo YouTube tiene una API pública y gratuita para esto).

/**
 * Detecta la plataforma a partir de la URL.
 * @param {string} url
 * @returns {"youtube"|"facebook"|"instagram"|"tiktok"|"twitter"|"unknown"}
 */
export const detectVideoPlatform = (url) => {
  if (!url) return "unknown";
  const u = url.toLowerCase();

  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("facebook.com") || u.includes("fb.watch")) return "facebook";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("twitter.com") || u.includes("x.com")) return "twitter";

  return "unknown";
};

/**
 * Extrae el ID de un video de YouTube de cualquier formato de URL común:
 * - https://www.youtube.com/watch?v=ID
 * - https://youtu.be/ID
 * - https://www.youtube.com/embed/ID
 * - https://www.youtube.com/shorts/ID
 */
export const extractYouTubeId = (url) => {
  if (!url) return null;

  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtu\.be\/([^?&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
    /youtube\.com\/shorts\/([^?&\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

/**
 * Devuelve la URL embebible de YouTube, o null si no es un link válido.
 */
export const getYouTubeEmbedUrl = (url) => {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
};

/**
 * Thumbnail oficial de YouTube. maxresdefault no siempre existe (depende
 * de si el subidor generó esa resolución), así que el <img> debe tener
 * un onError que haga fallback a hqdefault (que sí existe siempre).
 */
export const getYouTubeThumbnail = (url, quality = "maxresdefault") => {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
};

export const getYouTubeThumbnailFallback = (url) => {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

/**
 * Resuelve la mejor miniatura DISPONIBLE de un video de YouTube, verificando
 * dimensiones reales (no solo si la URL responde 200, porque YouTube
 * devuelve un placeholder gris de 120x90 con código 200 cuando
 * maxresdefault no existe para ese video).
 *
 * Pensado para usar UNA VEZ al guardar la noticia (no en cada render),
 * para no guardar el placeholder genérico como portada.
 *
 * @returns {Promise<string|null>} URL de la miniatura válida, o null si
 * el video no tiene ID válido.
 */
export const resolveYouTubeThumbnail = (url) => {
  const id = extractYouTubeId(url);
  if (!id) return Promise.resolve(null);

  const PLACEHOLDER_WIDTH = 120;
  const maxres = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const hq = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > PLACEHOLDER_WIDTH) {
        resolve(maxres);
      } else {
        // maxresdefault no existe para este video: hqdefault siempre existe.
        resolve(hq);
      }
    };
    img.onerror = () => resolve(hq);
    img.src = maxres;
  });
};

/**
 * Extrae el ID numérico de un video de TikTok.
 * Formato esperado: https://www.tiktok.com/@usuario/video/1234567890123456789
 * Los links cortos (vm.tiktok.com) no traen el ID en la URL visible, así
 * que en esos casos devolvemos null y el embed se resuelve solo por el
 * atributo cite (funciona, pero sin el id explícito).
 */
export const extractTikTokId = (url) => {
  if (!url) return null;
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
};

/**
 * Valida que el link corresponda a alguna de las plataformas soportadas.
 */
export const isValidVideoUrl = (url) => {
  return detectVideoPlatform(url) !== "unknown";
};

/**
 * Etiqueta legible + color/ícono sugerido por plataforma, útil para el
 * panel de admin (mostrar un badge junto a cada link agregado).
 */
export const platformMeta = {
  youtube: { label: "YouTube", color: "bg-red-600" },
  facebook: { label: "Facebook", color: "bg-blue-600" },
  instagram: { label: "Instagram", color: "bg-pink-600" },
  tiktok: { label: "TikTok", color: "bg-black" },
  twitter: { label: "X / Twitter", color: "bg-gray-900" },
  unknown: { label: "Link no reconocido", color: "bg-gray-400" },
};