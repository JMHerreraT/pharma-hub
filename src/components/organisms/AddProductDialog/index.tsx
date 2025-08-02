"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import FileUpload from '@/components/molecules/FileUpload'
import { toast } from 'sonner'

// Definir el schema directamente en el componente siguiendo la documentación de shadcn/ui
const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  category: z.string().min(1, {
    message: "La categoría es requerida.",
  }),
  status: z.string().min(1, {
    message: "El estado es requerido.",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "El stock debe ser un número mayor o igual a 0.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El precio debe ser un número mayor a 0.",
  }),
  supplier: z.string().min(1, {
    message: "El proveedor es requerido.",
  }),
  image: z.instanceof(File).optional().or(z.string().optional()),
})

const productCategories = [
  { value: "medicamentos", label: "Medicamentos" },
  { value: "vitaminas", label: "Vitaminas" },
  { value: "cosmeticos", label: "Cosméticos" },
  { value: "higiene", label: "Higiene Personal" },
  { value: "equipos", label: "Equipos Médicos" },
]

const productStatuses = [
  { value: "disponible", label: "Disponible" },
  { value: "agotado", label: "Agotado" },
  { value: "descontinuado", label: "Descontinuado" },
]

const suppliers = [
  { value: "medsupply-co", label: "MedSupply Co" },
  { value: "pharmacorp", label: "PharmaCorp" },
  { value: "healthdistributors", label: "HealthDistributors" },
  { value: "medplus", label: "MedPlus Solutions" },
  { value: "pharmatech", label: "PharmaTech Inc" },
]

interface AddProductDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  // 1. Definir el formulario usando useForm con zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      status: "",
      stock: "0",
      price: "0",
      supplier: "",
      image: undefined,
    },
  })

  // 2. Definir el handler de submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Convertir los valores string a números para el procesamiento
      const processedValues = {
        ...values,
        stock: Number(values.stock),
        price: Number(values.price),
      }

      // Simular guardado del producto
      console.log('Guardando producto:', processedValues)

      // Aquí harías la llamada a la API
      setTimeout(() => {
        toast.success('Producto agregado exitosamente')
        form.reset()
        onSuccess?.()
        onClose()
      }, 1000)

    } catch (error) {
      toast.error('Error al agregar el producto')
      console.error('Error:', error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Agregar Nuevo Producto
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna Izquierda */}
              <div className="space-y-4">
                {/* Nombre */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Producto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Paracetamol 500mg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categoría */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Estado */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stock */}
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Cantidad disponible en inventario
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Columna Derecha */}
              <div className="space-y-4">
                {/* Precio */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Precio en dólares USD
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Proveedor */}
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proveedor</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar proveedor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier.value} value={supplier.value}>
                              {supplier.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Imagen */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagen del Producto</FormLabel>
                      <FormControl>
                        <FileUpload
                          onFileSelect={field.onChange}
                          value={field.value}
                          maxSizeMB={5}
                        />
                      </FormControl>
                      <FormDescription>
                        Formatos: PNG, JPG, JPEG. Máximo 5MB
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Guardando...' : 'Agregar Producto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductDialog
