"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthOptionCardProps {
  icon: LucideIcon
  title: string
  description: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

const AuthOptionCard: React.FC<AuthOptionCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  variant = 'primary'
}) => {
  return (
        <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg border-2 hover:scale-[1.02]",
        variant === 'primary'
          ? "border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10"
          : "border-secondary/20 hover:border-secondary/40 bg-secondary/5 hover:bg-secondary/10"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
            variant === 'primary'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}>
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AuthOptionCard
