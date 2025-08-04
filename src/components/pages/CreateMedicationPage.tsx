"use client"

import React, { useEffect, useState, useRef } from 'react'
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
import { ArrowLeft, BadgeCheck, Box, Boxes, Building2, CircleDollarSign, Pill, Tag, Calendar, Beaker, Shield } from 'lucide-react'
import FileUpload from '@/components/molecules/FileUpload'
import { InputWithChips } from '@/components/ui/input-with-chips'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'

// IA Mock - Base de datos de medicamentos y sus compuestos
const MEDICATION_DATABASE: Record<string, string[]> = {
  "paracetamol": ["Acetaminofén"],
  "ibuprofeno": ["Ibuprofeno"],
  "aspirina": ["Ácido acetilsalicílico"],
  "amoxicilina": ["Amoxicilina"],
  "omeprazol": ["Omeprazol"],
  "loratadina": ["Loratadina"],
  "metformina": ["Metformina"],
  "losartan": ["Losartán"],
  "atorvastatina": ["Atorvastatina"],
  "levotiroxina": ["Levotiroxina sódica"],
  "captopril": ["Captopril"],
  "furosemida": ["Furosemida"],
  "diclofenaco": ["Diclofenaco sódico"],
  "ranitidina": ["Ranitidina clorhidrato"],
  "ciprofloxacino": ["Ciprofloxacino"],
  "ketoconazol": ["Ketoconazol"],
  "prednisona": ["Prednisona"],
  "salbutamol": ["Salbutamol sulfato"],
  "insulina": ["Insulina humana"],
  "tramadol": ["Tramadol clorhidrato"],
  "acetaminofen": ["Acetaminofén"],
  "acetaminofén": ["Acetaminofén"],
  "tylenol": ["Acetaminofén"],
  "advil": ["Ibuprofeno"],
  "motrin": ["Ibuprofeno"],
  "bayer": ["Ácido acetilsalicílico"],
  "nexium": ["Esomeprazol"],
  "prilosec": ["Omeprazol"],
  "claritin": ["Loratadina"],
  "glucophage": ["Metformina"],
  "cozaar": ["Losartán"],
  "lipitor": ["Atorvastatina"],
  "synthroid": ["Levotiroxina sódica"]
}

// Función de IA para detectar compuestos
const detectCompounds = (medicationName: string): string[] => {
  if (!medicationName || medicationName.length < 3) return []

  const normalizedName = medicationName.toLowerCase().trim()

  // Buscar coincidencias exactas
  if (MEDICATION_DATABASE[normalizedName]) {
    return MEDICATION_DATABASE[normalizedName]
  }

  // Buscar coincidencias parciales
  for (const [key, compounds] of Object.entries(MEDICATION_DATABASE)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return compounds
    }
  }

  return []
}

