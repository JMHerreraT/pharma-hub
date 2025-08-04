"use client"

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

// Schema de validación
const resetPasswordSchema = z.object({
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirma tu contraseña'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const email = searchParams.get('email') || ''
  const token = searchParams.get('token') || ''

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const password = watch('password', '')

  // Validaciones de seguridad de contraseña
  const passwordValidations = {
    length: password.length >= 6,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
  }

  const isPasswordStrong = Object.values(passwordValidations).every(Boolean)

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      // Simular actualización de contraseña
      console.log('Actualizando contraseña para:', email, 'con token:', token)

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success('¡Contraseña actualizada exitosamente!')

      // Redirigir al login
      setTimeout(() => {
        window.location.href = '/auth/login'
      }, 1500)

    } catch {
      toast.error('Error al actualizar la contraseña. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Nueva contraseña
            </h1>
            <p className="text-muted-foreground">
              Crea una nueva contraseña segura para tu cuenta
            </p>
            <p className="text-sm font-medium text-foreground">
              {email}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Nueva contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  className="pr-10"
                  disabled={isLoading}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Password Strength Indicators */}
            {password && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Requisitos de contraseña:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`flex items-center gap-1 ${passwordValidations.length ? 'text-primary' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidations.length ? 'fill-current' : ''}`} />
                    Al menos 6 caracteres
                  </div>
                  <div className={`flex items-center gap-1 ${passwordValidations.hasLowerCase ? 'text-primary' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidations.hasLowerCase ? 'fill-current' : ''}`} />
                    Letra minúscula
                  </div>
                  <div className={`flex items-center gap-1 ${passwordValidations.hasUpperCase ? 'text-primary' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidations.hasUpperCase ? 'fill-current' : ''}`} />
                    Letra mayúscula
                  </div>
                  <div className={`flex items-center gap-1 ${passwordValidations.hasNumber ? 'text-primary' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidations.hasNumber ? 'fill-current' : ''}`} />
                    Un número
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  className="pr-10"
                  disabled={isLoading}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading || !isPasswordStrong}
            >
              {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
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

export default ResetPasswordForm
