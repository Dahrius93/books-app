'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import db from './db'

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

export const fetchMyLibrary = async () => {
  const userId = await getAuthUserId()
  return db.book.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export const fetchBook = async (id: number) => {
  const userId = await getAuthUserId()
  return db.book.findFirst({
    where: {
      userId,
      id,
    },
  })
}

export const fetchReadedBooks = async () => {
  const userId = await getAuthUserId()
  return db.book.findMany({
    where: {
      userId,
      status: 'READED',
    },
  })
}

export const fetchNotReadedBooks = async () => {
  const userId = await getAuthUserId()
  return db.book.findMany({
    where: {
      userId,
      status: 'TO_READ',
    },
  })
}

export const createReviewAction = async () => {}

export const addToFavoriteAction = async () => {}

export const addToReadedBooksAction = async () => {}

export const deleteBookAction = async () => {}
