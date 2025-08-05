'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, User, Building2, Copy, Check } from 'lucide-react'
import { useInviteUser } from '@/lib/auth-services'
import { toast } from 'sonner'

// Schema de validación
const inviteUserSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  role: z.enum(['super_admin', 'admin', 'system_admin', 'customer_manager', 'sales_operator', 'pharmacist', 'assistant', 'basic_user']),
  businessId: z.string().min(1, 'Selecciona una sucursal'),
})

type InviteUserFormData = z.infer<typeof inviteUserSchema>

interface InviteUserFormProps {
  organization?: {
    id: string
    organizationName: string
    branches: Array<{
      id: string
      name: string
      businessId: string
      city: string
    }>
  }
}

const InviteUserForm = ({ organization }: InviteUserFormProps) => {
  const [invitationUrl, setInvitationUrl] = React.useState<string>('')
  const [copied, setCopied] = React.useState(false)

  // Hook para invitar usuario
  const inviteUserMutation = useInviteUser()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InviteUserFormData>({
    resolver: zodResolver(inviteUserSchema),
  })

  const onSubmit = async (data: InviteUserFormData) => {
    try {
      const result = await inviteUserMutation.mutateAsync({
        email: data.email,
        name: data.name,
        role: data.role,
        businessId: data.businessId,
      })

      // Mostrar URL de invitación
      setInvitationUrl(result.invitationUrl)
      toast.success('Usuario invitado exitosamente')
    } catch {
      // El error ya se maneja en el mutation
      console.error('Invite user error')
    }
  }

  const copyInvitationUrl = async () => {
    if (invitationUrl) {
      try {
        await navigator.clipboard.writeText(invitationUrl)
        setCopied(true)
        toast.success('URL copiada al portapapeles')
        setTimeout(() => setCopied(false), 2000)
      } catch {
        toast.error('Error al copiar URL')
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-xl border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Invitar Usuario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {organization && (
          <Alert className="border-primary/20 bg-accent">
            <Building2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-accent-foreground">
              Invitando a <strong>{organization.organizationName}</strong>
            </AlertDescription>
          </Alert>
        )}

        {invitationUrl ? (
          <div className="space-y-4">
            <Alert className="border-green-500/20 bg-green-50">
              <AlertDescription className="text-green-800">
                <div className="space-y-2">
                  <div className="font-semibold">✅ Usuario invitado exitosamente</div>
                  <div className="text-sm">
                    Se ha enviado un email con la invitación. También puedes compartir este enlace:
                  </div>
                  <div className="bg-white p-3 rounded border text-xs font-mono break-all">
                    {invitationUrl}
                  </div>
                  <Button
                    onClick={copyInvitationUrl}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar URL
                      </>
                    )}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => {
                setInvitationUrl('')
                setValue('email', '')
                setValue('name', '')
                setValue('role', 'pharmacist')
                setValue('businessId', '')
              }}
              className="w-full"
            >
              Invitar otro usuario
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  className="pr-10"
                  {...register('email')}
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Name */}
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

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select onValueChange={(value) => setValue('role', value as 'super_admin' | 'admin' | 'system_admin' | 'customer_manager' | 'sales_operator' | 'pharmacist' | 'assistant' | 'basic_user')}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Administrador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="system_admin">Administrador de Sistema</SelectItem>
                  <SelectItem value="customer_manager">Gestor de Clientes</SelectItem>
                  <SelectItem value="sales_operator">Operador de Ventas</SelectItem>
                  <SelectItem value="pharmacist">Farmacéutico</SelectItem>
                  <SelectItem value="assistant">Asistente</SelectItem>
                  <SelectItem value="basic_user">Usuario Básico</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

            {/* Business ID (Branch) */}
            <div className="space-y-2">
              <Label htmlFor="businessId">Sucursal</Label>
              <Select onValueChange={(value) => setValue('businessId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una sucursal" />
                </SelectTrigger>
                <SelectContent>
                  {organization?.branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.businessId}>
                      {branch.name} - {branch.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.businessId && (
                <p className="text-sm text-destructive">{errors.businessId.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={inviteUserMutation.isPending}
            >
              {inviteUserMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando invitación...
                </div>
              ) : (
                'Enviar Invitación'
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default InviteUserForm
