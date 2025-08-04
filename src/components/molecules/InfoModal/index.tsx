"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Info, Mail, Users } from 'lucide-react'

interface InfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const InfoModal: React.FC<InfoModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Info className="w-4 h-4 text-primary" />
            </div>
            ¿No tienes un Business ID?
          </DialogTitle>
          <DialogDescription className="text-left space-y-4 pt-2">
            <p>
              No te preocupes, es muy fácil obtener acceso a PharmaHub. Para poder registrarte,
              necesitas un <strong>Business ID</strong> que te proporcionará tu organización.
            </p>

            <div className="bg-accent border border-primary/20 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-accent-foreground">Contacta a tu Administrador</h4>
                  <p className="text-sm text-muted-foreground">
                    Solicita a tu administrador de farmacia o supervisor que te envíe
                    un <strong>Business ID</strong> o una invitación para unirte al sistema.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-accent-foreground">Invitación por Email</h4>
                  <p className="text-sm text-muted-foreground">
                    Tu administrador puede enviarte una invitación directamente a tu
                    correo electrónico con las instrucciones de registro.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Una vez que tengas tu Business ID o invitación, podrás regresar aquí
              y completar tu registro en PharmaHub.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Entendido
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false)
              // Aquí podrías agregar lógica para enviar un email de solicitud
            }}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Solicitar Invitación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InfoModal
