'use client'
import { useEffect, useState } from 'react'
import type { BookResult } from '@/lib/openLibrary'

export function BookSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BookResult[]>([])
  const [loading, setLoading] = useState(false)

  // Valori derivati: calcolati a ogni render, non salvati nello stato
  const q = query.trim()
  const canSearch = q.length >= 2

  useEffect(() => {
    if (!canSearch) return

    const controller = new AbortController()
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

  const visibleResults = canSearch ? results : []
  const isLoading = canSearch && loading

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca un libro..."
        className="w-full rounded-md border px-3 py-2"
      />

      {isLoading && <p className="text-sm text-muted-foreground">Cerco...</p>}

      {canSearch && !isLoading && visibleResults.length === 0 && (
        <p className="text-sm text-muted-foreground">Nessun risultato</p>
      )}

      <ul className="space-y-2">
        {visibleResults.map((book) => (
          <li key={book.id} className="flex items-center gap-3">
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
          </li>
        ))}
      </ul>
    </div>
  )
}
