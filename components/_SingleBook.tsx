'use client'

import { Book } from '@/app/generated/prisma/client'
import { deleteBookAction } from '@/utils/actions'

const SingleBook = ({ book }: { book: Book }) => {
  return (
    <>
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
    </>
  )
}

export default SingleBook
