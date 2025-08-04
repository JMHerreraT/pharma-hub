"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import z from 'zod'
import { ColumnDef } from '@tanstack/react-table'
import { DragHandle } from '@/components/atoms/DragHandle'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, AlertTriangle, MoreVerticalIcon } from 'lucide-react'
import { toast } from 'sonner'
import { DraggableDataTable } from '@/components/organisms/DraggableDataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ProductAvatar from '@/components/molecules/ProductAvatar'

export const medicationSchema = z.object({
  id: z.number(),
  name: z.string(),
  generic: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
  compound: z.string(),
  image: z.string().optional(),
  prescription: z.boolean(),
  indications: z.array(z.string()).optional(),
})

interface MedicationsDataTableProps {
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

// Mock data para medicamentos
const mockMedicationsData: z.infer<typeof medicationSchema>[] = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    generic: "Acetaminofén",
    category: "Analgésicos",
    price: 15.50,
    stock: 120,
    compound: "Acetaminofén",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["dolor", "fiebre", "cefalea"],
  },
  {
    id: 2,
    name: "Ibuprofeno 400mg",
    generic: "Ibuprofeno",
    category: "Antiinflamatorios",
    price: 22.00,
    stock: 85,
    compound: "Ibuprofeno",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["inflamación", "dolor", "fiebre"],
  },
  {
    id: 3,
    name: "Loratadina 10mg",
    generic: "Loratadina",
    category: "Antihistamínicos",
    price: 28.75,
    stock: 45,
    compound: "Loratadina",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["alergia", "rinitis", "urticaria"],
  },
  {
    id: 4,
    name: "Amoxicilina 500mg",
    generic: "Amoxicilina",
    category: "Antibióticos",
    price: 35.25,
    stock: 15,
    compound: "Amoxicilina",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=100&h=100&fit=crop&crop=center",
    prescription: true,
    indications: ["infección", "bacteria", "garganta"],
  },
  {
    id: 5,
    name: "Omeprazol 20mg",
    generic: "Omeprazol",
    category: "Gastroenterología",
    price: 42.90,
    stock: 95,
    compound: "Omeprazol",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["acidez", "gastritis", "úlcera"],
  }
]

const MedicationsDataTable = ({
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: MedicationsDataTableProps) => {
  const [data, setData] = React.useState(mockMedicationsData)

  const onAddToCart = (medication: z.infer<typeof medicationSchema>) => {
    console.log("Agregar al carrito:", medication.name)
    toast.success(`${medication.name} agregado al carrito`)
  }

  const hasAvailableStock = (medication: z.infer<typeof medicationSchema>) => {
    return medication.stock > 0
  }

  const handleDataChange = (newData: z.infer<typeof medicationSchema>[]) => {
    setData(newData)
  }

  const columns: ColumnDef<z.infer<typeof medicationSchema>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Medicamento",
      cell: ({ row }) => {
        const item = row.original
        const canAddToCart = hasAvailableStock ? hasAvailableStock(item) : item.stock > 0

        return (
          <div className="flex items-center gap-3 min-w-0">
            <ProductAvatar
              src={item.image}
              alt={item.name}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <button
                onClick={() => {
                  if (canAddToCart && onAddToCart) {
                    onAddToCart(item)
                    toast.success(`${item.name} agregado al carrito`)
                  } else {
                    toast.error("Sin stock disponible")
                  }
                }}
                className={`text-left font-medium hover:underline ${
                  canAddToCart ? 'text-blue-600 dark:text-blue-400 cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!canAddToCart}
              >
                {item.name}
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {item.generic}
              </p>
            </div>
          </div>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="w-fit">
            {row.original.category}
          </Badge>
          {row.original.prescription && (
            <Badge variant="destructive" className="w-fit text-xs">
              Receta
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: () => <div className="text-right">Stock</div>,
      cell: ({ row }) => {
        const stock = row.original.stock
        const isLowStock = stock <= 10
        const isOutOfStock = stock === 0

        return (
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              {isOutOfStock ? (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              ) : isLowStock ? (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              ) : (
                <div className="h-4 w-4 rounded-full bg-green-500" />
              )}
              <span className={`font-medium ${
                isOutOfStock ? 'text-red-600' :
                isLowStock ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {stock}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Precio</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <span className="font-medium">
            ${row.original.price.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const item = row.original
        const canAddToCart = hasAvailableStock ? hasAvailableStock(item) : item.stock > 0

        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (canAddToCart && onAddToCart) {
                  onAddToCart(item)
                  toast.success(`${item.name} agregado al carrito`)
                } else {
                  toast.error("Sin stock disponible")
                }
              }}
              disabled={!canAddToCart}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <MoreVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                <DropdownMenuItem>Editar medicamento</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  return (
    <div className="w-full h-full">
      <div className="overflow-x-auto">
        <DraggableDataTable
          data={data}
          columns={columns}
          enableRowsPerPage={enableRowsPerPage}
          enablePagination={enablePagination}
          defaultItemsToShow={defaultItemsToShow}
          onDataChange={handleDataChange}
        />
      </div>
    </div>
  )
}

export default MedicationsDataTable
