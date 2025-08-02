"use client"

import React from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductAvatarProps {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const ProductAvatar: React.FC<ProductAvatarProps> = ({
  src,
  alt = 'Producto',
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  return (
    <div className={cn(
      'rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0',
      sizeClasses[size],
      className
    )}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <Package className={cn('text-muted-foreground', iconSizes[size])} />
        </div>
      )}
    </div>
  )
}

export default ProductAvatar
