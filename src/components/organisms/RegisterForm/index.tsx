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
import { toast } from 'sonner'

// Schema de validación
const registerSchema = z.object({
  businessId: z.string().min(1, 'El Business ID es requerido'),
  companyName: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  contactName: z.string().min(2, 'El nombre completo debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  phone: z.string().min(10, 'Ingresa un número de teléfono válido'),
})

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Obtener Business ID de la URL
  const businessIdFromUrl = searchParams.get('businessId') || ''

  // Simulamos obtener información de la organización basada en el Business ID
  const [organizationInfo] = useState({
    name: "Laboratorio ABC",
    branch: "Sucursal Central"
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      businessId: businessIdFromUrl,
    }
  })

  // Establecer el Business ID cuando el componente se monta
  useEffect(() => {
    if (businessIdFromUrl) {
      setValue('businessId', businessIdFromUrl)
    }
  }, [businessIdFromUrl, setValue])

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      // Simular registro
      console.log('Datos de registro:', data)

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success('¡Cuenta creada exitosamente!')

      // Redirigir al dashboard
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)

    } catch {
      toast.error('Error al crear la cuenta. Inténtalo de nuevo.')
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
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                ¡Hola, Bienvenido!
              </h1>
              <Hand className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-gray-600">
              Bienvenido, por favor ingresa tus datos
            </p>
          </div>

          {/* Organization Alert */}
          <Alert className="border-primary/20 bg-accent">
            <Building2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-accent-foreground">
              Te estás registrando para <strong>&quot;{organizationInfo.name} – {organizationInfo.branch}&quot;</strong>
            </AlertDescription>
          </Alert>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Business ID */}
            <div className="space-y-2">
              <Label htmlFor="businessId" className="flex items-center gap-2">
                Business ID
                {businessIdFromUrl && (
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    ✓ Verificado
                  </span>
                )}
              </Label>
              <Input
                id="businessId"
                placeholder="Ingresa tu Business ID"
                disabled={!!businessIdFromUrl}
                className={businessIdFromUrl ? "bg-muted cursor-not-allowed opacity-75" : ""}
                {...register('businessId')}
              />
              {businessIdFromUrl && (
                <p className="text-xs text-muted-foreground">
                  Este Business ID fue verificado en el paso anterior
                </p>
              )}
              {errors.businessId && (
                <p className="text-sm text-red-600">{errors.businessId.message}</p>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input
                id="companyName"
                placeholder="Ingresa el nombre de tu empresa/negocio"
                {...register('companyName')}
              />
              {errors.companyName && (
                <p className="text-sm text-red-600">{errors.companyName.message}</p>
              )}
            </div>

            {/* Contact Name */}
            <div className="space-y-2">
              <Label htmlFor="contactName">Nombre de Contacto</Label>
              <Input
                id="contactName"
                placeholder="Nombre y apellido"
                {...register('contactName')}
              />
              {errors.contactName && (
                <p className="text-sm text-red-600">{errors.contactName.message}</p>
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
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña aquí"
                  className="pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
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
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

                        {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? 'Creando cuenta...' : 'Registrarse'}
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
