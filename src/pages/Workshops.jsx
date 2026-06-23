// pages/Workshops.jsx
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaFileDownload, FaWhatsapp, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Loader from "../components/Loader";

const Workshops = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado correctamente. Pronto nos pondremos en contacto contigo.");
    setFormData({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5493815827168?text=Hola,%20me%20interesa%20información%20sobre%20el%20próximo%20Workshop", "_blank");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900">
      {/* Hero Section */}
      <Section className="pt-24 pb-12">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Workshops <span className="text-blue-600 dark:text-blue-400">ATAVYT</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Espacio de encuentro entre prestadores turísticos, operadores y destinos para fortalecer el turismo en Tucumán y la región
            </p>
          </div>
        </Container>
      </Section>

      {/* Latest Workshop */}
      <Section className="py-12">
        <Container>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div>
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Próxima Edición
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  39° Workshop ATAVYT Tucumán
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  ¡Bienvenidos! Es un placer invitarlos a al 39° Edición del Workshop ATAVYT. Este evento reúne a prestadores turísticos, operadores y destinos en un espacio enriquecedor de aprendizaje y colaboración.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaCalendarAlt className="text-blue-600 dark:text-blue-400 mr-3 text-xl" />
                    <span className="font-semibold">Próximamente - 2025</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 mr-3 text-xl" />
                    <span>Hotel Hilton Garden Inn, Tucumán</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://atavytweb.com.ar/gestor/wp-content/uploads/2024/03/Atavyt_Workshop_38_Mesa-de-trabajo-1.png"
                  alt="Workshop ATAVYT"
                  className="rounded-2xl shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Haciendo Historia */}
      <Section className="py-12">
        <Container>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Haciendo Historia</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg mb-4 text-blue-50">
                  Desde 1984, ATAVYT organiza workshops semestrales que se han convertido en eventos clave para el sector turístico de Tucumán. Con más de 40 años de trayectoria, estos encuentros han reunido a miles de profesionales del turismo.
                </p>
                <p className="text-lg text-blue-50">
                  Cada edición representa una oportunidad única para establecer nuevas alianzas comerciales, descubrir destinos innovadores y fortalecer la red de contactos profesionales en la industria turística.
                </p>
              </div>
              <div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4">En cifras</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-blue-100">Ediciones realizadas:</span>
                      <span className="text-2xl font-bold">38+</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-blue-100">Años de trayectoria:</span>
                      <span className="text-2xl font-bold">40+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Stands promedio:</span>
                      <span className="text-2xl font-bold">50+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Reglamento */}
      <Section className="py-12">
        <Container>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Reglamento</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Requisitos Generales</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Presentación de tarjeta personal indispensable para acreditación</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Ser miembro activo de ATAVYT o agencia registrada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Cumplir con los horarios establecidos del evento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Respetar el espacio asignado para cada stand</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Servicios Incluidos</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Lunch para todos los participantes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Coffee breaks durante el evento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Material promocional y credenciales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">•</span>
                    <span>Acceso a todas las actividades de networking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <a
                href="https://atavytweb.com.ar/gestor/wp-content/uploads/2023/02/REGLAMENTO_WORKSHOP_ABRIL_2023.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaFileDownload className="mr-3 text-xl" />
                Descargar Reglamento Completo
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Precio / Contacto */}
      <Section className="py-12">
        <Container>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">¿Interesado en participar?</h2>
              <p className="text-xl text-gray-300">
                Contáctanos para conocer los precios y disponibilidad de stands
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <button
                onClick={handleWhatsApp}
                className="flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaWhatsapp className="text-5xl mb-3" />
                <span className="text-lg font-semibold">WhatsApp</span>
                <span className="text-sm text-green-100">+54 9 381 582-7168</span>
              </button>

              <a
                href="mailto:atavyt@gmail.com"
                className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaEnvelope className="text-5xl mb-3" />
                <span className="text-lg font-semibold">Email</span>
                <span className="text-sm text-blue-100">atavyt@gmail.com</span>
              </a>

              <a
                href="tel:+5493815827168"
                className="flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaPhoneAlt className="text-5xl mb-3" />
                <span className="text-lg font-semibold">Teléfono</span>
                <span className="text-sm text-purple-100">+54 9 381 582-7168</span>
              </a>
            </div>

            {/* Formulario de Contacto */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                O déjanos tu mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Empresa / Agencia"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Mensaje"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Enviar Consulta
                </button>
              </form>
            </div>
          </div>
        </Container>
      </Section>


{/* Galería de Workshops Anteriores */}
<Section className="py-12 pb-20 bg-gray-50 dark:bg-gray-800/50">
  <Container>
    <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
      Workshops Anteriores
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { 
          edition: "38°", 
          date: "Abril 2024", 
          image: "https://sedetucuman.com.ar/gestor/wp-content/uploads/2024/03/Atavyt_Workshop_38_Mesa_de_trabajo_1-600x600.png",
          color: "from-blue-600 to-blue-800"
        },
        { 
          edition: "37°", 
          date: "Septiembre 2023", 
          image: "https://sedetucuman.com.ar/gestor/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-07-at-16.40.31-600x600.jpeg",
          color: "from-blue-500 to-blue-700"
        },
        { 
          edition: "36°", 
          date: "Abril 2023", 
          image: "https://sedetucuman.com.ar/gestor/wp-content/uploads/2023/02/36_edicion-02.jpg",
          color: "from-blue-400 to-blue-600"
        }
      ].map((workshop, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          {/* Background con gradiente si la imagen falla */}
          <div className={`absolute inset-0 bg-gradient-to-br ${workshop.color}`}></div>
          
          {/* Imagen */}
          <img
            src={workshop.image}
            alt={`Workshop ${workshop.edition}`}
            className="relative w-full h-64 object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.style.opacity = '0';
            }}
          />
          
          {/* Overlay de texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
            <div className="transform transition-transform group-hover:translate-y-[-8px]">
              <h3 className="text-white text-3xl font-bold mb-1">
                {workshop.edition} Edición
              </h3>
              <p className="text-gray-200 text-lg">{workshop.date}</p>
            </div>
            
            {/* Decorative line */}
            <div className="mt-4 h-1 w-16 bg-white group-hover:w-24 transition-all duration-300"></div>
          </div>
          
          {/* Efecto hover */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
    
    {/* Mensaje adicional */}
    <div className="mt-8 text-center">
      <p className="text-gray-600 dark:text-gray-400">
        Más de 38 ediciones realizadas desde 1984
      </p>
    </div>
  </Container>
</Section>
    </div>
  );
};

export default Workshops;