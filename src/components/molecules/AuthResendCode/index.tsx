'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface AuthResendCodeProps {
  onResend: () => void;
  isResending?: boolean;
  cooldownSeconds?: number;
  className?: string;
}

export default function AuthResendCode({
  onResend,
  isResending = false,
  cooldownSeconds = 60,
  className = ''
}: AuthResendCodeProps) {
  const [countdown, setCountdown] = useState(cooldownSeconds);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    onResend();
    setCountdown(cooldownSeconds);
    setCanResend(false);
  };

  return (
    <div className={`text-center space-y-2 ${className}`}>
      <p className="text-sm text-muted-foreground">
        ¿No recibiste el código?
      </p>

      {!canResend ? (
        <p className="text-sm text-muted-foreground">
          Reenviar en {countdown}s
        </p>
      ) : (
        <button
          onClick={handleResend}
          disabled={isResending}
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors mx-auto"
        >
          <RotateCcw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
          {isResending ? 'Reenviando...' : 'Reenviar código'}
        </button>
      )}
    </div>
  );
}
