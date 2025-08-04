"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bot,
  Send,
  Clock,
  X,
  Navigation,
  Search,
  ShoppingCart,
  Package,
  MessageSquare,
  Zap,
  ArrowRight,
  ExternalLink
} from "lucide-react"
import ProductAvatar from "@/components/molecules/ProductAvatar"

// Mock data de medicamentos (mismo que en SalesPage)
const medicamentosStock = [
  {
    id: "med-001",
    name: "Paracetamol 500mg",
    generic: "Acetaminofén",
    category: "Analgésicos",
    price: 15.50,
    stock: 120,
    compound: "Acetaminofén",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["dolor", "fiebre", "cefalea"]
  },
  {
    id: "med-002",
    name: "Ibuprofeno 400mg",
    generic: "Ibuprofeno",
    category: "Antiinflamatorios",
    price: 22.00,
    stock: 85,
    compound: "Ibuprofeno",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["inflamación", "dolor", "fiebre"]
  },
  {
    id: "med-003",
    name: "Loratadina 10mg",
    generic: "Loratadina",
    category: "Antihistamínicos",
    price: 28.75,
    stock: 45,
    compound: "Loratadina",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["alergia", "rinitis", "urticaria"]
  },
  {
    id: "med-004",
    name: "Amoxicilina 500mg",
    generic: "Amoxicilina",
    category: "Antibióticos",
    price: 35.25,
    stock: 30,
    compound: "Amoxicilina",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=100&h=100&fit=crop&crop=center",
    prescription: true,
    indications: ["infección", "bacteria", "garganta"]
  },
  {
    id: "med-005",
    name: "Omeprazol 20mg",
    generic: "Omeprazol",
    category: "Gastroenterología",
    price: 42.90,
    stock: 95,
    compound: "Omeprazol",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["acidez", "gastritis", "úlcera"]
  }
]

interface AIResponse {
  type: 'recommendation' | 'info' | 'error' | 'navigation'
  message: string
  medications?: typeof medicamentosStock
  warnings?: string[]
  navigationSuggestion?: {
    path: string
    label: string
    description: string
  }
}

interface GlobalAIChatProps {
  isOpen: boolean
  onClose: () => void
  onAddToCart?: (medication: typeof medicamentosStock[0]) => void
}

// Declarar tipo global para window
declare global {
  interface Window {
    SalesPageContext?: {
      medicamentosStock: typeof medicamentosStock
      addToCart: ((medication: typeof medicamentosStock[0]) => void) | null
    }
  }
}

// Función para obtener contexto de SalesPage
const getSalesPageContext = () => {
  if (typeof window !== 'undefined' && window.SalesPageContext) {
    return window.SalesPageContext
  }
  return null
}

