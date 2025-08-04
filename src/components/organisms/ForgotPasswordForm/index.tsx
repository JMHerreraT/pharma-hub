"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft, KeyRound } from 'lucide-react'
import { toast } from 'sonner'

// Schema de validación
const forgotPasswordSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      // Simular envío de email
      console.log('Enviando email de recuperación a:', data.email)

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success('Email de recuperación enviado. Revisa tu bandeja de entrada.')

      // Redirigir a verificación OTP
      setTimeout(() => {
        window.location.href = `/auth/verify-otp?email=${encodeURIComponent(data.email)}`
      }, 1500)

    } catch {
      toast.error('Error al enviar el email. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Volver al login</span>
            </button>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="text-muted-foreground">
                Ingresa tu email y te enviaremos un código para restablecer tu contraseña
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@mail.com"
                  className="pr-10"
                  disabled={isLoading}
                  {...register('email')}
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar código de recuperación'}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Recordaste tu contraseña?{' '}
              <button
                onClick={() => window.location.href = '/auth/login'}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Iniciar Sesión
              </button>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ForgotPasswordForm
