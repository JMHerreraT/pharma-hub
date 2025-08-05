"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthOptionCard from '@/components/molecules/AuthOptionCard'
import InfoModal from '@/components/molecules/InfoModal'
import { Building2, HelpCircle, ArrowLeft, KeyRound } from 'lucide-react'
import { toast } from 'sonner'
import { useValidateBusinessId } from '@/lib/auth-services'

const AuthWelcomeContent = () => {
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showBusinessIdForm, setShowBusinessIdForm] = useState(false)
  const [businessId, setBusinessId] = useState('')

  // Hook para validar Business ID
  const validateBusinessIdMutation = useValidateBusinessId()

  const handleBusinessIdOption = () => {
    setShowBusinessIdForm(true)
  }

  const handleNoIdOption = () => {
    setShowInfoModal(true)
  }

  const handleBackToOptions = () => {
    setShowBusinessIdForm(false)
    setBusinessId('')
  }

  const handleBusinessIdSubmit = async () => {
    if (!businessId.trim()) {
      toast.error('Por favor ingresa tu Business ID')
      return
    }

    try {
      // Validar Business ID con la API real
      const result = await validateBusinessIdMutation.mutateAsync(businessId)

      toast.success('Business ID válido. Redirigiendo...')

      // Preparar datos para query params
      const queryParams = new URLSearchParams({
        businessId: businessId,
        organizationId: result.organization.id,
        organizationName: result.organization.organizationName,
        accessType: result.accessType,
        orgData: JSON.stringify(result) // Toda la información de la organización
      })

      // Redirigir al registro con toda la información
      setTimeout(() => {
        window.location.href = `/auth/register?${queryParams.toString()}`
      }, 1000)

    } catch (error) {
      // El error ya se maneja en el mutation, pero agregamos un toast
      const err = error as Error
      toast.error(err.message || 'Business ID no válido. Verifica e intenta de nuevo.')
    }
  }

    return (
    <>
      <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-xl border-border/50">
        <CardContent className="p-8">
          {!showBusinessIdForm ? (
            <div className="text-center space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  ¿Cómo planeas usar PharmaHub?
                </h1>
                <p className="text-muted-foreground">
                  Para comenzar este proceso, cuéntanos qué tipo de acceso tienes.
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <AuthOptionCard
                  icon={Building2}
                  title="Tengo un Business ID"
                  description="ID de mi organización para registrarme"
                  onClick={handleBusinessIdOption}
                  variant="primary"
                />

                <AuthOptionCard
                  icon={HelpCircle}
                  title="Aún no tengo un ID"
                  description="Necesito ayuda para obtener acceso"
                  onClick={handleNoIdOption}
                  variant="secondary"
                />
              </div>

              {/* Footer */}
              <div className="pt-4">
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
          ) : (
            <div className="space-y-6">
              {/* Header with Back Button */}
              <div className="space-y-4">
                <button
                  onClick={handleBackToOptions}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm">Volver</span>
                </button>

                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <KeyRound className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Ingresa tu Business ID
                  </h1>
                  <p className="text-muted-foreground">
                    Por favor, ingresa el Business ID proporcionado por tu organización
                  </p>
                </div>
              </div>

              {/* Business ID Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessId" className="text-foreground font-medium">
                    Business ID
                  </Label>
                  <Input
                    id="businessId"
                    type="text"
                    placeholder="Ej: PHARMA-2024-ABC123"
                    value={businessId}
                    onChange={(e) => setBusinessId(e.target.value)}
                    className="text-center font-mono text-lg"
                    disabled={validateBusinessIdMutation.isPending}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleBusinessIdSubmit()
                      }
                    }}
                  />
                </div>

                <Button
                  onClick={handleBusinessIdSubmit}
                  disabled={validateBusinessIdMutation.isPending || !businessId.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {validateBusinessIdMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Validando...
                    </div>
                  ) : (
                    'Ingresar'
                  )}
                </Button>
              </div>

              {/* Info */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Si no tienes un Business ID,{' '}
                  <button
                    onClick={handleNoIdOption}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    solicita ayuda aquí
                  </button>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <InfoModal
        open={showInfoModal}
        onOpenChange={setShowInfoModal}
      />
    </>
  )
}

export default AuthWelcomeContent