// Schema del formulario para medicamentos
const formSchema = z.object({
    id: z.string(),
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    compounds: z.array(z.string()).min(1, {
        message: "Al menos un compuesto es requerido.",
    }),
    category: z.string().min(1, {
        message: "La categoría es requerida.",
    }),
    type: z.string().min(1, {
        message: "El tipo es requerido.",
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
    expirationDate: z.string().min(1, {
        message: "La fecha de vencimiento es requerida.",
    }),
    supplier: z.string().min(1, {
        message: "El proveedor es requerido.",
    }),
    batchNumber: z.string().optional(),
    description: z.string().optional(),
    image: z.instanceof(File).optional().or(z.string().optional()),
})

const medicationCategories = [
    { value: "analgesicos", label: "Analgésicos" },
    { value: "antibioticos", label: "Antibióticos" },
    { value: "antiinflamatorios", label: "Antiinflamatorios" },
    { value: "cardiovasculares", label: "Cardiovasculares" },
    { value: "respiratorios", label: "Respiratorios" },
    { value: "gastrointestinales", label: "Gastrointestinales" },
    { value: "neurologicos", label: "Neurológicos" },
    { value: "diabetes", label: "Diabetes" },
    { value: "vitaminas", label: "Vitaminas" },
]

const medicationTypes = [
    { value: "marca", label: "Marca" },
    { value: "generico", label: "Genérico" },
    { value: "biosimilar", label: "Biosimilar" },
]

const medicationStatuses = [
    { value: "disponible", label: "Disponible" },
    { value: "agotado", label: "Agotado" },
    { value: "vencido", label: "Vencido" },
    { value: "retirado", label: "Retirado del mercado" },
]

const suppliers = [
    { value: "pharmaplus", label: "PharmaPlus" },
    { value: "medline-solutions", label: "Medline Solutions" },
    { value: "global-pharma", label: "Global Pharma" },
    { value: "biotech-meds", label: "BioTech Meds" },
    { value: "national-drugs", label: "National Drugs" },
]

const CreateMedicationPage = () => {
    const router = useRouter()
    const [pageTitle, setPageTitle] = useState("Nuevo Medicamento")
    const [medicationId] = useState(() => uuidv4())
    const [isAIProcessing, setIsAIProcessing] = useState(false)
    const aiTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: medicationId,
            name: "",
            compounds: [],
            category: "",
            type: "",
            status: "",
            stock: "0",
            price: "0",
            expirationDate: "",
            supplier: "",
            batchNumber: "",
            description: "",
            image: undefined,
        },
    })

    // Actualizar título dinámicamente basado en nombre e imagen
    useEffect(() => {
        const subscription = form.watch((values) => {
            let title = "Nuevo Medicamento"

            if (values.name && values.name.trim()) {
                title = values.name

                // Si tiene imagen, agregar indicador
                if (values.image) {
                    title += " 💊"
                }
            } else if (values.image) {
                title = "Medicamento con imagen 💊"
            }

            setPageTitle(title)
        })
        return () => subscription.unsubscribe()
    }, [form])

    // IA: Detectar compuestos automáticamente cuando cambia el nombre
    useEffect(() => {
        const subscription = form.watch((values, { name: fieldName }) => {
            // Solo procesar cuando cambie el campo "name"
            if (fieldName === 'name' && values.name) {
                // Limpiar timeout anterior
                if (aiTimeoutRef.current) {
                    clearTimeout(aiTimeoutRef.current)
                }

                // Mostrar que la IA está procesando
                setIsAIProcessing(true)

                // Ejecutar detección de compuestos después de 1 segundo
                aiTimeoutRef.current = setTimeout(() => {
                    const detectedCompounds = detectCompounds(values.name || '')

                    if (detectedCompounds.length > 0) {
                        // Solo agregar compuestos que no estén ya en la lista
                        const currentCompounds = values.compounds || []
                        const newCompounds = detectedCompounds.filter(
                            compound => !currentCompounds.includes(compound)
                        )

                        if (newCompounds.length > 0) {
                            const updatedCompounds = [...currentCompounds, ...newCompounds]
                            form.setValue('compounds', updatedCompounds as string[])

                            // Mostrar notificación
                            toast.success(
                                `✨ IA detectó ${newCompounds.length} compuesto${newCompounds.length !== 1 ? 's' : ''}: ${newCompounds.join(', ')}`
                            )
                        }
                    }

                    setIsAIProcessing(false)
                }, 1000)
            }
        })

        return () => {
            subscription.unsubscribe()
            if (aiTimeoutRef.current) {
                clearTimeout(aiTimeoutRef.current)
            }
        }
    }, [form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const processedValues = {
                ...values,
                stock: Number(values.stock),
                price: Number(values.price),
            }

            console.log('Guardando medicamento:', processedValues)

            setTimeout(() => {
                toast.success('Medicamento creado exitosamente')
                router.push('/dashboard/medications')
            }, 1000)

        } catch (error) {
            toast.error('Error al crear el medicamento')
            console.error('Error:', error)
        }
    }

    const handleCancel = () => {
        router.push('/dashboard/medications')
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
                            <Pill className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">{pageTitle}</h1>
                            <p className="text-muted-foreground">Crear un nuevo medicamento para el inventario</p>
                        </div>
                    </div>

                    {/* Vista Previa con Badges */}
                    <div className="flex flex-wrap gap-2">
                        {form.watch("name") && (
                            <Badge variant="secondary" className="text-xs">
                                <Box className='w-4 h-4' fill='currentColor' /> {form.watch("name")}
                            </Badge>
                        )}

                        {form.watch("compounds") && form.watch("compounds").length > 0 && (
                            <Badge variant="outline" className="text-xs">
                                <Beaker className='w-4 h-4' fill='currentColor' />
                                ✨ {form.watch("compounds").join(", ")} ({form.watch("compounds").length} compuesto{form.watch("compounds").length !== 1 ? 's' : ''})
                            </Badge>
                        )}

                        {form.watch("type") && (
                            <Badge variant="outline" className="text-xs">
                                <Shield className='w-4 h-4' fill='currentColor' /> {medicationTypes.find(t => t.value === form.watch("type"))?.label}
                            </Badge>
                        )}

                        {form.watch("category") && (
                            <Badge variant="outline" className="text-xs">
                                <BadgeCheck className='w-4 h-4' fill='currentColor' /> {medicationCategories.find(c => c.value === form.watch("category"))?.label}
                            </Badge>
                        )}

                        {form.watch("status") && (
                            <Badge
                                variant={
                                    form.watch("status") === "disponible" ? "default" :
                                    form.watch("status") === "agotado" ? "destructive" :
                                    form.watch("status") === "vencido" ? "destructive" : "secondary"
                                }
                                className="text-xs"
                            >
                                <Tag className='w-4 h-4' fill='currentColor' /> {medicationStatuses.find(s => s.value === form.watch("status"))?.label}
                            </Badge>
                        )}

                        {form.watch("expirationDate") && (
                            <Badge variant="outline" className="text-xs">
                                <Calendar className='w-4 h-4' fill='currentColor' /> Vence: {form.watch("expirationDate")}
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
                                💊 Imagen agregada
                            </Badge>
                        )}

                        {!form.watch("name") && !form.watch("compounds") && !form.watch("category") && (
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
                    <CardTitle className="text-lg lg:text-xl">Información del Medicamento</CardTitle>
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
                                            <FormLabel>ID del Medicamento</FormLabel>
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
                                            <FormLabel className="flex items-center gap-2">
                                                Nombre del Medicamento
                                                {isAIProcessing && (
                                                    <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                                                        <Sparkles className="h-3 w-3 animate-pulse" />
                                                        IA detectando...
                                                    </span>
                                                )}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Ej: Paracetamol 500mg, Ibuprofeno, Amoxicilina..."
                                                        className={isAIProcessing ? "border-blue-300 dark:border-blue-600" : ""}
                                                        {...field}
                                                    />
                                                    {isAIProcessing && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                🤖 La IA detectará automáticamente los compuestos activos al escribir el nombre
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Fila 2: Compuestos y Tipo */}
                                <FormField
                                    control={form.control}
                                    name="compounds"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Beaker className="h-4 w-4" />
                                                Compuestos Activos
                                                <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                                    ✨ IA
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <InputWithChips
                                                    chips={field.value || []}
                                                    onChipsChange={field.onChange}
                                                    enableAI={false}
                                                    placeholder="Agregar compuestos adicionales manualmente..."
                                                    chipVariant="success"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                ✨ Los compuestos se detectan automáticamente. Aquí puedes eliminar o agregar compuestos adicionales
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar tipo" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {medicationTypes.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            {type.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Fila 3: Categoría y Estado */}
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
                                                    {medicationCategories.map((category) => (
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
                                                    {medicationStatuses.map((status) => (
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

                                {/* Fila 4: Fecha de vencimiento y Lote */}
                                <FormField
                                    control={form.control}
                                    name="expirationDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fecha de Vencimiento</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Fecha límite para uso del medicamento
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="batchNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de Lote</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ej: LT240115" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Lote de fabricación (opcional)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Fila 5: Stock y Precio */}
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

                                {/* Fila 6: Proveedor y Descripción */}
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
                                                <Input placeholder="Descripción del medicamento (opcional)" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Información adicional sobre el medicamento
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Imagen del medicamento - Ocupa las 12 columnas completas */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imagen del Medicamento</FormLabel>
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
                                    {form.formState.isSubmitting ? 'Creando...' : 'Crear Medicamento'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateMedicationPage
