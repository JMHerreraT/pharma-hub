"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X, Search, Package, Boxes, FileText, Mail, BarChart, Users, Plus, ArrowUpRight, Sparkles, PlusCircle, UserPlus, ClipboardList } from 'lucide-react'
import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface SearchItem {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  url?: string
  action?: () => void
  shortcut?: string
  badge?: string
}

const SearchDialog = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Handle keyboard shortcuts and navigation
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        setSearchQuery('')
        setSelectedIndex(0)
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1))
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
        }
        if (e.key === "Enter") {
          e.preventDefault()
          handleSelect(filteredItems[selectedIndex])
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, setIsOpen])

  const categories = [
    { id: 'all', name: 'Todo', icon: Search },
    { id: 'products', name: 'Productos', icon: Package },
    { id: 'orders', name: 'Pedidos', icon: Boxes },
    { id: 'reports', name: 'Reportes', icon: BarChart },
    { id: 'users', name: 'Usuarios', icon: Users },
  ]

  const searchItems: SearchItem[] = [
    // Navigation items
    {
      id: 'dashboard',
      title: 'Panel de Control',
      description: 'Ir al panel principal',
      icon: BarChart,
      category: 'navigation',
      url: '/dashboard'
    },
    {
      id: 'products',
      title: 'Productos',
      description: 'Gestionar productos de la farmacia',
      icon: Package,
      category: 'products',
      url: '/dashboard/products'
    },
    {
      id: 'orders',
      title: 'Pedidos',
      description: 'Ver y gestionar pedidos',
      icon: Boxes,
      category: 'orders',
      url: '/dashboard/orders'
    },
    {
      id: 'reports',
      title: 'Reportes',
      description: 'Análisis y reportes',
      icon: BarChart,
      category: 'reports',
      url: '/dashboard/reports'
    },
    {
      id: 'emails',
      title: 'Correos',
      description: 'Gestionar comunicaciones',
      icon: Mail,
      category: 'navigation',
      url: '/dashboard/emails'
    },
    {
      id: 'notes',
      title: 'Notas',
      description: 'Ver notas y documentos',
      icon: FileText,
      category: 'navigation',
      url: '/dashboard/notes'
    },

    // Actions
    {
      id: 'create-product',
      title: 'Agregar Nuevo Producto',
      description: 'Crear un nuevo producto farmacéutico',
      icon: PlusCircle,
      category: 'products',
      shortcut: '⌘P',
      action: () => router.push('/dashboard/products?action=create')
    },
    {
      id: 'create-order',
      title: 'Crear Nuevo Pedido',
      description: 'Procesar un nuevo pedido de cliente',
      icon: Plus,
      category: 'orders',
      shortcut: '⌘O',
      action: () => router.push('/dashboard/orders?action=create')
    },
    {
      id: 'create-user',
      title: 'Agregar Nuevo Usuario',
      description: 'Crear un nuevo usuario del sistema',
      icon: UserPlus,
      category: 'users',
      shortcut: '⌘U',
      action: () => console.log('Create user action')
    },
    {
      id: 'generate-report',
      title: 'Generar Reporte de Ventas',
      description: 'Crear análisis detallado de ventas',
      icon: ClipboardList,
      category: 'reports',
      shortcut: '⌘R',
      action: () => router.push('/dashboard/reports?type=sales')
    },
    {
      id: 'ai-insights',
      title: 'Análisis IA de Ventas',
      description: 'Generar insights con inteligencia artificial',
      icon: Sparkles,
      category: 'reports',
      shortcut: '⌘A',
      badge: 'NUEVO',
      action: () => console.log('AI insights action')
    },
    {
      id: 'inventory-check',
      title: 'Análisis de Inventario',
      description: 'Verificar niveles de stock y alertas',
      icon: Package,
      category: 'products',
      shortcut: '⌘I',
      action: () => router.push('/dashboard/products?view=inventory')
    },

    // Recent searches (these would be dynamic in a real app)
    {
      id: 'recent-1',
      title: 'Panel de Análisis de Clientes',
      description: 'Reciente • 3 Jul',
      icon: Users,
      category: 'recent',
      url: '/dashboard/reports?focus=customers'
    },
    {
      id: 'recent-2',
      title: 'Reporte de Rendimiento de Productos',
      description: 'Reciente • 28 Jun',
      icon: BarChart,
      category: 'recent',
      url: '/dashboard/reports?focus=products'
    },
    {
      id: 'recent-3',
      title: 'Gestión de Pedidos',
      description: 'Reciente • 25 Jun',
      icon: Boxes,
      category: 'recent',
      url: '/dashboard/orders'
    }
  ]

  const filteredItems = useMemo(() => {
    let items = searchItems

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter(item =>
        item.category === selectedCategory ||
        (selectedCategory === 'products' && item.category === 'products') ||
        (selectedCategory === 'orders' && item.category === 'orders') ||
        (selectedCategory === 'reports' && item.category === 'reports') ||
        (selectedCategory === 'users' && item.category === 'users')
      )
    }

    // Filter by search query
    if (searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return items
  }, [searchQuery, selectedCategory])

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems])

  const handleSelect = (item: SearchItem) => {
    if (item.action) {
      item.action()
    } else if (item.url) {
      router.push(item.url)
    }
    setIsOpen(false)
    setSearchQuery('')
    setSelectedIndex(0)
  }

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: SearchItem[] } = {}

    filteredItems.forEach(item => {
      if (item.category === 'recent') {
        if (!groups['BÚSQUEDAS RECIENTES']) groups['BÚSQUEDAS RECIENTES'] = []
        groups['BÚSQUEDAS RECIENTES'].push(item)
      } else if (item.action || item.shortcut) {
        if (!groups['ACCIONES']) groups['ACCIONES'] = []
        groups['ACCIONES'].push(item)
      } else {
        if (!groups['NAVEGACIÓN']) groups['NAVEGACIÓN'] = []
        groups['NAVEGACIÓN'].push(item)
      }
    })

    return groups
  }, [filteredItems])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogContent
        showCloseButton={false}
        className="fixed left-[50%] top-[50%] z-50 grid w-[95vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-0 border bg-background text-foreground p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl overflow-hidden sm:w-[85vw] md:w-[75vw] lg:w-[65vw] xl:w-[55vw] 2xl:w-[50vw] max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh]"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>

        {/* Header with title and close button */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Búsqueda y Comandos
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar o escribir un comando..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:ring-0 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 mt-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`h-8 px-3 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? 'bg-accent border-border text-foreground'
                      : 'border-border text-muted-foreground hover:bg-accent hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon className="h-3 w-3 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {Object.entries(groupedItems).map(([groupName, items]) => (
            <div key={groupName} className="p-4 border-b border-border last:border-b-0">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {groupName}
              </h3>
              <div className="space-y-1">
                {items.map((item, index) => {
                  const globalIndex = Object.entries(groupedItems)
                    .slice(0, Object.keys(groupedItems).indexOf(groupName))
                    .reduce((acc, [, groupItems]) => acc + groupItems.length, 0) + index

                  const Icon = item.icon
                  const isSelected = globalIndex === selectedIndex

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-accent border border-border'
                          : 'hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted border border-border">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.shortcut && (
                        <div className="flex items-center gap-1">
                          <kbd className="inline-flex h-6 px-2 items-center justify-center rounded bg-muted border border-border font-mono text-xs text-muted-foreground">
                            {item.shortcut}
                          </kbd>
                        </div>
                      )}
                      {item.url && !item.shortcut && (
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && searchQuery && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">No se encontraron resultados para &quot;{searchQuery}&quot;</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Intenta buscar productos, pedidos o reportes</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-3 bg-muted/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="inline-flex h-5 w-5 items-center justify-center rounded bg-muted border border-border font-mono text-[10px]">
                  ↑↓
                </kbd>
                <span>Navegar</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="inline-flex h-5 w-5 items-center justify-center rounded bg-muted border border-border font-mono text-[10px]">
                  ↵
                </kbd>
                <span>Seleccionar</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="inline-flex h-5 w-7 items-center justify-center rounded bg-muted border border-border font-mono text-[10px]">
                esc
              </kbd>
              <span>Cerrar</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog
