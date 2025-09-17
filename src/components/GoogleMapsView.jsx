import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Star, Clock, DollarSign } from 'lucide-react';

const GoogleMapsView = ({ canchas = [], onCanchaSelect, userLocation = null }) => {
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [currentUserLocation, setCurrentUserLocation] = useState(userLocation);

  // Efecto para obtener la ubicación del usuario automáticamente
  useEffect(() => {
    // Si ya tenemos una ubicación del usuario (pasada como prop), usarla
    if (userLocation) {
      setCurrentUserLocation(userLocation);
      return;
    }

    // Si no hay ubicación y el navegador soporta geolocalización, obtenerla
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setCurrentUserLocation(newLocation);
          console.log('Ubicación del usuario obtenida:', newLocation);
        },
        (error) => {
          console.warn('Error al obtener la ubicación del usuario:', error);
          // No mostrar error al usuario, simplemente usar ubicación por defecto
        },
        { 
          enableHighAccuracy: true, 
          timeout: 10000, 
          maximumAge: 300000 // 5 minutos
        }
      );
    }
  }, [userLocation]);

  // Actualizar currentUserLocation cuando cambie userLocation prop
  useEffect(() => {
    if (userLocation) {
      setCurrentUserLocation(userLocation);
    }
  }, [userLocation]);

  // Configuración del mapa
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '12px'
  };

  // Centro del mapa - usar ubicación del usuario o centro de Cali, Colombia por defecto
  const center = useMemo(() => {
    if (currentUserLocation) {
      return {
        lat: currentUserLocation.lat,
        lng: currentUserLocation.lng
      };
    }
    // Centro de Cali, Colombia por defecto
    return {
      lat: 3.4516,
      lng: -76.5320
    };
  }, [currentUserLocation]);

  // Opciones del mapa
  const options = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Manejar click en marcador
  const handleMarkerClick = (cancha) => {
    setSelectedCancha(cancha);
    if (onCanchaSelect) {
      onCanchaSelect(cancha);
    }
  };

  // Cerrar InfoWindow
  const handleInfoWindowClose = () => {
    setSelectedCancha(null);
  };

  // Obtener icono personalizado para los marcadores
  const getMarkerIcon = (cancha) => {
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="#10B981" stroke="white" stroke-width="2"/>
          <path d="M16 8L18.5 13H23L19.5 16.5L21 22L16 19L11 22L12.5 16.5L9 13H13.5L16 8Z" fill="white"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16)
    };
  };

  // Icono para la ubicación del usuario
  const getUserLocationIcon = () => {
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(24, 24),
      anchor: new window.google.maps.Point(12, 12)
    };
  };

  return (
    <div className="w-full">
      {/* Mostrar estado de carga o error */}
      {loadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <h3 className="text-red-800 font-medium">Error al cargar Google Maps</h3>
          <p className="text-red-600 text-sm mt-1">{loadError}</p>
          <p className="text-red-600 text-sm mt-1">
            Verifica que la API key esté configurada correctamente en el archivo .env
          </p>
        </div>
      )}
      
      {!isLoaded && !loadError && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      )}

      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}
        libraries={['places']}
        onLoad={() => {
          console.log('Google Maps script loaded successfully');
          setIsLoaded(true);
        }}
        onError={(error) => {
          console.error('Error loading Google Maps:', error);
          setLoadError('No se pudo cargar Google Maps. Verifica la conexión a internet y la API key.');
        }}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={currentUserLocation ? 13 : 11}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {/* Marcador para la ubicación del usuario */}
          {currentUserLocation && (
            <Marker
              position={{
                lat: currentUserLocation.lat,
                lng: currentUserLocation.lng
              }}
              icon={getUserLocationIcon()}
              title="Tu ubicación"
            />
          )}

          {/* Marcadores para las canchas */}
          {canchas.map((cancha) => {
            // Verificar que la cancha tenga coordenadas válidas
            if (!cancha.ubicacion?.coordenadas?.lat || !cancha.ubicacion?.coordenadas?.lng) {
              return null;
            }

            return (
              <Marker
                key={cancha._id}
                position={{
                  lat: cancha.ubicacion.coordenadas.lat,
                  lng: cancha.ubicacion.coordenadas.lng
                }}
                icon={getMarkerIcon(cancha)}
                title={cancha.nombre}
                onClick={() => handleMarkerClick(cancha)}
              />
            );
          })}

          {/* InfoWindow para mostrar información de la cancha seleccionada */}
          {selectedCancha && selectedCancha.ubicacion?.coordenadas && (
            <InfoWindow
              position={{
                lat: selectedCancha.ubicacion.coordenadas.lat,
                lng: selectedCancha.ubicacion.coordenadas.lng
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-3 max-w-xs">
                <div className="flex items-start gap-3">
                  {selectedCancha.imagenes && selectedCancha.imagenes.length > 0 && (
                    <img
                      src={selectedCancha.imagenes[0]}
                      alt={selectedCancha.nombre}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                      {selectedCancha.nombre}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600 truncate">
                        {selectedCancha.ubicacion?.direccion || 'Dirección no disponible'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {selectedCancha.calificacion && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">
                            {selectedCancha.calificacion.toFixed(1)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-600">
                          S/ {selectedCancha.precioHora}/hora
                        </span>
                      </div>
                    </div>

                    {selectedCancha.horarios && selectedCancha.horarios.length > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        <Clock className="w-3 h-3 text-blue-500" />
                        <span className="text-xs text-gray-600">
                          {selectedCancha.horarios[0].inicio} - {selectedCancha.horarios[0].fin}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => window.open(`/canchas/${selectedCancha._id}`, '_blank')}
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      
      {/* Información adicional cuando no hay canchas */}
      {isLoaded && canchas.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          <p>No hay canchas para mostrar en el mapa</p>
        </div>
      )}
      
      {/* Debug info - solo en desarrollo */}
      {import.meta.env.DEV && (
        <div className="mt-2 text-xs text-gray-400">
          API Key: {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'Configurada' : 'No configurada'} | 
          Canchas: {canchas.length} | 
          Cargado: {isLoaded ? 'Sí' : 'No'}
        </div>
      )}
    </div>
  );
};

export default GoogleMapsView;