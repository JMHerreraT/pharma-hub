import React from 'react'
import data from '@/lib/example-data.json'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import z from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { DragHandle } from '@/components/atoms/DragHandle';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2Icon, LoaderIcon, MoreVerticalIcon } from 'lucide-react';
import { toast } from 'sonner';
import { DraggableDataTable } from '@/components/organisms/DraggableDataTable';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DataTableCellViewer } from '@/components/organisms/DataTableCellViewer';
import ProductAvatar from "@/components/molecules/ProductAvatar"

export const schema = z.object({
    id: z.number(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
    image: z.string().optional(),
  });

const columns: ColumnDef<z.infer<typeof schema>>[] = [
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
        accessorKey: "header",
        header: "Nombre del Producto",
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex items-center gap-3 min-w-0">
              <ProductAvatar
                src={item.image}
                alt={item.header}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <DataTableCellViewer
                  triggerText={item.header}
                  title={`Editar ${item.header}`}
                  description="Actualizar información del producto"
                  onSubmit={() => console.log("¡Enviar actualización del producto!")}
                >
                  <form className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="type">Categoría</Label>
                      <Input id="type" defaultValue={item.type} />
                    </div>
                    <div>
                      <Label htmlFor="status">Estado</Label>
                      <Input id="status" defaultValue={item.status} />
                    </div>
                  </form>
                </DataTableCellViewer>
              </div>
            </div>
          );
        },
        enableHiding: false,
      },
    {
      accessorKey: "type",
      header: "Categoría",
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            {row.original.type}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
        >
          {row.original.status === "Done" ? (
            <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
          ) : (
            <LoaderIcon />
          )}
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "target",
      header: () => <div className="w-full text-right">Stock</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Actualizando stock de ${row.original.header}`,
              success: "Stock actualizado exitosamente",
              error: "Error al actualizar el stock",
            })
          }}
        >
          <Label htmlFor={`${row.original.id}-stock`} className="sr-only">
            Stock
          </Label>
          <Input
            className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
            defaultValue={row.original.target}
            id={`${row.original.id}-stock`}
            type="number"
          />
        </form>
      ),
    },
    {
      accessorKey: "limit",
      header: () => <div className="w-full text-right">Precio</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Actualizando precio de ${row.original.header}`,
              success: "Precio actualizado exitosamente",
              error: "Error al actualizar el precio",
            })
          }}
        >
          <Label htmlFor={`${row.original.id}-price`} className="sr-only">
            Precio
          </Label>
          <Input
            className="h-8 w-20 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
            defaultValue={`$${row.original.limit}`}
            id={`${row.original.id}-price`}
          />
        </form>
      ),
    },
    {
      accessorKey: "reviewer",
      header: "Proveedor",
      cell: ({ row }) => {
        const isAssigned = row.original.reviewer !== "Assign reviewer"

        if (isAssigned) {
          return row.original.reviewer
        }

        return (
          <>
            <Label htmlFor={`${row.original.id}-supplier`} className="sr-only">
              Proveedor
            </Label>
            <Select>
              <SelectTrigger
                className="h-8 w-40"
                id={`${row.original.id}-supplier`}
              >
                <SelectValue placeholder="Seleccionar proveedor" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="MedSupply Co">MedSupply Co</SelectItem>
                <SelectItem value="PharmaCorp">PharmaCorp</SelectItem>
                <SelectItem value="HealthDistributors">HealthDistributors</SelectItem>
              </SelectContent>
            </Select>
          </>
        )
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <MoreVerticalIcon />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            <DropdownMenuItem>Editar producto</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Eliminar producto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

interface ProductsPageDataTableProps {
  enableRowsPerPage?: boolean;
  enablePagination?: boolean;
  defaultItemsToShow?: number;
}

const ProductsPageDataTable = ({
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: ProductsPageDataTableProps) => {
  const handleDataChange = (newData: z.infer<typeof schema>[]) => {
    console.log('Datos de productos cambiados:', newData);
    // Aquí podrías hacer una llamada a la API para guardar los cambios
    toast.success('Orden de productos actualizado exitosamente');
  };

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

export default ProductsPageDataTable
