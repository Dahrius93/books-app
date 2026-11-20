/** Json su query
 * https://openlibrary.org/search.json?q=il+nome+della+rosa&limit=1&fields=key,title,author_name,cover_i,first_publish_year
 * 
 {
  "numFound": 36,
  "start": 0,
  "numFoundExact": true,
  "num_found": 36,
  "documentation_url": "https://openlibrary.org/dev/docs/api/search",
  "q": "il nome della rosa",
  "offset": null,
  "docs": [
    {
      "author_name": [
        "Umberto Eco"
      ],
      "cover_i": 8598263,
      "first_publish_year": 1980,
      "key": "/works/OL8996439W",
      "title": "Il nome della rosa"
    }
  ]
}
 */

// openLibrary type that are needed
type OLDoc = {
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  key: string
  title: string
}

// custom type used for OpenLibrary
// it is needed because of author and coverUrl
// needs to be composed
export type BookResult = {
  id: string
  title: string
  author: string
  coverUrl: string | null
  year: number | null
}

export function mapDocs(docs: OLDoc[]): BookResult[] {
  return docs.map((d) => ({
    id: d.key,
    title: d.title,
    author: d.author_name?.join(', ') ?? 'Autore sconosciuto',
    coverUrl: d.cover_i
      ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
      : null,
    year: d.first_publish_year ?? null,
  }))
}
