"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Stethoscope,
  MessageSquare,
  Bot,
  Settings,
  BarChart3,
  TrendingUp,
  Clock,
  Brain,
  Zap,
  CheckCircle
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

// Mock data de estadísticas del AI
const aiStats = {
  totalConversations: 342,
  resolvedQueries: 298,
  averageResponseTime: "1.2s",
  satisfactionRate: 94,
  topQuestions: [
    { question: "¿Qué medicamento para dolor de cabeza?", count: 45 },
    { question: "¿Tienes ibuprofeno en stock?", count: 38 },
    { question: "¿Cuál es el precio del paracetamol?", count: 32 },
    { question: "¿Necesito receta para antibióticos?", count: 28 },
    { question: "¿Qué medicamento para la gripe?", count: 25 }
  ]
}

export function AIAssistantPage() {
  const [isAIEnabled, setIsAIEnabled] = useState(true)
  const [autoRespond, setAutoRespond] = useState(true)
  const [smartSuggestions, setSmartSuggestions] = useState(true)

  return (
    <div className="container mx-auto p-4 lg:p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Panel de Control</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Asistente IA</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            PharmaHub AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configura y monitorea tu asistente de inteligencia artificial
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración Avanzada
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            Entrenar Modelo
          </Button>
        </div>
      </div>

      {/* Estado del AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Estado del Asistente
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Activo
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Asistente IA</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Respuestas automáticas</p>
              </div>
              <Switch
                checked={isAIEnabled}
                onCheckedChange={setIsAIEnabled}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Respuesta Automática</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Responder instantáneamente</p>
              </div>
              <Switch
                checked={autoRespond}
                onCheckedChange={setAutoRespond}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Sugerencias Inteligentes</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Productos recomendados</p>
              </div>
              <Switch
                checked={smartSuggestions}
                onCheckedChange={setSmartSuggestions}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conversaciones</p>
                <p className="text-2xl font-bold">{aiStats.totalConversations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Consultas Resueltas</p>
                <p className="text-2xl font-bold">{aiStats.resolvedQueries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tiempo Promedio</p>
                <p className="text-2xl font-bold">{aiStats.averageResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Satisfacción</p>
                <p className="text-2xl font-bold">{aiStats.satisfactionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preguntas Frecuentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Preguntas Más Frecuentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiStats.topQuestions.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {item.question}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Respuestas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Configuración de Respuestas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Mensaje de Bienvenida
              </label>
              <Input
                placeholder="¡Hola! Soy tu asistente farmacéutico. ¿En qué puedo ayudarte hoy?"
                className="h-20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Mensaje cuando no hay stock
              </label>
              <Input
                placeholder="Lamentablemente no tenemos ese medicamento en stock actualmente..."
                className="h-20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Palabras clave de emergencia
              </label>
              <Input
                placeholder="urgente, emergencia, intoxicación, alergia"
              />
            </div>

            <Button className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat de Prueba */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Probar Asistente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto mb-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="bg-white dark:bg-gray-950 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">¡Hola! Soy tu asistente farmacéutico. ¿En qué puedo ayudarte hoy?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Escribe una pregunta de prueba..."
              className="flex-1"
            />
            <Button>
              Enviar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
