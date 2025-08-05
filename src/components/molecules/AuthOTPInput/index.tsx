'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface AuthOTPInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  length?: number;
  className?: string;
}

export default function AuthOTPInput({
  value,
  onChange,
  label = "Código de verificación",
  error,
  disabled = false,
  length = 6,
  className = ''
}: AuthOTPInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="text-sm font-medium text-foreground">
          {label}
        </Label>
      )}

      <div className="flex justify-center">
        <InputOTP
          value={value}
          onChange={onChange}
          maxLength={length}
          disabled={disabled}
          render={({ slots }) => (
            <div className="flex gap-2">
              <InputOTPGroup>
                {slots.slice(0, 3).map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
              <InputOTPGroup>
                {slots.slice(3, 6).map((slot, index) => (
                  <InputOTPSlot key={index + 3} {...slot} />
                ))}
              </InputOTPGroup>
            </div>
          )}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
