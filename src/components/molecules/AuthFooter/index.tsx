'use client';

import React from 'react';

interface AuthFooterProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthFooter({ children, className = '' }: AuthFooterProps) {
  return (
    <div className={`text-center ${className}`}>
      {children}
    </div>
  );
}

interface AuthFooterLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function AuthFooterLink({ children, onClick, className = '' }: AuthFooterLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`text-primary hover:text-primary/80 font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

interface AuthFooterTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthFooterText({ children, className = '' }: AuthFooterTextProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}
