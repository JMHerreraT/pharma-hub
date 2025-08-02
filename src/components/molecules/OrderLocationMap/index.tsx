"use client"

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin, AlertCircle } from 'lucide-react'

// Mapbox token from environment or demo token as fallback
// Get your own token from https://account.mapbox.com/access-tokens/
// For production, set NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoidGVzdC1tYXBib3giLCJhIjoiY2t2dTZpaGw4MGl3aDJ3cGhxZXl6ZzRvYSJ9.123456789demo' // Demo token

interface OrderLocationMapProps {
  address: string
  className?: string
}

// Mock function to get coordinates from address
// In production, you would use a geocoding service
const getCoordinatesFromAddress = (address: string): [number, number] => {
  // Mock coordinates for different cities/areas
  const mockCoordinates: Record<string, [number, number]> = {
    'Av. Principal 123, Ciudad': [-74.006, 40.7128], // NYC-like
    'Calle Luna 456, Ciudad': [-74.0059, 40.7589], // Manhattan
    'Plaza Central 789, Ciudad': [-74.0445, 40.6892], // Brooklyn
    'Calle Sol 321, Ciudad': [-73.9857, 40.7484], // Queens
    'Av. Norte 654, Ciudad': [-73.9442, 40.8176], // Bronx
    'Calle Este 987, Ciudad': [-74.1502, 40.6334], // Staten Island
    'Plaza Sur 147, Ciudad': [-74.0060, 40.7055], // Lower Manhattan
    'Av. Oeste 258, Ciudad': [-74.0014, 40.7505], // Midtown
    'Calle Central 369, Ciudad': [-73.9665, 40.7812], // Upper Manhattan
    'Plaza Norte 741, Ciudad': [-73.9781, 40.7488], // Midtown East
  }

  return mockCoordinates[address] || [-74.006, 40.7128] // Default to NYC
}

const OrderLocationMap = ({ address, className = "" }: OrderLocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!mapContainer.current) return

    // Validate token
    if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'your_mapbox_token_here' || MAPBOX_TOKEN.includes('demo')) {
      setMapError('Token de Mapbox no configurado')
      setIsLoading(false)
      return
    }

    try {
      // Set Mapbox access token
      mapboxgl.accessToken = MAPBOX_TOKEN

      // Get coordinates for the address
      const coordinates = getCoordinatesFromAddress(address)

      // Initialize map with error handling
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 15,
        attributionControl: false, // Hide attribution for cleaner look
      })

      // Handle map load
      map.current.on('load', () => {
        setIsLoading(false)
        setMapError(null)
      })

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError('Error al cargar el mapa')
        setIsLoading(false)
      })

      // Add marker for delivery location
      marker.current = new mapboxgl.Marker({
        color: '#3b82f6', // Blue marker
        scale: 0.8,
      })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h4 class="font-semibold text-sm">Dirección de entrega</h4>
                <p class="text-xs text-gray-600 mt-1">${address}</p>
              </div>
            `)
        )
        .addTo(map.current)

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    } catch (error) {
      console.error('Error initializing map:', error)
      setMapError('Error al inicializar el mapa')
      setIsLoading(false)
    }

    // Cleanup function
    return () => {
      if (marker.current) {
        marker.current.remove()
      }
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [address])

  // Loading state
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="w-full h-full rounded-lg border border-border overflow-hidden flex items-center justify-center bg-muted/30" style={{ minHeight: '200px' }}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm">Cargando mapa...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (mapError) {
    return (
      <div className={`w-full ${className}`}>
        <div className="w-full h-full rounded-lg border border-border overflow-hidden flex items-center justify-center bg-muted/30" style={{ minHeight: '200px' }}>
          <div className="flex flex-col items-center gap-3 text-muted-foreground p-4 text-center max-w-sm">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">Mapa no disponible</h4>
              <p className="text-xs mb-2">{mapError}</p>
              <p className="text-xs text-muted-foreground">
                Para habilitar el mapa, configure su token de Mapbox en el archivo .env.local:
              </p>
              <code className="text-xs bg-background border rounded px-2 py-1 mt-1 block">
                NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_aqui
              </code>
            </div>
            <div className="flex items-start gap-2 mt-2 text-sm border-t pt-3 w-full">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-xs text-foreground mb-1">Dirección de entrega:</p>
                <span className="break-words text-xs">{address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={mapContainer}
        className="w-full h-full rounded-lg border border-border overflow-hidden"
        style={{ minHeight: '200px' }}
      />
    </div>
  )
}

export default OrderLocationMap
