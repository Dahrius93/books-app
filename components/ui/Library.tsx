'use client'

import { deleteBookAction } from '@/utils/actions'
import { type Book } from '@/app/generated/prisma/client'

const Library = ({ books }: { books: Book[] }) => {
  return (
    <div>
      <div className="pt-4 text-center">
        <h1 className="text-2xl font-bold">Libreria</h1>
      </div>
      <div>
        <ul className="space-y-2 max-w-2xl">
          {books.map((book) => (
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
              {/* pulsante cancella dalla libreria */}
              <button
                className="bg-primary text-white rounded-2xl py-1 px-2 hover:shadow-lg cursor-pointer"
                onClick={() => deleteBookAction({ id: book.id })}
              >
                Elimina
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Library
