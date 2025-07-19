import React from 'react';
import { clsx } from 'clsx';
import type { InputProps } from '@/types';

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={clsx(
          'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
          'placeholder-neutral-400',
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input; 