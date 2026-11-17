'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { number, z } from 'zod'
import db from './db'
import { Book } from '@/app/generated/prisma/client'
import type { BookResult } from '@/lib/openLibrary'

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

export const addToLibrary = async ({ book }: { book: BookResult }) => {
  const userId = await getAuthUserId()
  try {
    await db.book.create({
      data: {
        workId: book.id,
        userId: userId,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        year: book.year,
      },
    })
    return { message: 'Aggiunto in libreria' }
  } catch (error) {
    renderError(error)
  }
}

// aggiunta di una review su un libro
export const createReviewAction = async ({
  rating,
  id,
}: {
  rating: number
  id: number
}) => {
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    throw new Error('Il voto deve essere tra 0 e 5')
  }

  try {
    const userId = await getAuthUserId()
    await db.book.update({
      where: {
        userId,
        id,
      },
      data: {
        rating,
      },
    })
    revalidatePath('/')
    return { message: 'Recensione salvata' }
  } catch (error) {
    return renderError(error)
  }
}

// aggiorno un libro della libreria come già letto
export const addToReadedBooksAction = async ({ id }: { id: number }) => {
  try {
    const userId = await getAuthUserId()
    await db.book.update({
      where: {
        userId,
        id,
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

// cancello un libro dalla libreria
export const deleteBookAction = async ({ id }: { id: number }) => {
  try {
    const userId = await getAuthUserId()
    await db.book.delete({ where: { userId, id } })
    revalidatePath('/')
    return { message: 'Libro rimosso' }
  } catch (error) {
    return renderError(error)
  }
}
