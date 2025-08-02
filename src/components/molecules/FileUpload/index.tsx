"use client"

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  value?: File | string | null
  className?: string
  maxSizeMB?: number
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  value,
  className,
  maxSizeMB = 5
}) => {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`El archivo debe ser menor a ${maxSizeMB}MB`)
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      onFileSelect(file)
    }
  }, [onFileSelect, maxSizeMB])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false
  })

  const handleRemove = () => {
    setPreview(null)
    onFileSelect(null)
  }

  // Show preview if we have a file or existing value
  const showPreview = preview || (typeof value === 'string' && value)
  const previewSrc = preview || (typeof value === 'string' ? value : '')

  return (
    <div className={cn("space-y-4", className)}>
      {!showPreview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-muted p-3">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragActive ? "Suelta la imagen aquí" : "Arrastra una imagen o haz clic para seleccionar"}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, JPEG hasta {maxSizeMB}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative rounded-lg overflow-hidden border bg-muted">
            <div className="aspect-square w-32 mx-auto">
              {previewSrc ? (
                <Image
                  src={previewSrc}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 h-7 w-7 p-0 rounded-full bg-background border shadow-sm"
          >
            <X className="h-3 w-3" />
          </Button>
          <div className="mt-2 text-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                handleRemove()
                // Trigger file selector again
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files
                  if (files && files[0]) {
                    onDrop([files[0]])
                  }
                }
                input.click()
              }}
              className="text-xs"
            >
              Cambiar imagen
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload
