'use client'

import { deleteBookAction } from '@/utils/actions'
import { type Book } from '@/app/generated/prisma/client'
import SingleBook from '../SingleBook'

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
              <SingleBook
                author={book.author}
                title={book.title}
                coverUrl={book.coverUrl}
                year={book.year}
              />
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
