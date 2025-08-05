'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useSetPassword } from '@/lib/auth-services'
import { useRouter } from 'next/navigation'

// Schema de validación
const setPasswordSchema = z.object({
  newPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type SetPasswordFormData = z.infer<typeof setPasswordSchema>

interface SetPasswordFormProps {
  email: string
}

const SetPasswordForm = ({ email }: SetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  // Hook para configurar contraseña
  const setPasswordMutation = useSetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
  })

  const onSubmit = async (data: SetPasswordFormData) => {
    try {
      await setPasswordMutation.mutateAsync({
        email,
        newPassword: data.newPassword,
      })

      // Redirigir al dashboard después de configurar contraseña
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error) {
      // El error ya se maneja en el mutation
      console.error('Set password error:', error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-xl border-border/50">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">
                Configurar Contraseña
              </h1>
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Configura tu contraseña para completar el registro
            </p>
            <p className="text-sm text-muted-foreground">
              Email: <span className="font-medium">{email}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="pr-10"
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-destructive">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  className="pr-10"
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
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={setPasswordMutation.isPending}
            >
              {setPasswordMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Configurando contraseña...
                </div>
              ) : (
                'Configurar Contraseña'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={() => router.push('/auth/login')}
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

export default SetPasswordForm
