import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef((
  {
    type = 'text',
    label,
    placeholder,
    error,
    hint,
    icon,
    iconPosition = 'left',
    disabled = false,
    fullWidth = true,
    className = '',
    containerClassName = '',
    ...props
  },
  ref
) => {
  // Definir clases base
  const baseClasses = 'rounded-xl px-4 py-3 bg-white border-2 focus:outline-none transition-all duration-200';
  
  // Estados
  const stateClasses = {
    default: 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
    error: 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100',
    disabled: 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
  };
  
  // Tamaño
  const sizeClasses = fullWidth ? 'w-full' : '';
  
  // Padding para iconos
  const iconPaddingClasses = {
    left: icon ? 'pl-10' : '',
    right: icon ? 'pr-10' : ''
  };
  
  // Construir clases finales
  const inputClasses = [
    baseClasses,
    disabled ? stateClasses.disabled : (error ? stateClasses.error : stateClasses.default),
    sizeClasses,
    iconPaddingClasses[iconPosition],
    className
  ].join(' ');
  
  const containerClasses = [
    'flex flex-col',
    fullWidth ? 'w-full' : '',
    containerClassName
  ].join(' ');
  
  return (
    <div className={containerClasses}>
      {label && (
        <label className="mb-1.5 font-medium text-gray-700 text-sm">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string
};

export default Input;