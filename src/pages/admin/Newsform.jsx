// pages/admin/NewsForm.jsx - VERSION AVANZADA CON DOS MODOS + VIDEOS
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import Container from "../../ui/Container";
import Button from "../../ui/Button";
import VideoThumbnail from "../../components/VideoThumbnail";
import {
  detectVideoPlatform,
  isValidVideoUrl,
  platformMeta,
  resolveYouTubeThumbnail,
} from "../../utils/videoUtils";

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createNews, updateNews, getNewsById } = useNews();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Eventos",
    author: "",
    featured: false,
    imageMode: "gallery",
    images: [],
    videos: [], // [{ url, position }] - máx 3
  });

  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [videoUrlInput, setVideoUrlInput] = useState("");

  const categories = [
    "Eventos",
    "Capacitación",
    "Turismo Internacional",
    "Turismo Nacional",
    "Transporte",
    "Noticias ATAVYT",
  ];

  const MAX_VIDEOS = 3;

  // Forzar modo claro mientras el formulario esté montado
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains("dark");
    html.classList.remove("dark");

    return () => {
      if (hadDark) {
        html.classList.add("dark");
      }
    };
  }, []);

  useEffect(() => {
    if (isEdit) {
      const news = getNewsById(id);
      if (news) {
        setFormData({
          title: news.title,
          excerpt: news.excerpt,
          content: news.content || "",
          category: news.category,
          author: news.author || "",
          featured: news.featured,
          imageMode: news.imageMode || "gallery",
          images: news.images || (news.image ? [{ url: news.image, caption: "", isMain: true, position: 0 }] : []),
          videos: news.videos || [],
        });
      } else {
        navigate("/admin/dashboard");
      }
    }
  }, [id, isEdit, getNewsById, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------- VIDEOS ----------

  const handleAddVideo = () => {
    const url = videoUrlInput.trim();

    if (!url) return;

    if (formData.videos.length >= MAX_VIDEOS) {
      setErrors((prev) => ({ ...prev, videos: `Máximo ${MAX_VIDEOS} videos por noticia` }));
      return;
    }

    if (!isValidVideoUrl(url)) {
      setErrors((prev) => ({
        ...prev,
        videos: "El link debe ser de YouTube, Facebook, Instagram, TikTok o X/Twitter",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      videos: [...prev.videos, { url, position: 0 }],
    }));
    setVideoUrlInput("");
    setErrors((prev) => ({ ...prev, videos: "", images: "" }));
  };

  const handleRemoveVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const handleVideoPositionChange = (index, position) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.map((vid, i) =>
        i === index ? { ...vid, position: parseInt(position) } : vid
      ),
    }));
  };

  // ---------- IMÁGENES ----------

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(file => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} no es una imagen válida`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} supera los 5MB`);
        return false;
      }
      return true;
    });

    const newImageObjects = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
      isMain: formData.images.length === 0 && newImages.length === 0,
      position: formData.imageMode === "integrated" ? 0 : null,
    }));

    setNewImages(prev => [...prev, ...newImageObjects]);
    setErrors(prev => ({ ...prev, images: "" }));
  };

  const handleNewImageCaptionChange = (index, caption) => {
    setNewImages(prev => prev.map((img, i) =>
      i === index ? { ...img, caption } : img
    ));
  };

  const handleExistingImageCaptionChange = (index, caption) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) =>
        i === index ? { ...img, caption } : img
      )
    }));
  };

  const handleNewImagePositionChange = (index, position) => {
    setNewImages(prev => prev.map((img, i) =>
      i === index ? { ...img, position: parseInt(position) } : img
    ));
  };

  const handleExistingImagePositionChange = (index, position) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) =>
        i === index ? { ...img, position: parseInt(position) } : img
      )
    }));
  };

  const setNewImageAsMain = (index) => {
    setNewImages(prev => prev.map((img, i) => ({
      ...img,
      isMain: i === index
    })));
    setFormData(prev => ({
      ...prev,
      images: prev.images.map(img => ({ ...img, isMain: false }))
    }));
  };

  const setExistingImageAsMain = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    }));
    setNewImages(prev => prev.map(img => ({ ...img, isMain: false })));
  };

  const removeNewImage = (index) => {
    setNewImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (prev[index].isMain && updated.length > 0) {
        updated[0].isMain = true;
      }
      return updated;
    });
  };

  const removeExistingImage = (index) => {
    setFormData(prev => {
      const updated = prev.images.filter((_, i) => i !== index);
      if (prev.images[index].isMain && updated.length > 0) {
        updated[0].isMain = true;
      }
      return { ...prev, images: updated };
    });
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImagesArr = [...formData.images];
    const draggedItem = newImagesArr[draggedIndex];
    newImagesArr.splice(draggedIndex, 1);
    newImagesArr.splice(index, 0, draggedItem);

    setFormData(prev => ({ ...prev, images: newImagesArr }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const sortImagesWithMainFirst = (images) => {
    const mainIndex = images.findIndex(img => img.isMain);
    if (mainIndex > 0) {
      const mainImage = images[mainIndex];
      const otherImages = images.filter((_, i) => i !== mainIndex);
      return [mainImage, ...otherImages];
    }
    return images;
  };

  const uploadImagesToCloudinary = async () => {
    if (newImages.length === 0) return [];

    setUploading(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    try {
      const uploadPromises = newImages.map(async (imageObj) => {
        const formDataUpload = new FormData();
        formDataUpload.append("file", imageObj.file);
        formDataUpload.append("upload_preset", uploadPreset);
        formDataUpload.append("folder", "atavyt/news");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formDataUpload }
        );

        if (!response.ok) {
          throw new Error(`Error al subir ${imageObj.file.name}`);
        }

        const data = await response.json();
        return {
          url: data.secure_url,
          caption: imageObj.caption,
          isMain: imageObj.isMain,
          position: imageObj.position,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      return uploadedImages;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Error al subir las imágenes a Cloudinary");
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "El título es obligatorio";
    if (!formData.excerpt.trim()) newErrors.excerpt = "El resumen es obligatorio";
    if (!formData.content.trim()) newErrors.content = "El contenido es obligatorio";

    // La imagen ya NO es obligatoria si hay al menos un video.
    const hasImages = formData.images.length > 0 || newImages.length > 0;
    const hasVideos = formData.videos.length > 0;
    if (!hasImages && !hasVideos) {
      newErrors.images = "Debes subir al menos una imagen o agregar un link de video";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    try {
      const uploadedImages = await uploadImagesToCloudinary();
      let allImages = [...formData.images, ...uploadedImages];

      if (!allImages.some(img => img.isMain) && allImages.length > 0) {
        allImages[0].isMain = true;
      }

      allImages = sortImagesWithMainFirst(allImages);
      let mainImage = allImages.find(img => img.isMain);

      // Si no hay ninguna imagen pero sí hay un video de YouTube, usamos
      // su thumbnail oficial como portada automáticamente. Verificamos
      // que maxresdefault exista de verdad (si no, YouTube devuelve un
      // placeholder gris de 120x90 con código 200, así que hay que
      // chequear la dimensión real antes de guardar la URL).
      let autoThumbnail = null;
      if (!mainImage && formData.videos.length > 0) {
        const firstYouTube = formData.videos.find(
          (v) => detectVideoPlatform(v.url) === "youtube"
        );
        if (firstYouTube) {
          autoThumbnail = await resolveYouTubeThumbnail(firstYouTube.url);
        }
      }

      const newsData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        featured: formData.featured,
        imageMode: formData.imageMode,
        images: allImages,
        videos: formData.videos,
        image: mainImage ? mainImage.url : (allImages[0]?.url || autoThumbnail || ""),
      };

      if (isEdit) {
        updateNews(parseInt(id), newsData);
      } else {
        createNews(newsData);
      }

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error saving news:", error);
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Error al guardar la noticia",
      }));
    } finally {
      setSaving(false);
    }
  };

  const totalImages = formData.images.length + newImages.length;
  const paragraphs = formData.content.split('\n').filter(p => p.trim());
  const paragraphCount = paragraphs.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white shadow-lg">
        <Container className="py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                {isEdit ? "Editar Noticia" : "Nueva Noticia"}
              </h1>
              <p className="text-blue-100 mt-1">
                {isEdit
                  ? "Actualiza la información de la noticia"
                  : "Completa el formulario para crear una nueva noticia"}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard")}
              className="border-white text-white hover:bg-blue-800"
            >
              ← Volver al panel
            </Button>
          </div>
        </Container>
      </div>

      {/* Form */}
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-8"
          >
            {errors.submit && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {errors.submit}
              </div>
            )}

            {/* Título */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Título *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingrese el título de la noticia"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Categoría, Featured y Autor */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Categoría *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Autor <span className="text-gray-500 text-xs">(opcional)</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  placeholder="Nombre del autor"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Destacada
                  </span>
                </label>
              </div>
            </div>

            {/* Resumen */}
            <div className="mb-6">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Resumen *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                  errors.excerpt ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Breve resumen de la noticia"
              ></textarea>
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
              )}
            </div>

            {/* Contenido */}
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contenido Completo *
              </label>
              <textarea
                id="content"
                name="content"
                rows="10"
                value={formData.content}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                  errors.content ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Contenido completo. Usa saltos de línea para separar párrafos."
              ></textarea>
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {formData.content.length} caracteres • {paragraphCount} párrafos
              </p>
            </div>

            {/* VIDEOS */}
            <div className="mb-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-900">
                  🎬 Videos (YouTube, Facebook, Instagram, TikTok, X/Twitter)
                </label>
                <span className="text-xs text-gray-500">{formData.videos.length}/{MAX_VIDEOS}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Opcional. Pegá el link del video y elegí dónde aparecerá en el artículo.
                Si no subís ninguna foto, se usará la miniatura del video como portada (solo para YouTube).
              </p>

              {formData.videos.length < MAX_VIDEOS && (
                <div className="flex gap-2 mb-4">
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddVideo();
                      }
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                  >
                    Agregar
                  </button>
                </div>
              )}

              {errors.videos && (
                <p className="mb-3 text-sm text-red-600">{errors.videos}</p>
              )}

              {formData.videos.length > 0 && (
                <div className="space-y-3">
                  {formData.videos.map((video, index) => {
                    const platform = detectVideoPlatform(video.url);
                    const meta = platformMeta[platform];
                    return (
                      <div
                        key={index}
                        className="flex gap-4 border-2 border-gray-300 bg-white rounded-lg p-4"
                      >
                        {platform === "youtube" ? (
                          <VideoThumbnail
                            url={video.url}
                            alt="Miniatura del video"
                            className="w-32 h-20 object-cover rounded-md flex-shrink-0"
                          />
                        ) : (
                          <div className="w-32 h-20 flex items-center justify-center bg-gray-100 rounded-md flex-shrink-0 text-2xl">
                            🎬
                          </div>
                        )}

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`inline-block px-2 py-0.5 rounded text-white text-xs font-semibold ${meta.color}`}>
                              {meta.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveVideo(index)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Quitar
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{video.url}</p>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Dónde mostrarlo
                            </label>
                            <select
                              value={video.position || 0}
                              onChange={(e) => handleVideoPositionChange(index, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
                            >
                              <option value={0}>Antes del primer párrafo</option>
                              {paragraphs.map((_, pIndex) => (
                                <option key={pIndex + 1} value={pIndex + 1}>
                                  Después del párrafo {pIndex + 1}
                                </option>
                              ))}
                              <option value={paragraphCount + 1}>Al final del artículo</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* MODO DE IMÁGENES */}
            <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-900 mb-4">
                Modo de Visualización de Imágenes *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.imageMode === "gallery"
                    ? "border-blue-600 bg-blue-100"
                    : "border-gray-300 bg-white hover:border-blue-400"
                }`}>
                  <input
                    type="radio"
                    name="imageMode"
                    value="gallery"
                    checked={formData.imageMode === "gallery"}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">📸 Modo Galería</div>
                    <p className="text-sm text-gray-600 mt-1">
                      Todas las imágenes aparecen en una galería al final del artículo.
                      <br /><strong>Ideal para:</strong> Muchas fotos del mismo evento.
                    </p>
                  </div>
                </label>

                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.imageMode === "integrated"
                    ? "border-blue-600 bg-blue-100"
                    : "border-gray-300 bg-white hover:border-blue-400"
                }`}>
                  <input
                    type="radio"
                    name="imageMode"
                    value="integrated"
                    checked={formData.imageMode === "integrated"}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">📄 Modo Integrado</div>
                    <p className="text-sm text-gray-600 mt-1">
                      La imagen principal aparece grande al inicio.<br />
                      Las demás se insertan entre párrafos donde elijas.
                      <br /><strong>Ideal para:</strong> Artículos con imágenes que ilustran cada sección.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Galería de Imágenes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Galería de Imágenes{" "}
                  <span className="text-gray-500 text-xs">
                    (Opcional si agregaste un video • Máximo 10)
                  </span>
                </label>
                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar Imágenes
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    disabled={totalImages >= 10}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {totalImages}/10 imágenes •
                {formData.imageMode === "gallery" ? " Las imágenes aparecerán en galería al final" : ` Posiciona imágenes entre los ${paragraphCount} párrafos`}
              </p>

              {/* Imágenes existentes */}
              {formData.images.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Imágenes actuales (Arrastra para reordenar):
                  </h4>
                  <div className="space-y-4">
                    {formData.images.map((img, index) => (
                      <div
                        key={`existing-${index}`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`border-2 rounded-lg p-4 transition-all cursor-move ${
                          img.isMain
                            ? "border-green-500 bg-green-50"
                            : draggedIndex === index
                            ? "border-blue-500 bg-blue-50 opacity-50"
                            : "border-gray-300 bg-white hover:border-blue-400"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={img.url}
                              alt={img.caption || `Imagen ${index + 1}`}
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                            {img.isMain && (
                              <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                                ⭐ PRINCIPAL
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Epígrafe (opcional)
                              </label>
                              <input
                                type="text"
                                value={img.caption}
                                onChange={(e) => handleExistingImageCaptionChange(index, e.target.value)}
                                placeholder="Descripción de la imagen"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                              />
                            </div>

                            {formData.imageMode === "integrated" && !img.isMain && (
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Posición en el artículo
                                </label>
                                <select
                                  value={img.position || 0}
                                  onChange={(e) => handleExistingImagePositionChange(index, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                                >
                                  <option value={0}>Antes del primer párrafo</option>
                                  {paragraphs.map((_, pIndex) => (
                                    <option key={pIndex + 1} value={pIndex + 1}>
                                      Después del párrafo {pIndex + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {formData.imageMode === "integrated" && img.isMain && (
                              <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-xs text-green-800 font-medium text-center">
                                  ⭐ Esta imagen siempre aparecerá grande al inicio del artículo
                                </p>
                              </div>
                            )}

                            {!img.isMain && (
                              <button
                                type="button"
                                onClick={() => setExistingImageAsMain(index)}
                                className="w-full px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-300 rounded-md text-sm font-medium transition-colors"
                              >
                                ⭐ Marcar como principal
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nuevas imágenes */}
              {newImages.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevas imágenes a subir:
                  </h4>
                  <div className="space-y-4">
                    {newImages.map((img, index) => (
                      <div
                        key={`new-${index}`}
                        className={`border-2 rounded-lg p-4 transition-all ${
                          img.isMain
                            ? "border-green-500 bg-green-50"
                            : "border-blue-300 bg-blue-50"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={img.preview}
                              alt={`Nueva imagen ${index + 1}`}
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                            {img.isMain && (
                              <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                                ⭐ PRINCIPAL
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Epígrafe (opcional)
                              </label>
                              <input
                                type="text"
                                value={img.caption}
                                onChange={(e) => handleNewImageCaptionChange(index, e.target.value)}
                                placeholder="Descripción de la imagen"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                              />
                            </div>

                            {formData.imageMode === "integrated" && !img.isMain && (
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Posición en el artículo
                                </label>
                                <select
                                  value={img.position || 0}
                                  onChange={(e) => handleNewImagePositionChange(index, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                                >
                                  <option value={0}>Antes del primer párrafo</option>
                                  {paragraphs.map((_, pIndex) => (
                                    <option key={pIndex + 1} value={pIndex + 1}>
                                      Después del párrafo {pIndex + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {formData.imageMode === "integrated" && img.isMain && (
                              <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-xs text-green-800 font-medium text-center">
                                  ⭐ Esta imagen siempre aparecerá grande al inicio del artículo
                                </p>
                              </div>
                            )}

                            {!img.isMain && (
                              <button
                                type="button"
                                onClick={() => setNewImageAsMain(index)}
                                className="w-full px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-300 rounded-md text-sm font-medium transition-colors"
                              >
                                ⭐ Marcar como principal
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.images && (
                <p className="mt-2 text-sm text-red-600">{errors.images}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/dashboard")}
                disabled={saving || uploading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={saving || uploading}
              >
                {saving || uploading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {uploading ? "Subiendo imágenes..." : "Guardando..."}
                  </span>
                ) : isEdit ? (
                  "Actualizar Noticia"
                ) : (
                  "Crear Noticia"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default NewsForm;