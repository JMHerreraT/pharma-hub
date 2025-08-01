"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const isDark = theme === "dark"

  // Evitar hidration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 w-9 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      ) : (
        <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
