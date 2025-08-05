"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ArrowLeft, Shield, RotateCcw } from 'lucide-react'
import { useVerifyOTP, useResendOTP } from '@/lib/auth-services'
import { toast } from 'sonner'

const VerifyOTPForm = () => {
  const searchParams = useSearchParams()
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Hooks de autenticación
  const verifyOTPMutation = useVerifyOTP()
  const resendOTPMutation = useResendOTP()

  const email = searchParams.get('email') || ''

  // Countdown para reenvío
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Por favor ingresa el código completo de 6 dígitos')
      return
    }

    try {
      const result = await verifyOTPMutation.mutateAsync({
        email,
        code: otp,
      })

      // Si requiere configuración de contraseña, redirigir a set-password
      if (result.requiresPasswordSetup) {
        setTimeout(() => {
          window.location.href = `/auth/set-password?email=${encodeURIComponent(email)}`
        }, 1000)
      } else {
        // Si no requiere configuración, redirigir al dashboard
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000)
      }
    } catch {
      // El error ya se maneja en el mutation
      setOtp('') // Limpiar el campo OTP
    }
  }

  const handleResendCode = async () => {
    try {
      await resendOTPMutation.mutateAsync(email)
      setCountdown(60)
      setCanResend(false)
    } catch {
      // El error ya se maneja en el mutation
      console.error('Resend OTP error')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-xl border-border/50">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/auth/forgot-password'}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Volver</span>
            </button>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Verifica tu código
              </h1>
              <p className="text-muted-foreground">
                Ingresa el código de 6 dígitos que enviamos a
              </p>
              <p className="text-sm font-medium text-foreground">
                {email}
              </p>
            </div>
          </div>

          {/* OTP Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium text-center block">
                Código de verificación
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={verifyOTPMutation.isPending}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerifyOTP}
              disabled={verifyOTPMutation.isPending || otp.length !== 6}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {verifyOTPMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </div>
              ) : (
                'Verificar código'
              )}
            </Button>
          </div>

          {/* Resend Code */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              ¿No recibiste el código?
            </p>

            {!canResend ? (
              <p className="text-sm text-muted-foreground">
                Reenviar en {countdown}s
              </p>
            ) : (
              <button
                onClick={handleResendCode}
                disabled={resendOTPMutation.isPending}
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors mx-auto"
              >
                <RotateCcw className={`h-4 w-4 ${resendOTPMutation.isPending ? 'animate-spin' : ''}`} />
                {resendOTPMutation.isPending ? 'Reenviando...' : 'Reenviar código'}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Problema con el email?{' '}
              <button
                onClick={() => window.location.href = '/auth/forgot-password'}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Usar otro email
              </button>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VerifyOTPForm
