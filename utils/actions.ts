'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import db from './db'
import type { BookResult } from '@/lib/openLibrary'
import { bookResultSchema, idSchema, reviewSchema } from '@/lib/schemas'

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// check for actual user else error
const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('Accedi per procedere')
  }
  return user
}

// check userId
const getAuthUserId = async () => {
  const { userId } = await auth()
  if (!userId) throw new Error('Accedi per procedere')
  return userId
}

// generic error to display in a toast
const renderError = (error: unknown): { message: string } => {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'ops.. errore',
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// fetch di tutta la libreria
export const fetchMyLibrary = async () => {
  const userId = await getAuthUserId()
  return db.book.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// fetch di un singolo libro dalla libreria
// utile per mostrarlo su una pagina dedicata
export const fetchBook = async ({ id }: { id: number }) => {
  const userId = await getAuthUserId()
  return db.book.findFirst({
    where: {
      userId,
      id,
    },
  })
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// fetch dei libri già letti nella libreria
export const fetchReadedBooks = async () => {
  const userId = await getAuthUserId()
  return db.book.findMany({
    where: {
      userId,
      read: true,
    },
  })
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */

// fetch dei libri nella libreria ancora da leggere
export const fetchNotReadedBooks = async () => {
  const userId = await getAuthUserId()
  return db.book.findMany({
    where: {
      userId,
      read: false,
    },
  })
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// aggiunta di un libro in libreria (zod)
export const addToLibrary = async ({ book }: { book: BookResult }) => {
  // controllo paramertro input funzione con schema zod
  const parsed = bookResultSchema.safeParse(book)
  // se il controllo non passa fermo l'esecuzione
  if (!parsed.success) return { message: 'Dati libro non validi' }

  // oggetto book controllato e valido da utilizzare
  const parsedBook = parsed.data

  // aggiungo in database
  try {
    const userId = await getAuthUserId()
    await db.book.create({
      data: {
        workId: parsedBook.id,
        userId: userId,
        title: parsedBook.title,
        author: parsedBook.author,
        coverUrl: parsedBook.coverUrl,
        year: parsedBook.year,
      },
    })

    // aggiorno la cartella root
    revalidatePath('/')

    // messaggio da visualizzare in un toast
    return { message: 'Aggiunto in libreria' }
  } catch (error) {
    return renderError(error)
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// aggiunta di una review su un libro (Zod)
export const createReviewAction = async ({
  rating,
  id,
}: {
  rating: number
  id: number
}) => {
  // controllo zod dei dati
  const parsed = reviewSchema.safeParse({ rating, id })
  // se dati non corretti con schema allora ritorno
  if (!parsed.success) return { message: 'inserisci un voto da 1 a 5' }

  // dati da utilizzare, già parsati
  const parsedData = parsed.data

  try {
    const userId = await getAuthUserId()
    await db.book.update({
      where: {
        userId,
        id: parsedData.id,
      },
      data: {
        rating: parsedData.rating,
      },
    })
    revalidatePath('/')
    return { message: 'Recensione salvata' }
  } catch (error) {
    return renderError(error)
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// aggiorno un libro della libreria come già letto (zod)
export const addToReadedBooksAction = async ({ id }: { id: number }) => {
  // controllo id con zod
  const parsed = idSchema.safeParse({ id })
  // se non passa il controllo dello schema allora ritorno
  if (!parsed.success) return { message: 'identificativo libro non corretto' }
  // dati da utilizzare già parsati
  const parsedData = parsed.data

  try {
    const userId = await getAuthUserId()
    await db.book.update({
      where: {
        userId,
        id: parsedData.id,
      },
      data: {
        read: true,
      },
    })
    revalidatePath('/')
    return { message: 'Libro letto' }
  } catch (error) {
    return renderError(error)
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// cancello un libro dalla libreria (zod)
export const deleteBookAction = async ({ id }: { id: number }) => {
  const parsed = idSchema.safeParse({ id })
  if (!parsed.success) {
    return { message: 'Identificativo libro non corretto' }
  }
  const parsedData = parsed.data
  try {
    const userId = await getAuthUserId()
    await db.book.delete({ where: { userId, id: parsedData.id } })
    revalidatePath('/')
    return { message: 'Libro rimosso' }
  } catch (error) {
    return renderError(error)
  }
}
