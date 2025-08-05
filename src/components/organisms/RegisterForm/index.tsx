"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Hand, Building2, Mail, Eye, EyeOff, Phone } from 'lucide-react'
import { useRegister, type ValidateBusinessIdResponse } from '@/lib/auth-services'

// Schema de validación
const registerSchema = z.object({
  businessId: z.string().min(1, 'El Business ID es requerido'),
  name: z.string().min(2, 'El nombre completo debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  phone: z.string().min(10, 'Ingresa un número de teléfono válido').optional(),
  invitationToken: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Hooks de autenticación
  const registerMutation = useRegister()

  // Obtener parámetros de la URL
  const businessIdFromUrl = searchParams.get('businessId') || ''
  const invitationTokenFromUrl = searchParams.get('invitationToken') || ''

  // Obtener información pre-validada de la organización
  const orgDataParam = searchParams.get('orgData')
  const organizationInfo: ValidateBusinessIdResponse | null = orgDataParam ? JSON.parse(orgDataParam) : null

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      businessId: businessIdFromUrl,
      invitationToken: invitationTokenFromUrl,
    }
  })

  // Establecer valores de URL cuando el componente se monta
  useEffect(() => {
    if (businessIdFromUrl) {
      setValue('businessId', businessIdFromUrl)
    }
    if (invitationTokenFromUrl) {
      setValue('invitationToken', invitationTokenFromUrl)
    }
  }, [businessIdFromUrl, invitationTokenFromUrl, setValue])

  // Nota: La validación del Business ID ya se hizo en AuthWelcomeContent
  // organizationInfo ya contiene la información pre-validada

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data)

      // Siempre redirigir a verificación OTP después del registro
      const params = new URLSearchParams({
        email: data.email,
        ...(data.businessId && { businessId: data.businessId })
      })
      window.location.href = `/auth/verify-otp?${params.toString()}`
    } catch (error) {
      // El error ya se maneja en el mutation
      console.error('Register error:', error)
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
                {invitationTokenFromUrl ? '🎉 ¡Has sido invitado!' : '¡Hola, Bienvenido!'}
              </h1>
              <Hand className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground">
              {invitationTokenFromUrl
                ? 'Completa tu registro con la invitación recibida'
                : 'Bienvenido, por favor ingresa tus datos'
              }
            </p>
          </div>

          {/* Invitation Alert */}
          {invitationTokenFromUrl && (
            <Alert className="border-blue-500/20 bg-blue-50">
              <AlertDescription className="text-blue-800">
                <div className="space-y-1">
                  <div className="font-semibold">🎉 ¡Invitación activa!</div>
                  <div className="text-sm">
                    Estás registrándote con una invitación para la sucursal: <strong>{businessIdFromUrl}</strong>
                  </div>
                  {organizationInfo?.organization && (
                    <div className="text-xs mt-2">
                      Organización: <strong>{organizationInfo.organization.organizationName}</strong>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Organization Alert */}
          {organizationInfo && organizationInfo.organization && (
            <Alert className="border-primary/20 bg-accent">
              <Building2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-accent-foreground">
                <div className="space-y-2">
                  <div>
                    Te estás registrando para <strong>&quot;{organizationInfo.organization.organizationName}&quot;</strong>
                  </div>
                  {organizationInfo.selectedBranch && (
                    <div className="text-xs">
                      <div className="font-medium">Sucursal asignada:</div>
                      <div className="flex justify-between items-center">
                        <span>{organizationInfo.selectedBranch.name}</span>
                        <span className="text-muted-foreground">{organizationInfo.selectedBranch.city}</span>
                      </div>
                    </div>
                  )}
                  {organizationInfo.organization.branches?.length > 1 && (
                    <div className="text-xs space-y-1">
                      <div className="font-medium">Sucursales disponibles:</div>
                      {organizationInfo.organization.branches.map((branch) => (
                        <div key={branch.id} className="flex justify-between items-center">
                          <span>{branch.name}</span>
                          <span className="text-muted-foreground">{branch.city}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Business ID */}
            <div className="space-y-2">
              <Label htmlFor="businessId" className="flex items-center gap-2">
                Business ID
                {organizationInfo?.isValid && (
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    ✓ Verificado
                  </span>
                )}
                {invitationTokenFromUrl && (
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    🎉 Invitación
                  </span>
                )}
              </Label>
              <Input
                id="businessId"
                placeholder="Ingresa tu Business ID"
                disabled={!!businessIdFromUrl || !!invitationTokenFromUrl}
                className={(businessIdFromUrl || invitationTokenFromUrl) ? "bg-muted cursor-not-allowed opacity-75" : ""}
                {...register('businessId')}
              />
              {businessIdFromUrl && !invitationTokenFromUrl && (
                <p className="text-xs text-muted-foreground">
                  Este Business ID fue verificado en el paso anterior
                </p>
              )}
              {invitationTokenFromUrl && (
                <p className="text-xs text-blue-600">
                  Business ID pre-llenado desde la invitación
                </p>
              )}
              {errors.businessId && (
                <p className="text-sm text-destructive">{errors.businessId.message}</p>
              )}
            </div>

            {/* Contact Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                placeholder="Nombre y apellido"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@mail.com"
                  className="pr-10"
                  {...register('email')}
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="pr-10"
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
                <p className="text-sm text-destructive">{errors.password.message}</p>
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

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Teléfono</Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="000-000-0000"
                  className="pr-10"
                  {...register('phone')}
                />
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {invitationTokenFromUrl ? 'Completando registro...' : 'Creando cuenta...'}
                </div>
              ) : (
                invitationTokenFromUrl ? 'Completar Registro con Invitación' : 'Registrarse'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
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

export default RegisterForm
