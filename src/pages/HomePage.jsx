import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { MapPin, Calendar, Star, Shield, Clock, Users } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const HomePage = () => {
  // Características principales
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: 'Encuentra canchas cercanas',
      description: 'Localiza las mejores canchas deportivas cerca de tu ubicación con nuestro mapa interactivo.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Reserva en segundos',
      description: 'Proceso de reserva simple y rápido. Confirma tu cancha en pocos clics.'
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: 'Reseñas verificadas',
      description: 'Lee opiniones reales de otros jugadores para elegir la mejor opción.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Pagos seguros',
      description: 'Realiza tus pagos con total seguridad a través de nuestra plataforma protegida.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Disponibilidad en tiempo real',
      description: 'Consulta horarios disponibles actualizados instantáneamente.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Organiza partidos',
      description: 'Crea eventos y encuentra jugadores para completar tu equipo.'
    }
  ];

  // Testimonios
  const testimonials = [
    {
      quote: "SoftPlay ha revolucionado la forma en que reservo canchas. ¡Ya no tengo que hacer llamadas telefónicas ni esperar confirmaciones!",
      author: "Carlos Rodríguez",
      role: "Jugador de fútbol amateur"
    },
    {
      quote: "Como administrador de un complejo deportivo, esta plataforma ha simplificado enormemente la gestión de reservas y pagos.",
      author: "Laura Martínez",
      role: "Gerente de complejo deportivo"
    },
    {
      quote: "La aplicación es intuitiva y me permite encontrar canchas disponibles incluso a última hora. Totalmente recomendada.",
      author: "Miguel Sánchez",
      role: "Entrenador de básquet"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Reserva canchas</span>
                <span className="block text-primary">en un solo lugar</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Encuentra y reserva las mejores canchas deportivas cerca de ti. Fútbol, tenis, básquet, pádel y más deportes disponibles con reserva inmediata.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center lg:justify-start">
                  <Link to="/canchas">
                    <Button variant="primary" size="lg">
                      Buscar canchas
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="lg">
                      Crear cuenta
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="/images/hero-image.svg"
                    alt="Reserva de canchas deportivas"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Características</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Todo lo que necesitas para jugar
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Nuestra plataforma te ofrece todas las herramientas para encontrar y reservar canchas deportivas de manera fácil y rápida.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white dark:bg-gray-700 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">¿Listo para jugar?</span>
                  <span className="block">Comienza a reservar hoy.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-white">
                  Únete a miles de deportistas que ya disfrutan de la forma más fácil de encontrar y reservar canchas.
                </p>
                <Link
                  to="/register"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-primary hover:bg-gray-50"
                >
                  Registrarse gratis
                </Link>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="/images/app-screenshot.svg"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Testimonios</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Lo que dicen nuestros usuarios
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} variant="elevated" className="h-full">
                  <Card.Body>
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 flex-shrink-0">
                        <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Canchas disponibles</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">500+</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Usuarios activos</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">10,000+</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Reservas mensuales</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">25,000+</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Ciudades</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">50+</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;