'use client';

import React from 'react';

interface AuthLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AuthLoadingSpinner({
  size = 'md',
  className = ''
}: AuthLoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Cargando..."
    />
  );
}
