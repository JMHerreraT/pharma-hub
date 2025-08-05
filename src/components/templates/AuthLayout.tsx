"use client"

import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/10 flex items-center justify-center p-4">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

        {/* Striped patterns using theme colors */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-2 bg-primary/20 rotate-45 rounded-full" />
          <div className="absolute top-20 left-20 w-24 h-2 bg-primary/30 rotate-45 rounded-full" />
          <div className="absolute bottom-20 right-20 w-40 h-2 bg-secondary/20 -rotate-45 rounded-full" />
          <div className="absolute bottom-32 right-32 w-28 h-2 bg-secondary/30 -rotate-45 rounded-full" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Property Cards and Description */}
        <div className="hidden lg:block space-y-6">
          {/* Property Cards */}
          <div className="space-y-4">
            {/* Property Card 1 */}
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-primary">Farmacia Central</h3>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">•••</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Av. Principal 123, Ciudad</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Email: admin@farmacia.com</span>
                <span>Tel: +1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Estado</span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">Activa</span>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 border border-border/50">
              <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-3 mb-2">
                <div className="text-sm opacity-90">Sucursal Norte</div>
                <div className="text-lg font-bold">$125,450</div>
                <div className="text-xs opacity-75">+12% desde el mes pasado</div>
              </div>
              <div className="text-xs text-muted-foreground">📍 Zona Norte, Local 45</div>
            </div>
          </div>

          {/* Description Text */}
          <div className="bg-secondary/90 backdrop-blur-sm rounded-xl p-6 text-secondary-foreground border border-border/30">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Gestiona Tu Red de Farmacias Efectivamente
            </h2>
            <p className="text-secondary-foreground/90 leading-relaxed">
              Administra tus farmacias sin complicaciones, desde inventario hasta ventas.
              Nuestra plataforma está diseñada para ayudar a farmacéuticos, administradores
              y personal a mantenerse actualizados y comunicarse efectivamente. Mantén el
              control de todas las actividades relacionadas con tu farmacia, asegura pagos
              puntuales y resuelve problemas rápidamente con nuestra solución integral.
            </p>

            {/* Navigation arrows */}
            <div className="flex justify-center space-x-4 mt-6">
              <button className="w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors border border-primary/30">
                <span className="text-primary">←</span>
              </button>
              <button className="w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors border border-primary/30">
                <span className="text-primary">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
