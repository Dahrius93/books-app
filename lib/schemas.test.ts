import { describe, it, expect } from 'vitest'
import { bookResultSchema, reviewSchema } from '@/lib/schemas'

// un libro valido di base, da modificare nei singoli test
const validBook = {
  id: '/works/OL8996439W',
  title: 'Il nome della rosa',
  author: 'Umberto Eco',
  coverUrl: 'https://covers.openlibrary.org/b/id/8598263-M.jpg',
  year: 1980,
}

describe('bookResultSchema', () => {
  it('accetta un libro valido', () => {
    const result = bookResultSchema.safeParse(validBook)
    expect(result.success).toBe(true)
  })

  it('rifiuta id senza formato /works/..', () => {
    const result = bookResultSchema.safeParse({
      ...validBook,
      id: '/worksssss/OL8996439W',
    })
    expect(result.success).toBe(false)
  })

  it('rifiuta titolo vuoto', () => {
    const result = bookResultSchema.safeParse({
      ...validBook,
      title: '',
    })
    expect(result.success).toBe(false)
  })

  it('toglie gli spazi dal titolo', () => {
    const result = bookResultSchema.safeParse({
      ...validBook,
      title: '\n Il nome della rosa',
    })
    expect(result.data?.title).toBe('Il nome della rosa')
  })

  it('rifiuta coverUrl di un altro dominio', () => {
    const result = bookResultSchema.safeParse({
      ...validBook,
      coverUrl: 'https://covers.facebook.org/b/id/8598263-M.jpg',
    })
    expect(result.success).toBe(false)
  })

  it('accetta coverUrl: null e year: null', () => {
    const result = bookResultSchema.safeParse({
      ...validBook,
      coverUrl: null,
      year: null,
    })
    expect(result.success).toBe(true)
  })

  it('rifiuta un anno con la virgola', () => {
    const result = bookResultSchema.safeParse({
      ...validBook,
      year: 1980.5,
    })
    expect(result.success).toBe(false)
  })
})

/**!SECTION
 *
 *
 *
 *
 *
 *
 *
 */
const validRating = {
  id: 50,
  rating: 4,
}

describe('reviewSchema', () => {
  it('accetta un voto da 1 a 5', () => {
    const result = reviewSchema.safeParse(validRating)
    expect(result.success).toBe(true)
  })

  it('rifiuta un voto maggiore di 5', () => {
    const result = reviewSchema.safeParse({
      ...validRating,
      rating: 6,
    })
    expect(result.success).toBe(false)
  })

  it('rifiuta voto 0', () => {
    const result = reviewSchema.safeParse({
      ...validRating,
      rating: 0,
    })
    expect(result.success).toBe(false)
  })
})
