"use client"

import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Command, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { mockResults } from '@/lib/command-search-helpers'

const SearchDialog = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const [searchQuery, setSearchQuery] = useState("")

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Group results by category
  const groupedResults = mockResults.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, typeof mockResults>,
  )

  const filteredResults = Object.entries(groupedResults).reduce(
    (acc, [category, results]) => {
      const filtered = results.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, typeof mockResults>,
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogContent
        className="sm:max-w-lg"
        showCloseButton={false}
      >
        <DialogTitle className="hidden">{''}</DialogTitle>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 flex-shrink-0">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search or ask a question in OpenLoop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-base"
              autoFocus
            />
          </div>
          <div className="flex-1 w-full overflow-y-auto min-h-0 p-4 space-y-6 max-h-[600px]">
            {/* Results - Fixed height with scroll */}
            {Object.entries(filteredResults).map(([category, results]) => (
              <div key={category} className="sm:max-w-md">
                <h3 className="text-sm font-medium text-gray-500 mb-3">{category}</h3>
                <div className="w-full space-y-1">
                  {results.map((result) => {
                    const IconComponent = result.icon
                    return (
                      <div
                        key={result.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{result.title}</div>
                          {result.subtitle && (
                            <div className="text-sm text-gray-500 truncate">{result.subtitle}</div>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{result.date}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          {/* Footer - Fixed at bottom */}
          <DialogFooter className="border-t border-gray-200">
          {/* <div className="border-t p-3 bg-gray-50 flex-shrink-0"> */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span className="text-xs">K</span> Command Search
              </span>
            </div>
          {/* </div> */}
          </DialogFooter>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog
