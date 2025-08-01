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
    <div className="relative">
      <Button
        variant="ghost"
        className="border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer relative h-10 w-full justify-start bg-gray-50 dark:bg-gray-800 px-4 text-sm font-normal text-gray-500 dark:text-gray-400 shadow-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={onOpen}
      >
        <Search className="mr-3 h-4 w-4" />
        <span>Search products, orders, or customers...</span>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden items-center gap-1 sm:flex">
          <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 px-1.5 font-mono text-xs font-medium text-gray-500 dark:text-gray-400">
            {isMac ? "⌘" : "Ctrl"}
          </kbd>
          <span className="text-xs text-gray-400 dark:text-gray-500">+</span>
          <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 px-1.5 font-mono text-xs font-medium text-gray-500 dark:text-gray-400">
            K
          </kbd>
        </div>
      </Button>
    </div>
  )
}
