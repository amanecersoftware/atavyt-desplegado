// components/Testimonials.jsx
import React, { useState, useEffect, useRef } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const rotationRef = useRef(0);
  const [, forceRender] = useState(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Directora",
      company: "Viajes del Norte",
      image: "https://ui-avatars.com/api/?name=Maria+Gonzalez&background=3b82f6&color=fff&size=200",
      quote: "ATAVYT ha sido fundamental en el crecimiento de nuestra agencia.",
      fullTestimony: "La capacitación constante y el networking nos han abierto puertas que antes parecían imposibles. El respaldo institucional es invaluable.",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Ramírez",
      role: "Gerente",
      company: "TucuTours",
      image: "https://ui-avatars.com/api/?name=Carlos+Ramirez&background=10b981&color=fff&size=200",
      quote: "El respaldo institucional nos permite operar con total tranquilidad.",
      fullTestimony: "La asesoría legal y el apoyo constante han sido pilares fundamentales para nuestro desarrollo. Son un socio estratégico indispensable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Laura Fernández",
      role: "Propietaria",
      company: "Experiencias NOA",
      image: "https://ui-avatars.com/api/?name=Laura+Fernandez&background=8b5cf6&color=fff&size=200",
      quote: "Participar en ferias internacionales transformó nuestro negocio.",
      fullTestimony: "Gracias a ATAVYT hemos establecido alianzas estratégicas a nivel internacional. La visibilidad que nos dan es invaluable para nuestro crecimiento.",
      rating: 5,
    },
    {
      id: 4,
      name: "Roberto Silva",
      role: "Director",
      company: "Turismo Integral",
      image: "https://ui-avatars.com/api/?name=Roberto+Silva&background=f59e0b&color=fff&size=200",
      quote: "Los seminarios y talleres son de primer nivel.",
      fullTestimony: "Con más de 20 años en el sector, puedo afirmar que ATAVYT es esencial para mantenerse actualizado. La calidad de la capacitación es excepcional.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const animate = (timestamp) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // 18 grados por segundo, independiente del framerate del dispositivo
      rotationRef.current = (rotationRef.current + (delta * 0.018)) % 360;
      forceRender((n) => n + 1);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const getCardPosition = (index, total) => {
    const angle = (360 / total) * index + rotationRef.current;
    const radian = (angle * Math.PI) / 180;
    const radius = 250;

    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius / 3,
      z: Math.sin(radian) * 100,
      scale: 0.8 + (Math.cos(radian) * 0.2),
      opacity: 0.5 + (Math.cos(radian) * 0.5),
    };
  };

  return (
    <Section bgColor="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }} />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
              asociados
            </span>
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Historias reales de agencias que han crecido junto a ATAVYT
          </p>
        </div>

        <div>
          <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1000px' }}>
            {testimonials.map((testimonial, index) => {
              const pos = getCardPosition(index, testimonials.length);

              return (
                <div
                  key={testimonial.id}
                  className="absolute cursor-pointer"
                  style={{
                    transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${pos.scale})`,
                    opacity: pos.opacity,
                    zIndex: Math.floor(pos.z) + 100,
                    willChange: 'transform, opacity',
                  }}
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-64 hover:shadow-blue-500/50 transition-shadow border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full border-4 border-blue-500 mb-4 shadow-lg"
                      />
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                        {testimonial.role} - {testimonial.company}
                      </p>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic line-clamp-3">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-blue-200 mt-8 text-sm">
            Haz clic en cualquier testimonio para ver más detalles
          </p>
        </div>
      </Container>

      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                />
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedTestimonial.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {selectedTestimonial.role} - {selectedTestimonial.company}
                  </p>
                  <div className="flex mt-2">
                    {[...Array(selectedTestimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-600">
                <p className="text-xl italic text-gray-800 dark:text-gray-200 leading-relaxed">
                  "{selectedTestimonial.quote}"
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedTestimonial.fullTestimony}
              </p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Testimonials;