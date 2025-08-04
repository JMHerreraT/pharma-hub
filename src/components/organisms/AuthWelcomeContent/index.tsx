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

const AuthWelcomeContent = () => {
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showBusinessIdForm, setShowBusinessIdForm] = useState(false)
  const [businessId, setBusinessId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

    setIsLoading(true)
    try {
      // Simular validación del Business ID
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Aquí validarías el Business ID con tu API
      console.log('Validating Business ID:', businessId)

      toast.success('Business ID válido. Redirigiendo...')

      // Redirigir al registro con el Business ID
      setTimeout(() => {
        window.location.href = `/auth/register?businessId=${encodeURIComponent(businessId)}`
      }, 1000)

    } catch {
      toast.error('Business ID no válido. Verifica e intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

    return (
    <>
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
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
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleBusinessIdSubmit()
                      }
                    }}
                  />
                </div>

                <Button
                  onClick={handleBusinessIdSubmit}
                  disabled={isLoading || !businessId.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? 'Validando...' : 'Ingresar'}
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
