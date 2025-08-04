import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Chip } from "@/components/ui/chip"
import { Sparkles, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export interface InputWithChipsProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  chips: string[]
  onChipsChange: (chips: string[]) => void
  enableAI?: boolean
  aiTriggerDelay?: number
  placeholder?: string
  chipVariant?: "default" | "secondary" | "success" | "warning" | "info" | "outline"
}

const InputWithChips = React.forwardRef<HTMLInputElement, InputWithChipsProps>(
  ({
    className,
    chips = [],
    onChipsChange,
    enableAI = false,
    aiTriggerDelay = 1000,
    placeholder = "",
    chipVariant = "secondary",
    ...props
  }, ref) => {
    const [inputValue, setInputValue] = React.useState("")
    const [isAIProcessing, setIsAIProcessing] = React.useState(false)
    const [suggestedChips, setSuggestedChips] = React.useState<string[]>([])
    const aiTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    // Efecto para la IA - detectar compuestos automáticamente
    React.useEffect(() => {
      if (!enableAI || !inputValue) {
        setSuggestedChips([])
        return
      }

      // Limpiar timeout anterior
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current)
      }

      // Simular procesamiento de IA
      setIsAIProcessing(true)

      aiTimeoutRef.current = setTimeout(() => {
        const detected = detectCompounds(inputValue)
        const newSuggestions = detected.filter(compound => !chips.includes(compound))
        setSuggestedChips(newSuggestions)
        setIsAIProcessing(false)
      }, aiTriggerDelay)

      return () => {
        if (aiTimeoutRef.current) {
          clearTimeout(aiTimeoutRef.current)
        }
      }
    }, [inputValue, enableAI, aiTriggerDelay, chips])

    const addChip = (chip: string) => {
      if (chip.trim() && !chips.includes(chip.trim())) {
        onChipsChange([...chips, chip.trim()])
      }
    }

    const removeChip = (index: number) => {
      const newChips = chips.filter((_, i) => i !== index)
      onChipsChange(newChips)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault()
        addChip(inputValue)
        setInputValue("")
      }
    }

    const applySuggestedChips = () => {
      const newChips = [...chips, ...suggestedChips]
      onChipsChange(newChips)
      setSuggestedChips([])
    }

    const dismissSuggestions = () => {
      setSuggestedChips([])
    }

    return (
      <div className="space-y-3">
        {/* Input principal */}
        <div className="relative">
          <Input
            ref={ref}
            className={cn(
              "pr-10",
              enableAI && isAIProcessing && "border-blue-300 dark:border-blue-600",
              className
            )}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            {...props}
          />
          {enableAI && isAIProcessing && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
            </div>
          )}
        </div>

        {/* Sugerencias de IA */}
        {enableAI && suggestedChips.length > 0 && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                IA detectó estos compuestos:
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedChips.map((chip, index) => (
                <Chip
                  key={index}
                  variant="info"
                  className="animate-in fade-in-50 duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {chip}
                </Chip>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={applySuggestedChips}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Agregar todos
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={dismissSuggestions}
                className="text-xs"
              >
                Descartar
              </Button>
            </div>
          </div>
        )}

        {/* Chips existentes */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <Chip
                key={index}
                variant={chipVariant}
                removable
                onRemove={() => removeChip(index)}
                className="animate-in fade-in-50 duration-200"
              >
                {chip}
              </Chip>
            ))}
          </div>
        )}

        {/* Instrucciones */}
        <p className="text-xs text-muted-foreground">
          {enableAI ? (
            <>
              <Sparkles className="inline h-3 w-3 mr-1" />
              La IA detectará compuestos automáticamente. Presiona Enter para agregar compuestos manualmente.
            </>
          ) : (
            "Presiona Enter para agregar un compuesto"
          )}
        </p>
      </div>
    )
  }
)

InputWithChips.displayName = "InputWithChips"

export { InputWithChips }
