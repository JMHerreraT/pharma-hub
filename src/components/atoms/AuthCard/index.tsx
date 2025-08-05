'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function AuthCard({
  children,
  title,
  subtitle,
  className = ''
}: AuthCardProps) {
    return (
    <Card className={`w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-xl border-border/50 ${className}`}>
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          {(title || subtitle) && (
            <div className="text-center space-y-2">
              {title && (
                <h1 className="text-2xl font-bold text-foreground">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
