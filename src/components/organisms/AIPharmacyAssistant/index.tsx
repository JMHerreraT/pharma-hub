"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
// ScrollArea not available, using regular div with scroll
import {
  Bot,
  Send,
  AlertTriangle,
  CheckCircle,
  Info,
  Sparkles,
  Plus,
  Clock
} from "lucide-react"
import ProductAvatar from "@/components/molecules/ProductAvatar"

interface Medication {
  id: string
  name: string
  generic: string
  category: string
  price: number
  stock: number
  compound: string
  image: string
  prescription: boolean
  indications: string[]
}

interface AIPharmacyAssistantProps {
  isOpen: boolean
  onClose: () => void
  medicamentosStock: Medication[]
  onAddToCart: (medication: Medication) => void
}

interface AIResponse {
  type: 'recommendation' | 'info' | 'error'
  message: string
  medications?: Medication[]
  warnings?: string[]
}

export function AIPharmacyAssistant({ isOpen, onClose, medicamentosStock, onAddToCart }: AIPharmacyAssistantProps) {
  const [query, setQuery] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', content: string | AIResponse}>>([])
  const [isLoading, setIsLoading] = useState(false)

  // Simulated AI responses based on common pharmacy queries
  const processQuery = async (userQuery: string): Promise<AIResponse> => {
    const queryLower = userQuery.toLowerCase()

    // Búsqueda por síntomas
    if (queryLower.includes('dolor de garganta') || queryLower.includes('garganta')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.indications.some(indication =>
          indication.includes('garganta') ||
          indication.includes('dolor') ||
          indication.includes('infección')
        )
      )

      return {
        type: 'recommendation',
        message: 'Para el dolor de garganta, encontré estos medicamentos disponibles en nuestro inventario:',
        medications: relevantMeds,
        warnings: relevantMeds.some(med => med.prescription) ?
          ['Algunos medicamentos requieren receta médica'] : undefined
      }
    }

    // Búsqueda por dolor
    if (queryLower.includes('dolor') || queryLower.includes('duele')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.indications.includes('dolor') ||
        med.category.includes('Analgésicos') ||
        med.category.includes('Antiinflamatorios')
      )

      return {
        type: 'recommendation',
        message: 'Para el alivio del dolor, tenemos estos medicamentos en stock:',
        medications: relevantMeds,
        warnings: ['Verifique la dosis recomendada', 'No exceder la dosis máxima diaria']
      }
    }

    // Búsqueda por fiebre
    if (queryLower.includes('fiebre') || queryLower.includes('temperatura')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.indications.includes('fiebre') ||
        med.compound.includes('Acetaminofén') ||
        med.compound.includes('Ibuprofeno')
      )

      return {
        type: 'recommendation',
        message: 'Para reducir la fiebre, recomiendo estos medicamentos disponibles:',
        medications: relevantMeds,
        warnings: ['Manténgase hidratado', 'Consulte médico si la fiebre persiste más de 3 días']
      }
    }

    // Búsqueda por alergia
    if (queryLower.includes('alergia') || queryLower.includes('alérgico') || queryLower.includes('urticaria')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.category.includes('Antihistamínicos') ||
        med.indications.includes('alergia')
      )

      return {
        type: 'recommendation',
        message: 'Para el tratamiento de alergias, tengo estos antihistamínicos en stock:',
        medications: relevantMeds,
        warnings: ['Puede causar somnolencia', 'No combinar con alcohol']
      }
    }

    // Búsqueda por principio activo
    if (queryLower.includes('similar') || queryLower.includes('parecido')) {
      let targetCompound = ''
      if (queryLower.includes('paracetamol') || queryLower.includes('acetaminofén')) {
        targetCompound = 'Acetaminofén'
      } else if (queryLower.includes('ibuprofeno')) {
        targetCompound = 'Ibuprofeno'
      }

      if (targetCompound) {
        const relevantMeds = medicamentosStock.filter(med =>
          med.compound.includes(targetCompound)
        )

        return {
          type: 'recommendation',
          message: `Medicamentos con ${targetCompound} disponibles en farmacia:`,
          medications: relevantMeds
        }
      }
    }

    // Búsqueda por acidez/gastritis
    if (queryLower.includes('acidez') || queryLower.includes('gastritis') || queryLower.includes('estómago')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.category.includes('Gastroenterología') ||
        med.indications.includes('acidez') ||
        med.indications.includes('gastritis')
      )

      return {
        type: 'recommendation',
        message: 'Para problemas gástricos, tenemos estos medicamentos:',
        medications: relevantMeds,
        warnings: ['Tomar con alimentos', 'No usar por más de 14 días sin consultar médico']
      }
    }

    // Respuesta por defecto
    return {
      type: 'info',
      message: 'No pude encontrar medicamentos específicos para su consulta. ¿Podría proporcionar más detalles sobre los síntomas o el tipo de medicamento que busca? Por ejemplo: "dolor de cabeza", "fiebre", "alergia", etc.'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const userMessage = query.trim()
    setQuery("")

    // Agregar mensaje del usuario al historial
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }])

    setIsLoading(true)

    try {
      // Simular delay de AI
      await new Promise(resolve => setTimeout(resolve, 1000))

      const aiResponse = await processQuery(userMessage)

      // Agregar respuesta de AI al historial
      setChatHistory(prev => [...prev, { type: 'ai', content: aiResponse }])
        } catch {
      setChatHistory(prev => [...prev, {
        type: 'ai',
        content: {
          type: 'error',
          message: 'Lo siento, ocurrió un error al procesar su consulta. Intente nuevamente.'
        }
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const renderAIResponse = (response: AIResponse) => {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${
            response.type === 'recommendation' ? 'bg-green-100 dark:bg-green-900/20' :
            response.type === 'error' ? 'bg-red-100 dark:bg-red-900/20' :
            'bg-blue-100 dark:bg-blue-900/20'
          }`}>
            {response.type === 'recommendation' ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /> :
             response.type === 'error' ? <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" /> :
             <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">{response.message}</p>
          </div>
        </div>

        {/* Mostrar medicamentos recomendados */}
        {response.medications && response.medications.length > 0 && (
          <div className="space-y-3 ml-11">
            {response.medications.map((med) => (
              <Card key={med.id} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <ProductAvatar
                      src={med.image}
                      alt={med.name}
                      size="sm"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm">{med.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{med.generic}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {med.category}
                        </Badge>
                        {med.prescription && (
                          <Badge variant="destructive" className="text-xs">
                            Receta
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          Stock: {med.stock}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          ${med.price.toFixed(2)}
                        </div>

                        <Button
                          onClick={() => onAddToCart(med)}
                          disabled={med.stock === 0}
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Mostrar advertencias */}
        {response.warnings && response.warnings.length > 0 && (
          <div className="ml-11 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Advertencias importantes:</p>
                <ul className="space-y-1">
                  {response.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            Asistente IA Farmacéutico
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </DialogTitle>
          <DialogDescription>
            Pregúntame sobre medicamentos, síntomas o busca alternativas disponibles en nuestro inventario
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[500px]">
          {/* Chat History */}
          <div className="flex-1 px-6 overflow-y-auto">
            <div className="space-y-4 pb-4">
              {chatHistory.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    ¡Hola! Soy tu asistente farmacéutico. Puedes preguntarme:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-xs">
                    <Badge variant="outline" className="justify-start">&quot;¿Qué puedo tomar para el dolor de garganta?&quot;</Badge>
                    <Badge variant="outline" className="justify-start">&quot;Medicamentos similares al paracetamol&quot;</Badge>
                    <Badge variant="outline" className="justify-start">&quot;Tengo fiebre, ¿qué me recomiendas?&quot;</Badge>
                    <Badge variant="outline" className="justify-start">&quot;Algo para la acidez estomacal&quot;</Badge>
                  </div>
                </div>
              )}

              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'user' ? (
                    <div className="max-w-[80%] bg-blue-500 text-white rounded-lg px-4 py-2">
                      <p className="text-sm">{message.content as string}</p>
                    </div>
                  ) : (
                    <div className="max-w-[90%]">
                      {renderAIResponse(message.content as AIResponse)}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 animate-spin" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Analizando...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Input Form */}
          <div className="p-6 pt-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pregúntame sobre medicamentos, síntomas o compuestos..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={!query.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
