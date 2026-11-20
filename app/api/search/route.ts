import { NextResponse } from 'next/server'
import { mapDocs } from '@/lib/openLibrary'

/**!SECTION
 *
 * route per fare il fetch dei libri
 * utilizzando una chiave di recerca
 *
 */
export async function GET(req: Request) {
  // ritrovo il parametro q utilizzato per il libro da cercare
  const q = new URL(req.url).searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query troppo corta' }, { status: 400 })
  }

  // imposto url e parametri di ricerca
  const url = new URL('https://openlibrary.org/search.json')
  url.searchParams.set('q', q) // libro da cercare
  url.searchParams.set('limit', '100') // limite
  url.searchParams.set(
    'fields',
    'key,title,author_name,cover_i,first_publish_year', // dati che voglio ottenere
  )

  // avvio il fetch
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

  // ritorno il map del tipo OLDoc[] su BookResult[]
  // il tipo risultato è BookResult[]
  return NextResponse.json(mapDocs(data.docs))
}
