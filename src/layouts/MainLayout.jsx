import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import ThemeSelector from '../theme/ThemeSelector';
import { Menu, X, User, LogOut, MapPin, Calendar, Settings, Home } from 'lucide-react';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';

const MainLayout = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navegación principal
  const navigation = [
    { name: 'Inicio', href: '/home', icon: <Home className="w-5 h-5" /> },
    { name: 'Canchas', href: '/canchas', icon: <MapPin className="w-5 h-5" /> },
  ];

  // Navegación para usuarios autenticados
  const userNavigation = user ? [
    { name: 'Mis Reservas', href: '/reservas', icon: <Calendar className="w-5 h-5" /> },
  ] : [];

  // Navegación para administradores
  const adminNavigation = user ? [
    { name: 'Admin Canchas', href: '/admin/canchas', icon: <Settings className="w-5 h-5" />, roles: ['admin_cancha', 'admin_sistema'] },
    { name: 'Admin Sistema', href: '/admin/sistema', icon: <Settings className="w-5 h-5" />, roles: ['admin_sistema'] },
  ] : [];

  // Verificar si una ruta está activa
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Verificar si el usuario tiene un rol específico
  const hasRole = (roles) => {
    if (!user || !roles) return false;
    return roles.includes(user.role);
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo y navegación principal */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/home" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                  SoftPlay
                </Link>
              </div>

            </div>

            {/* Acciones de usuario */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
              <ThemeSelector />

              {!user ? (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>

            {/* Botón de menú móvil */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Abrir menú principal</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Navegación removida - se usa sidebar */}
            </div>

            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <ThemeSelector />
                </div>
                {user && (
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                )}
              </div>
              <div className="mt-3 space-y-1">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Ingresar
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Crear cuenta
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Contenido principal */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;