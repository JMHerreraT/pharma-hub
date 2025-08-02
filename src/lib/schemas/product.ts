import { z } from "zod"

export const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  category: z.string().min(1, {
    message: "La categoría es requerida.",
  }),
  status: z.string().min(1, {
    message: "El estado es requerido.",
  }),
  stock: z.coerce.number().min(0, {
    message: "El stock debe ser mayor o igual a 0.",
  }),
  price: z.coerce.number().min(0.01, {
    message: "El precio debe ser mayor a 0.",
  }),
  supplier: z.string().min(1, {
    message: "El proveedor es requerido.",
  }),
  image: z.instanceof(File).optional().or(z.string().optional()),
})

export type ProductFormValues = z.infer<typeof productFormSchema>

export const productCategories = [
  { value: "medicamentos", label: "Medicamentos" },
  { value: "vitaminas", label: "Vitaminas" },
  { value: "cosmeticos", label: "Cosméticos" },
  { value: "higiene", label: "Higiene Personal" },
  { value: "equipos", label: "Equipos Médicos" },
]

export const productStatuses = [
  { value: "disponible", label: "Disponible" },
  { value: "agotado", label: "Agotado" },
  { value: "descontinuado", label: "Descontinuado" },
]

export const suppliers = [
  { value: "medsupply-co", label: "MedSupply Co" },
  { value: "pharmacorp", label: "PharmaCorp" },
  { value: "healthdistributors", label: "HealthDistributors" },
  { value: "medplus", label: "MedPlus Solutions" },
  { value: "pharmatech", label: "PharmaTech Inc" },
]
