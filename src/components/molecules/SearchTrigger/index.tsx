"use client"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

interface Props {
  onOpen: () => void
}

/** Hook para detectar macOS / Windows con hidratación segura */
function useOS(): "mac" | "windows" | "other" {
  const [os, setOs] = useState<"mac" | "windows" | "other">("other")

  useEffect(() => {
    const platform =
      (navigator as unknown as { userAgentData: { platform: string } })?.userAgentData?.platform ||
      navigator.platform

    if (/Mac|iPhone|iPod|iPad/i.test(platform)) {
      setOs("mac")
    } else if (/Win/i.test(platform)) {
      setOs("windows")
    } else {
      setOs("other")
    }
  }, [])

  return os
}

export function SearchTrigger({ onOpen }: Props) {
  const os = useOS()
  const isMac = os === "mac"

  return (
    <div className="relative w-full max-w-2xl">
      <Button
        variant="ghost"
        className="border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer relative h-10 sm:h-11 md:h-12 w-full justify-start bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 text-sm font-normal text-gray-500 dark:text-gray-400 shadow-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        onClick={onOpen}
      >
        <Search className="mr-2 sm:mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
        <span className="text-xs sm:text-sm truncate">
          <span className="hidden sm:inline">Buscar productos, pedidos o clientes...</span>
          <span className="sm:hidden">Buscar...</span>
        </span>
        <div className="pointer-events-none absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
          <kbd className="inline-flex h-5 sm:h-6 min-w-[20px] sm:min-w-[24px] items-center justify-center rounded border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 px-1 sm:px-1.5 font-mono text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors">
            {isMac ? "⌘" : "Ctrl"}
          </kbd>
          <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">+</span>
          <kbd className="inline-flex h-5 sm:h-6 min-w-[20px] sm:min-w-[24px] items-center justify-center rounded border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 px-1 sm:px-1.5 font-mono text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors">
            K
          </kbd>
        </div>
      </Button>
    </div>
  )
}
