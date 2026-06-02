'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, LinkIcon } from 'lucide-react'

interface LogoUploadProps {
  currentLogo: string | null
  onLogoChange: (url: string | null) => void
}

export function LogoUpload({ currentLogo, onLogoChange }: LogoUploadProps) {
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      setError('Veuillez entrer une URL valide')
      return false
    }
  }

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Veuillez entrer une URL')
      return
    }

    if (validateUrl(urlInput)) {
      onLogoChange(urlInput)
      setUrlInput('')
      setError(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlSubmit()
    }
  }

  return (
    <div className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/50 rounded text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Logo Preview */}
      {currentLogo && (
        <div className="relative w-32 h-32 rounded-lg border border-border/50 bg-secondary flex items-center justify-center overflow-hidden">
          <Image
            src={currentLogo}
            alt="Logo"
            fill
            className="object-contain p-2"
            unoptimized
          />
          <button
            onClick={() => onLogoChange(null)}
            className="absolute top-1 right-1 bg-destructive/80 hover:bg-destructive text-white rounded p-1"
            aria-label="Remove logo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* URL Input */}
      {!currentLogo && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="logoUrl" className="text-sm flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              URL du logo
            </Label>
            <div className="flex gap-2">
              <Input
                id="logoUrl"
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value)
                  setError(null)
                }}
                onKeyPress={handleKeyPress}
                placeholder="https://exemple.com/logo.png"
                className="text-sm"
              />
              <Button
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim()}
                size="sm"
              >
                Ajouter
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Collez l&apos;URL directe d&apos;une image (JPEG, PNG, WebP, SVG, GIF)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
