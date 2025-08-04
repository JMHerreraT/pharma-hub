"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AlertTriangle } from 'lucide-react'

interface FeatureFlagData {
  id: number
  name: string
  description: string
  updatedBy: string
  updatedByEmail: string
  updatedAt: string
  isEnabled: boolean
  scope: 'local' | 'global'
  key: string
}

interface FeatureFlagEditDialogProps {
  featureFlag: FeatureFlagData
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updatedFlag: FeatureFlagData) => void
}

const FeatureFlagEditDialog: React.FC<FeatureFlagEditDialogProps> = ({
  featureFlag,
  open,
  onOpenChange,
  onSave,
}) => {
  const [formData, setFormData] = useState<FeatureFlagData>(featureFlag)
  const [showGlobalConfirmation, setShowGlobalConfirmation] = useState(false)

  const handleSave = () => {
    if (formData.scope === 'global') {
      setShowGlobalConfirmation(true)
    } else {
      proceedWithSave()
    }
  }

  const proceedWithSave = () => {
    const updatedFlag = {
      ...formData,
      updatedAt: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', ''),
      updatedBy: 'Jorge Herrera', // En una app real vendría del contexto de usuario
      updatedByEmail: 'jorge@pharmacy.com'
    }

    onSave(updatedFlag)
    setShowGlobalConfirmation(false)
  }

  const handleCancel = () => {
    setFormData(featureFlag) // Reset form data
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Feature Flag</DialogTitle>
            <DialogDescription>
              Modifica la configuración del feature flag. Los cambios globales afectarán a todos los usuarios.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Título */}
            <div className="grid gap-2">
              <Label htmlFor="name">Título</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre del feature flag"
              />
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe qué hace este feature flag"
                rows={3}
              />
            </div>

            {/* Estado */}
            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.isEnabled}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isEnabled: checked }))}
              />
              <Label htmlFor="enabled">
                {formData.isEnabled ? 'Habilitado' : 'Deshabilitado'}
              </Label>
            </div>

            {/* Ámbito */}
            <div className="grid gap-3">
              <Label>Ámbito</Label>
              <RadioGroup
                value={formData.scope}
                onValueChange={(value: 'local' | 'global') => setFormData(prev => ({ ...prev, scope: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="local" id="local" />
                  <Label htmlFor="local" className="cursor-pointer">
                    <span className="font-medium">Local</span>
                    <span className="block text-sm text-gray-500">
                      Solo afecta a tu sesión actual
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="global" id="global" />
                  <Label htmlFor="global" className="cursor-pointer">
                    <span className="font-medium">Global</span>
                    <span className="block text-sm text-gray-500">
                      Afecta a todos los usuarios del sistema
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Actualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog for global changes */}
      <AlertDialog open={showGlobalConfirmation} onOpenChange={setShowGlobalConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Confirmación de Cambio Global
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2">
                <p>
                  <strong>Reminder:</strong> Al seleccionar global, este feature se activará para todos los usuarios.
                </p>
                <p>
                  Este cambio se aplicará de manera global e inmediata. ¿Estás seguro de que deseas continuar?
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowGlobalConfirmation(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={proceedWithSave} className="bg-red-600 hover:bg-red-700">
              Confirmar Cambio Global
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default FeatureFlagEditDialog
