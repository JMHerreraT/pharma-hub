"use client"

import React, { Suspense } from 'react'
import VerifyOTPPage from '@/components/pages/VerifyOTPPage'

function VerifyOTPContent() {
  return <VerifyOTPPage />
}

export default function VerifyOTPPageRoute() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/10">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Cargando verificación...</p>
        </div>
      </div>
    }>
      <VerifyOTPContent />
    </Suspense>
  )
}
