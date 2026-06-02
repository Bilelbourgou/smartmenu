import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File must be less than 5MB' }, { status: 400 })
    }

    // Create unique filename with timestamp
    const timestamp = Date.now()
    const filename = `logos/${timestamp}-${file.name}`

    // Upload to Blob storage (public access for menu display)
    const blob = await put(filename, file, {
      access: 'public',
    })

    console.log('[v0] Logo uploaded successfully:', { 
      pathname: blob.pathname,
      url: blob.url,
      contentType: blob.contentType 
    })

    // Return the URL for public storage
    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('[v0] Upload error:', error)
    return NextResponse.json({ 
      error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}
