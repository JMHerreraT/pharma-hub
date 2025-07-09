"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, Check, MapPin, Building2 } from "lucide-react"
import Image from "next/image"

interface Branch {
    id: string
    name: string
    description: string
    image: string
    isActive?: boolean
}

export default function BranchSelectorPopover() {
    const [selectedBranch, setSelectedBranch] = useState<Branch>({
        id: "1",
        name: "Pharmacy Branch 1",
        description: "Molina Branch",
        image: "https://i.pravatar.cc/300",
        isActive: true,
    })

    const [isOpen, setIsOpen] = useState(false)

    const branches: Branch[] = [
        {
            id: "1",
            name: "Pharmacy Branch 1",
            description: "Molina Branch",
            image: "https://i.pravatar.cc/300",
            isActive: true,
        },
        {
            id: "2",
            name: "Pharmacy Branch 2",
            description: "Downtown Branch",
            image: "https://i.pravatar.cc/300",
            isActive: true,
        },
        {
            id: "3",
            name: "Pharmacy Branch 3",
            description: "Westside Branch",
            image: "https://i.pravatar.cc/300",
            isActive: false,
        },
        {
            id: "4",
            name: "Pharmacy Branch 4",
            description: "North Branch",
            image: "https://i.pravatar.cc/300",
            isActive: true,
        },
    ]

    const handleBranchSelect = (branch: Branch) => {
        setSelectedBranch(branch)
        setIsOpen(false)
    }

    return (
        <div className="flex items-center justify-center bg-gray-100 space-y-2 px-4 py-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size={'sm'}
                        className="justify-between bg-primary-foreground/20 hover:bg-primary/10 border-gray-200/60 h-auto p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex items-center gap-1">
                            <div className="relative">
                                <Image
                                    src={selectedBranch.image || "/placeholder.svg"}
                                    alt={selectedBranch.name}
                                    className="relative w-10 h-10 rounded-full object-cover"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-base text-gray-900 leading-tight">{selectedBranch.name}</div>
                                <div className="text-sm text-gray-500 leading-tight">{selectedBranch.description}</div>
                            </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 rounded-2xl shadow-2xl border-gray-200/60" align="start" sideOffset={8}>
                    <div className="bg-white rounded-2xl overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{selectedBranch.name}</h3>
                                    <p className="text-sm text-gray-500 leading-tight mt-0.5">{selectedBranch.description}</p>
                                </div>
                                <div className="relative">
                                    <Image
                                        src={selectedBranch.image || "/placeholder.svg"}
                                        alt={selectedBranch.name}
                                        className="relative w-12 h-12 rounded-full object-cover"
                                        width={48}
                                        height={48}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Branch List */}
                        <div className="py-2">
                            {branches.map((branch, index) => (
                                <button
                                    key={branch.id}
                                    onClick={() => handleBranchSelect(branch)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left group ${index === 0 ? "bg-gray-50" : ""
                                        } ${!branch.isActive ? "opacity-50 cursor-not-allowed hover:bg-none" : ""}`}
                                    disabled={!branch.isActive}
                                >
                                    <div className="relative flex-shrink-0">
                                        <Building2 className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-base text-gray-900 leading-tight group-hover:text-gray-700">
                                            {branch.name}
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-3 flex-shrink-0`}>
                                        {!branch.isActive && (
                                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Offline</span>
                                        )}
                                        {selectedBranch.id === branch.id && <Check className="w-4 h-4 text-blue-500" />}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                            <button className="w-full flex items-center gap-3 text-left py-2 px-2 rounded-lg hover:bg-white transition-colors group">
                                <MapPin className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                                <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900">Manage Branches</span>
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
