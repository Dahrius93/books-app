'use client'
import { useEffect, useState } from 'react'
import type { BookResult } from '@/lib/openLibrary'
import { addToLibrary } from '@/utils/actions'

export function BookSearch({ savedIds }: { savedIds: string[] }) {
  const [query, setQuery] = useState('') // stato input
  const [results, setResults] = useState<BookResult[]>([]) // stato risultati da fetch
  const [loading, setLoading] = useState(false) // stato in caricamento durante fetch

  const q = query.trim() // tolgo spazi bianchi dall'input
  const canSearch = q.length >= 2 // permesso per cercare
  const saved = new Set(savedIds) // id libri in libreria

  // fetch della ricerca
  useEffect(() => {
    if (!canSearch) return

    const controller = new AbortController()

    // avvio il fetch quando smetto di scrivere
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error('Errore nella ricerca')
        setResults(await res.json())
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setResults([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [q, canSearch])

  const visibleResults = canSearch ? results : [] // risultato ricerca
  const isLoading = canSearch && loading // in caricamento

  return (
    <div className="space-y-4 w-2xl">
      {/* input ricerca */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca un libro..."
        className="w-full rounded-md border px-3 py-2"
      />

      {/* fetch risultati */}
      {isLoading && <p className="text-sm text-muted-foreground">Cerco...</p>}

      {/* nessun risultato trovato dalla ricerca */}
      {canSearch && !isLoading && visibleResults.length === 0 && (
        <p className="text-sm text-muted-foreground">Nessun risultato</p>
      )}

      {/* map dei risultati */}
      <ul className="space-y-2 max-w-2xl">
        {visibleResults.map((book) => (
          <li key={book.id} className="flex items-center gap-3">
            {/* caso in cui ho l'immagine allora la mostro altrimenti riquadro scuro */}
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt=""
                className="h-16 w-11 rounded object-cover"
              />
            ) : (
              <div className="h-16 w-11 rounded bg-muted" />
            )}
            <div>
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-muted-foreground">
                {book.author}
                {book.year && ` · ${book.year}`}
              </p>
            </div>
            {/* pulsante aggiungi in libreria */}
            {saved.has(book.id) ? (
              <button className="bg-muted text-black rounded-2xl py-1 px-2 hover:shadow-lg">
                Aggiunto
              </button>
            ) : (
              <button
                className="bg-primary text-white rounded-2xl py-1 px-2 hover:shadow-lg cursor-pointer"
                onClick={() => addToLibrary({ book })}
              >
                Aggiungi
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
