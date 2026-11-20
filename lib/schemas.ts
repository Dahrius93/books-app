import { z } from 'zod'

/**
 *
 *
 * OpenLibrary schema
 *
 * tipo dati in arrivo da fetch
 *
 * i dati in arrivo da fetch vengono poi mappati sul tipo BookResult
 *
 */
const olDocSchema = z.object({
  key: z.string(),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  cover_i: z.number().optional(),
  first_publish_year: z.number().optional(),
})
export const olSearchSchema = z.object({ docs: z.array(olDocSchema) })
export type OLDoc = z.infer<typeof olDocSchema>

/**
 *
 * schema da utilizzare per controllare
 * i dati prima di aggiungere un libro su libreria su db
 *
 * Sostituisco il tipo BookResult originariamente scritto a mano
 * con infer di bookResultSchema.
 *
 */
export const bookResultSchema = z.object({
  // controllo formato -> /works/OL8996439W
  id: z.string().regex(/^\/works\/OL\d+W$/),
  // trim dei spazi bianchi ai bordi, almeno un carattere, massimo 500
  title: z.string().trim().min(1).max(500),
  // trim dei spazi bianchi ai bordi, almeno un carattere, massimo 500
  author: z.string().trim().min(1).max(500),
  // url deve iniziare con https://covers.openlibrary.org/ oppure null
  coverUrl: z.url().startsWith('https://covers.openlibrary.org/').nullable(),
  // numero intero tra 0 e 2100, oppure null
  year: z.number().int().min(0).max(2100).nullable(),
})
export type BookResult = z.infer<typeof bookResultSchema>

/**
 *
 * schema da utilizzare per le action
 * che hanno come input id
 *
 */
export const idSchema = z.object({
  id: z.number().int().min(0).positive(),
})

/**
 *
 * schema da utilizzare per le action che
 * hanno come schema la recensione
 *
 */
export const reviewSchema = z.object({
  id: z.number().int().min(0).positive(),
  rating: z.number().int().min(0).max(5),
})
