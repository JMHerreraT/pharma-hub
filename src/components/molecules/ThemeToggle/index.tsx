"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState(false);

  const isDark = theme === "dark"

  const toggleTheme = (value: boolean) => {
    if (isDark) {
      setTheme("light")
      setChecked(false)
    } else {
      setTheme("dark")
      setChecked(true)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <Sun className="size-4" />
      <Switch
        checked={checked}
        onCheckedChange={(value) => {
          toggleTheme(value);
        }}
        aria-label="Toggle theme"
      />
      <Moon className="size-4" />
    </div>
  )
}
