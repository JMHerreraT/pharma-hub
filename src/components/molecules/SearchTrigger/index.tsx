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
        className="border-input border-2 rounded-md cursor-pointer relative h-12 w-full justify-start bg-muted px-4 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted"
        onClick={onOpen}
      >
        <Search className="mr-3 h-4 w-4" />
        <span>Search a section...</span>
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border bg-muted/50 px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>
          <span className="text-xs">K</span>
        </kbd>
      </Button>
    </div>
  )
}
