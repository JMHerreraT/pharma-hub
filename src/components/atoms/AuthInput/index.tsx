'use client';

import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface AuthInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  showPasswordToggle?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  disabled = false,
  icon: Icon,
  showPasswordToggle = false,
  value,
  onChange,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${Icon || showPasswordToggle ? 'pr-10' : ''} ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        />

        {/* Icon on the right */}
        {Icon && !showPasswordToggle && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        )}

        {/* Password toggle */}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

AuthInput.displayName = 'AuthInput';

export default AuthInput;
