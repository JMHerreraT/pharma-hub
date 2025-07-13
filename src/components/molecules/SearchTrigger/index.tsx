"use client"

import { Search, Command } from "lucide-react"
import { useMemo } from "react"

interface Props {
  onOpen: () => void
}

/** Hook mínimo para detectar macOS / Windows */
function useOS(): "mac" | "windows" | "other" {
  return useMemo(() => {
    if (typeof window === "undefined") return "other"
    const platform =
      (navigator as unknown as { userAgentData: { platform: string } }).userAgentData?.platform || navigator.platform

    if (/Mac|iPhone|iPod|iPad/i.test(platform)) return "mac"
    if (/Win/i.test(platform)) return "windows"
    return "other"
  }, [])
}

export function SearchTrigger({ onOpen }: Props) {
  const os = useOS()
  const isMac = os === "mac"

  return (
    <div className="relative cursor-pointer" onClick={onOpen}>
      <div className="flex items-center gap-3 px-4 py-3 bg-transparent rounded-full border
                      border-gray-200 hover:bg-gray-100 transition-colors dark:border-gray-700 dark:hover:bg-gray-800">
        <Search className="w-5 h-5 text-gray-500" fill="currentColor" />
        <span className="text-gray-500 flex-1">Search</span>

        {/* Atajo de teclado dinámico */}
        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs dark:bg-gray-800">
          {isMac ? (
            <>
              <Command className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>K</span>
            </>
          ) : (
            <>
              <span className="font-semibold">Ctrl</span>
              <span>K</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
