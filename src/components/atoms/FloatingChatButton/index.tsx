"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles } from "lucide-react"

interface FloatingChatButtonProps {
  onClick: () => void
  isOpen: boolean
}

export function FloatingChatButton({ onClick, isOpen }: FloatingChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    console.log('FloatingChatButton clicked!', { isOpen })
    onClick()
  }

  const handleMouseEnter = () => {
    console.log('Mouse enter')
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    console.log('Mouse leave')
    setIsHovered(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none">
      {/* Tooltip */}
      {isHovered && !isOpen && (
        <div className="animate-in slide-in-from-bottom-2 duration-200 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-lg shadow-lg max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-1">
              <Bot className="h-4 w-4" />
              <span className="font-semibold text-sm">PharmaHub AI</span>
              <Sparkles className="h-3 w-3 text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-gray-300 dark:text-gray-600">
            Ask, search, or make anything
          </p>
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          h-14 w-14 rounded-full shadow-lg transition-all duration-300 border-2 pointer-events-auto relative z-[10000] cursor-pointer
          ${isOpen
            ? 'bg-red-500 hover:bg-red-600 border-red-400 scale-110'
            : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-blue-400 hover:scale-110'
          }
          hover:shadow-xl active:scale-95
        `}
        size="lg"
        type="button"
      >
        {isOpen ? (
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-white transform rotate-45"></div>
              <div className="w-4 h-0.5 bg-white transform -rotate-45 absolute"></div>
            </div>
          </div>
        ) : (
          <Bot className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  )
}
