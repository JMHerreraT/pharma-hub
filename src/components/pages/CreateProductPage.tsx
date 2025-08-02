"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
    Form,
    FormControl,
    FormDescription,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BadgeCheck, Box, Boxes, Building2, CircleDollarSign, Package, Tag } from 'lucide-react'
import FileUpload from '@/components/molecules/FileUpload'
import { toast } from 'sonner'

// Schema del formulario
const formSchema = z.object({
    id: z.string(),
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
    description: z.string().optional(),
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

const CreateProductPage = () => {
    const router = useRouter()
    const [pageTitle, setPageTitle] = useState("Nuevo Producto")
    const [productId] = useState(() => uuidv4())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: productId,
            name: "",
            category: "",
            status: "",
            stock: "0",
            price: "0",
            supplier: "",
            description: "",
            image: undefined,
        },
    })

    // Actualizar título dinámicamente basado en nombre e imagen
    useEffect(() => {
        const subscription = form.watch((values) => {
            let title = "Nuevo Producto"

            if (values.name && values.name.trim()) {
                title = values.name

                // Si tiene imagen, agregar indicador
                if (values.image) {
                    title += " 📷"
                }
            } else if (values.image) {
                title = "Producto con imagen 📷"
            }

            setPageTitle(title)
        })
        return () => subscription.unsubscribe()
    }, [form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const processedValues = {
                ...values,
                stock: Number(values.stock),
                price: Number(values.price),
            }

            console.log('Guardando producto:', processedValues)

            setTimeout(() => {
                toast.success('Producto creado exitosamente')
                router.push('/dashboard/products')
            }, 1000)

        } catch (error) {
            toast.error('Error al crear el producto')
            console.error('Error:', error)
        }
    }

    const handleCancel = () => {
        router.push('/dashboard/products')
    }

    return (
        <div className="container mx-auto p-4 lg:p-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">{pageTitle}</h1>
                            <p className="text-muted-foreground">Crear un nuevo producto para el inventario</p>
                        </div>
                    </div>

                    {/* Vista Previa con Badges */}
                    <div className="flex flex-wrap gap-2">
                        {form.watch("name") && (
                            <Badge variant="secondary" className="text-xs">
                                <Box className='w-4 h-4' fill='currentColor' /> {form.watch("name")}
                            </Badge>
                        )}

                        {form.watch("category") && (
                            <Badge variant="outline" className="text-xs">
                                <BadgeCheck className='w-4 h-4' fill='currentColor' /> {productCategories.find(c => c.value === form.watch("category"))?.label}
                            </Badge>
                        )}

                        {form.watch("status") && (
                            <Badge
                                variant={form.watch("status") === "disponible" ? "default" : form.watch("status") === "agotado" ? "destructive" : "secondary"}
                                className="text-xs"
                            >
                                <Tag className='w-4 h-4' fill='currentColor' /> {productStatuses.find(s => s.value === form.watch("status"))?.label}
                            </Badge>
                        )}

                        {form.watch("price") && Number(form.watch("price")) > 0 && (
                            <Badge variant="secondary" className="text-xs">
                                <CircleDollarSign className='w-4 h-4' fill='currentColor' /> {form.watch("price")} USD
                            </Badge>
                        )}

                        {form.watch("stock") && Number(form.watch("stock")) >= 0 && (
                            <Badge
                                variant={Number(form.watch("stock")) > 10 ? "default" : Number(form.watch("stock")) > 0 ? "secondary" : "destructive"}
                                className="text-xs"
                            >
                                <Boxes className='w-4 h-4' fill='currentColor' /> {form.watch("stock")} unidades
                            </Badge>
                        )}

                        {form.watch("supplier") && (
                            <Badge variant="outline" className="text-xs">
                                <Building2 className='w-4 h-4' fill='currentColor' /> {suppliers.find(s => s.value === form.watch("supplier"))?.label}
                            </Badge>
                        )}

                        {form.watch("image") && (
                            <Badge variant="default" className="text-xs">
                                📷 Imagen agregada
                            </Badge>
                        )}

                        {!form.watch("name") && !form.watch("category") && !form.watch("status") && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                                ✏️ Completa los campos para ver la vista previa
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">Información del Producto</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Layout de campos en grid 2x2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                {/* Fila 1: ID y Nombre */}
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID del Producto</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled
                                                    className="bg-muted cursor-not-allowed"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Identificador único generado automáticamente
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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

                                {/* Fila 2: Categoría y Estado */}
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

                                {/* Fila 3: Stock y Precio */}
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

                                {/* Fila 4: Proveedor y Descripción */}
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

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Descripción del producto (opcional)" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Información adicional sobre el producto
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Imagen del producto - Ocupa las 12 columnas completas */}
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

                            {/* Botones de acción */}
                            <div className="flex justify-end gap-3 pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={form.formState.isSubmitting}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? 'Creando...' : 'Crear Producto'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateProductPage
