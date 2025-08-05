'use client';

import React from 'react';
import { Building2, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthBusinessIdDisplayProps {
  businessId: string;
  organizationName?: string;
  isValidating?: boolean;
  isValid?: boolean;
  error?: string;
  className?: string;
}

export default function AuthBusinessIdDisplay({
  businessId,
  organizationName,
  isValidating = false,
  isValid = false,
  error,
  className = ''
}: AuthBusinessIdDisplayProps) {
  if (!businessId) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Business ID Info */}
      <Alert className={`border ${
        isValid ? 'border-green-200 bg-green-50' :
        error ? 'border-red-200 bg-red-50' :
        'border-blue-200 bg-blue-50'
      }`}>
        <div className="flex items-center gap-2">
          {isValidating ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          ) : isValid ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <Building2 className="h-4 w-4 text-blue-600" />
          )}

          <AlertDescription className="flex-1">
            {isValidating ? (
              <span className="text-blue-700">Validando Business ID...</span>
            ) : isValid ? (
              <div className="text-green-700">
                <div className="font-medium">Business ID verificado</div>
                {organizationName && (
                  <div className="text-sm mt-1">Organización: {organizationName}</div>
                )}
              </div>
            ) : error ? (
              <span className="text-red-700">{error}</span>
            ) : (
              <span className="text-blue-700">Business ID: {businessId}</span>
            )}
          </AlertDescription>
        </div>
      </Alert>

      {/* Additional info when verified */}
      {isValid && organizationName && (
        <div className="text-xs text-muted-foreground">
          Te unirás a esta organización como miembro del equipo
        </div>
      )}
    </div>
  );
}
