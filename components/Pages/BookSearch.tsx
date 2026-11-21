'use client'
import { useEffect, useState } from 'react'
import type { BookResult } from '@/lib/openLibrary'
import { addToLibrary } from '@/utils/actions'
import SingleBook from '../SingleBook'
import { toast } from '../ui/toast'

/**!SECTION
 *
 *
 * Componente che tramite un campo di recerca chiama API OpenLibrary e cerca
 * il libro corrispondente alla ricerca
 *
 * riceve workId dei libri in libreria per fare un rendering condizionale
 * del pulsante "aggiungi" in libreria
 *
 *
 *
 *
 */
export function BookSearch({ savedIds }: { savedIds: string[] }) {
  const [query, setQuery] = useState('') // stato campo input
  const [results, setResults] = useState<BookResult[]>([]) // stato risultati da fetch
  const [loading, setLoading] = useState(false) // stato in caricamento durante fetch

  const q = query.trim() // tolgo spazi bianchi all'inzio dall'input
  const canSearch = q.length >= 2 // ricerca consentita se input > di 2 caratteri
  const saved = new Set(savedIds) // id libri in libreria

  // fetch dei libri
  useEffect(() => {
    if (!canSearch) return

    // mi permette di cancellare la richiesta precedente se aspetto troppo e
    // poi continuo a scrivere. Risolve la raceCondition
    const controller = new AbortController()
    const signal = controller.signal

    // avvio il fetch quando smetto di scrivere
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: signal,
        })
        if (!res.ok) throw new Error('Errore nella ricerca')
        setResults(await res.json())
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setResults([])
      } finally {
        if (!signal.aborted) setLoading(false)
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
    <>
      <div className="flex justify-center mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un libro..."
          className="w-full max-w-sm rounded-md border p-2"
        />
      </div>

      <div className="space-y-4 ">
        {/* input ricerca */}

        {/* fetch risultati in corso */}
        {isLoading && <p className="text-sm text-muted-foreground">Cerco...</p>}

        {/* nessun risultato trovato dalla ricerca */}
        {canSearch && !isLoading && visibleResults.length === 0 && (
          <p className="text-sm text-muted-foreground">Nessun risultato</p>
        )}

        {/* map dei risultati ottenuti */}
        <ul className="space-y-2 max-w-lg">
          {visibleResults.map((book) => (
            <li key={book.id} className="flex items-center gap-3">
              <SingleBook
                author={book.author}
                title={book.title}
                coverUrl={book.coverUrl}
                year={book.year}
              />
              {/* pulsante aggiungi in libreria */}
              {saved.has(book.id) ? (
                <button
                  disabled
                  className="bg-muted text-black rounded-2xl py-1 px-2"
                >
                  Aggiunto
                </button>
              ) : (
                <button
                  className="bg-primary text-white rounded-2xl py-1 px-2 hover:shadow-lg cursor-pointer"
                  onClick={async () => {
                    const resp = await addToLibrary({ book })
                    toast.add({ title: resp.message })
                  }}
                >
                  Aggiungi
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
