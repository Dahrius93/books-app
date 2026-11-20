import { describe, expect, it } from 'vitest'
import { mapDocs } from './openLibrary'

const fullDoc = {
  key: '/works/OL8996439W',
  title: 'Il nome della rosa',
  author_name: ['Umberto Eco'],
  cover_i: 8598263,
  first_publish_year: 1980,
}

describe('mapDocs', () => {
  it('mappa un documento completo', () => {
    // 1. input: un array con un documento
    const input = [fullDoc]
    // 2. chiamo la funzione
    const result = mapDocs(input)
    // 3. confronto con quello che mi aspetto
    expect(result).toEqual([
      {
        id: '/works/OL8996439W',
        title: 'Il nome della rosa',
        author: 'Umberto Eco',
        coverUrl: 'https://covers.openlibrary.org/b/id/8598263-M.jpg',
        year: 1980,
      },
    ])
  })

  it('più autori', () => {
    const dataInput = { ...fullDoc, author_name: ['autore A', 'autore B'] }
    const input = [dataInput]
    const result = mapDocs(input)
    expect(result).toEqual([
      {
        id: '/works/OL8996439W',
        title: 'Il nome della rosa',
        author: 'autore A, autore B',
        coverUrl: 'https://covers.openlibrary.org/b/id/8598263-M.jpg',
        year: 1980,
      },
    ])
  })

  it('autore mancante', () => {
    const dataInput = { ...fullDoc, author_name: undefined }
    const input = [dataInput]
    const result = mapDocs(input)
    expect(result).toEqual([
      {
        id: '/works/OL8996439W',
        title: 'Il nome della rosa',
        author: 'Autore sconosciuto',
        coverUrl: 'https://covers.openlibrary.org/b/id/8598263-M.jpg',
        year: 1980,
      },
    ])
  })

  it('copertina mancante', () => {
    const dataInput = { ...fullDoc, cover_i: undefined }
    const input = [dataInput]
    const result = mapDocs(input)
    expect(result).toEqual([
      {
        id: '/works/OL8996439W',
        title: 'Il nome della rosa',
        author: 'Umberto Eco',
        coverUrl: null,
        year: 1980,
      },
    ])
  })

  it('anno mancante', () => {
    const dataInput = { ...fullDoc, first_publish_year: undefined }
    const input = [dataInput]
    const result = mapDocs(input)
    expect(result).toEqual([
      {
        id: '/works/OL8996439W',
        title: 'Il nome della rosa',
        author: 'Umberto Eco',
        coverUrl: 'https://covers.openlibrary.org/b/id/8598263-M.jpg',
        year: null,
      },
    ])
  })

  it('lista vuota', () => {
    const result = mapDocs([])
    expect(result).toEqual([])
  })

  it('array di autori vuoto', () => {
    const dataInput = { ...fullDoc, author_name: [] }
    const input = [dataInput]
    const result = mapDocs(input)
    expect(result).toEqual([
      {
        id: '/works/OL8996439W',
        title: 'Il nome della rosa',
        author: '',
        coverUrl: 'https://covers.openlibrary.org/b/id/8598263-M.jpg',
        year: 1980,
      },
    ])
  })
})
