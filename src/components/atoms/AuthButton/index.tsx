'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import AuthLoadingSpinner from '@/components/atoms/AuthLoadingSpinner';

interface AuthButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export default function AuthButton({
  children,
  isLoading = false,
  loadingText,
  disabled = false,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'default',
  className = ''
}: AuthButtonProps) {
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full ${variantClasses[variant]} ${className}`}
      size={size}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <AuthLoadingSpinner size="sm" />
          {loadingText || 'Cargando...'}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