export function GlobalAIChat({ isOpen, onClose, onAddToCart }: GlobalAIChatProps) {
  const [query, setQuery] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', content: string | AIResponse}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const chatRef = useRef<HTMLDivElement>(null)

  const isOnSalesPage = pathname === '/dashboard/sales'
  const salesContext = getSalesPageContext()

  // Opciones predefinidas contextuales (más compactas)
  const getQuickActions = () => [
    { icon: MessageSquare, label: "¿Qué puedo tomar para el dolor de garganta?" },
    { icon: Search, label: "Medicamentos similares al paracetamol" },
    { icon: Zap, label: "Tengo fiebre, ¿qué me recomiendas?" },
    { icon: Package, label: "Algo para la acidez estomacal" },
    { icon: Navigation, label: "Ir a Punto de Venta" },
    { icon: ShoppingCart, label: "Ver Productos" }
  ]

  // Auto-scroll del chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chatHistory, isTyping])

  // Limpiar chat al cerrar
  useEffect(() => {
    if (!isOpen) {
      setChatHistory([])
      setQuery("")
      setTypingText("")
      setIsTyping(false)
      setIsLoading(false)
    }
  }, [isOpen])

  // Efecto de typing (más rápido para popup)
  const typeMessage = (message: string, callback: () => void) => {
    setIsTyping(true)
    setTypingText("")
    let i = 0

    const typeInterval = setInterval(() => {
      if (i < message.length) {
        setTypingText(prev => prev + message.charAt(i))
        i++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        callback()
      }
    }, 20) // Más rápido para popup
  }

  // Procesar consulta de IA (versión simplificada)
  const processAiQuery = async (userQuery: string): Promise<AIResponse> => {
    const queryLower = userQuery.toLowerCase()

    // Navegación rápida
    if (queryLower.includes('punto de venta') || queryLower.includes('ventas')) {
      return {
        type: 'navigation',
        message: '¿Abrir el Punto de Venta?',
        navigationSuggestion: {
          path: '/dashboard/sales',
          label: 'Ir a Ventas',
          description: 'Abrir punto de venta'
        }
      }
    }

    if (queryLower.includes('producto')) {
      return {
        type: 'navigation',
        message: '¿Ver gestión de productos?',
        navigationSuggestion: {
          path: '/dashboard/products',
          label: 'Ver Productos',
          description: 'Gestionar inventario'
        }
      }
    }

    // Consultas médicas (versión compacta)
    if (queryLower.includes('dolor de garganta') || queryLower.includes('garganta')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.indications.some(indication =>
          indication.includes('garganta') || indication.includes('dolor')
        )
      ).slice(0, 2) // Solo 2 para popup compacto

      return {
        type: 'recommendation',
        message: 'Para dolor de garganta:',
        medications: relevantMeds,
        navigationSuggestion: !isOnSalesPage ? {
          path: '/dashboard/sales',
          label: 'Ir a Ventas',
          description: 'Para agregar al carrito'
        } : undefined
      }
    }

    if (queryLower.includes('dolor') || queryLower.includes('duele')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.indications.includes('dolor') || med.category.includes('Analgésicos')
      ).slice(0, 2)

      return {
        type: 'recommendation',
        message: 'Para alivio del dolor:',
        medications: relevantMeds,
        navigationSuggestion: !isOnSalesPage ? {
          path: '/dashboard/sales',
          label: 'Ir a Ventas',
          description: 'Procesar compra'
        } : undefined
      }
    }

    if (queryLower.includes('fiebre')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.indications.includes('fiebre')
      ).slice(0, 2)

      return {
        type: 'recommendation',
        message: 'Para reducir fiebre:',
        medications: relevantMeds,
        navigationSuggestion: !isOnSalesPage ? {
          path: '/dashboard/sales',
          label: 'Ir a Ventas',
          description: 'Procesar compra'
        } : undefined
      }
    }

    if (queryLower.includes('acidez') || queryLower.includes('estómago')) {
      const relevantMeds = medicamentosStock.filter(med =>
        med.category.includes('Gastroenterología')
      ).slice(0, 2)

      return {
        type: 'recommendation',
        message: 'Para problemas gástricos:',
        medications: relevantMeds,
        navigationSuggestion: !isOnSalesPage ? {
          path: '/dashboard/sales',
          label: 'Ir a Ventas',
          description: 'Procesar compra'
        } : undefined
      }
    }

    return {
      type: 'info',
      message: 'Puedo ayudarte con consultas médicas, navegación o búsqueda de productos. ¿Qué necesitas?'
    }
  }

  // Enviar consulta a IA
  const handleSubmit = async (queryText: string) => {
    if (!queryText.trim()) return

    const userMessage = queryText.trim()
    setQuery("")

    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 600))

      const aiResponse = await processAiQuery(userMessage)

      typeMessage(aiResponse.message, () => {
        setChatHistory(prev => [...prev, { type: 'ai', content: aiResponse }])
        setIsLoading(false)
      })
    } catch {
      setChatHistory(prev => [...prev, {
        type: 'ai',
        content: {
          type: 'error',
          message: 'Error al procesar consulta.'
        }
      }])
      setIsLoading(false)
    }
  }

  // Manejar navegación
  const handleNavigation = (path: string) => {
    router.push(path)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-24 right-6 z-[9998] w-96 max-w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-4 duration-200">
      <Card className="shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        {/* Header compacto */}
        <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">PharmaHub AI</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ask, search, or make anything</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>

        <CardContent className="p-0">
          {/* Quick Actions (solo si no hay chat) */}
          {chatHistory.length === 0 && !isLoading && !isTyping && (
            <div className="p-4 space-y-2">
              <div className="grid grid-cols-1 gap-1">
                {getQuickActions().slice(0, 4).map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleSubmit(action.label)}
                    className="justify-start h-8 text-xs px-2"
                    size="sm"
                  >
                    <action.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chat compacto */}
          {(chatHistory.length > 0 || isLoading || isTyping) && (
            <div ref={chatRef} className="max-h-80 overflow-y-auto p-4 space-y-3">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'user' ? (
                    <div className="max-w-[80%] bg-blue-500 text-white rounded-lg px-3 py-1.5">
                      <p className="text-xs">{message.content as string}</p>
                    </div>
                  ) : (
                    <div className="max-w-[90%] space-y-2">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {(message.content as AIResponse).message}
                        </p>
                      </div>

                      {/* Medicamentos compactos */}
                      {(message.content as AIResponse).medications && (
                        <div className="space-y-1">
                          {(message.content as AIResponse).medications!.map((med) => (
                            <div key={med.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
                              <ProductAvatar src={med.image} alt={med.name} size="sm" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{med.name}</p>
                                <p className="text-green-600 dark:text-green-400">${med.price}</p>
                              </div>
                              {isOnSalesPage && (onAddToCart || salesContext?.addToCart) ? (
                                <Button
                                  onClick={() => {
                                    if (onAddToCart) {
                                      onAddToCart(med)
                                    } else if (salesContext?.addToCart) {
                                      salesContext.addToCart(med)
                                    }
                                  }}
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                >
                                  +
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleNavigation('/dashboard/sales')}
                                  size="sm"
                                  variant="outline"
                                  className="h-6 px-2 text-xs"
                                >
                                  <ExternalLink className="h-2 w-2" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Navegación compacta */}
                      {(message.content as AIResponse).navigationSuggestion && (
                        <Button
                          onClick={() => handleNavigation((message.content as AIResponse).navigationSuggestion!.path)}
                          className="w-full h-7 text-xs"
                          size="sm"
                        >
                          <ArrowRight className="h-3 w-3 mr-1" />
                          {(message.content as AIResponse).navigationSuggestion!.label}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator compacto */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                    <p className="text-xs text-gray-700 dark:text-gray-300">{typingText}</p>
                    <Clock className="h-2 w-2 animate-spin inline ml-1" />
                  </div>
                </div>
              )}

              {isLoading && !isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 animate-spin" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <Separator />

          {/* Input compacto */}
          <div className="p-3">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(query); }} className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI anything..."
                className="flex-1 h-8 text-xs"
                disabled={isLoading}
              />
              <Button type="submit" disabled={!query.trim() || isLoading} size="sm" className="h-8 w-8 p-0">
                <Send className="h-3 w-3" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
