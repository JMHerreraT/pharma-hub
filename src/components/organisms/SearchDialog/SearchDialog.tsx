"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Mail, User, Search, Calendar, FileText, Settings } from 'lucide-react'
import React, { useEffect } from 'react'
import { Command, CommandGroup, CommandEmpty, CommandInput, CommandList, CommandItem } from '@/components/ui/command'

const SearchDialog = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const searchItems = [
    {
      group: "Suggestions",
      items: [
        { icon: FileText, label: "Documentation", description: "Browse the docs" },
        { icon: Settings, label: "Settings", description: "Manage your preferences" },
        { icon: User, label: "Profile", description: "View your profile" },
      ],
    },
    {
      group: "Recent",
      items: [
        { icon: Calendar, label: "Calendar Events", description: "View upcoming events" },
        { icon: Mail, label: "Messages", description: "Check your messages" },
      ],
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <DialogHeader className="sr-only">
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" fill="currentColor" />
              <CommandInput
                placeholder="Type a command or search..."
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>No results found.</CommandEmpty>
              {searchItems.map((group) => (
                <CommandGroup key={group.group} heading={group.group}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.label}
                      className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:text-sidebar-accent-foreground"
                      onSelect={() => {
                        setIsOpen(false)
                        // Handle item selection here
                        console.log(`Selected: ${item.label}`)
                      }}
                    >
                      <item.icon className="h-4 w-4" fill="currentColor" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-xs">{item.description}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-foreground">
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium">
                  <span>↵</span>
                </kbd>
                <span>to select</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium">
                  <span>Esc</span>
                </kbd>
                <span>to close</span>
              </div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
  )
}

export default SearchDialog
