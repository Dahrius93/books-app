import { NextResponse } from 'next/server'
import { mapDocs } from '@/lib/openLibrary'

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query troppo corta' }, { status: 400 })
  }

  const url = new URL('https://openlibrary.org/search.json')
  url.searchParams.set('q', q)
  url.searchParams.set('limit', '10')
  url.searchParams.set(
    'fields',
    'key,title,author_name,cover_i,first_publish_year',
  )

  const res = await fetch(url, {
    headers: { 'User-Agent': 'ReadingList/1.0 (tua-email@esempio.com)' },
  })
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Open Library non risponde' },
      { status: 502 },
    )
  }

  const data = await res.json()
  return NextResponse.json(mapDocs(data.docs))
}
