validazione dati input prima di scriverli su database

- npm install zod

---- utilizzo ----
su cartella lib creare un file chiamato schemas.ts dove andremo a dichiarare gli schemi zod

importante sapere che zod crea anche i tipi a partire dallo schema creato
quindi andremo a rifare i tipi OLDocs "tipo risposta openLibrary" e il
tipo BookResult "tipo mappato da OLDocs" utilizzato come risposta della fetch

esempio

```
export const bookResultSchema = z.object({
  id: z.string().regex(/^\/works\/OL\d+W$/),
  title: z.string().trim().min(1).max(500),
  author: z.string().trim().min(1).max(500),
  coverUrl: z.url().startsWith('https://covers.openlibrary.org/').nullable(),
  year: z.number().int().min(0).max(2100).nullable(),
})
// esporto il tipo a partire dallo schema
export type BookResult = z.infer<typeof bookResultSchema>
```

poi vado ad utilizzare lo schema per validare i dati prima di eseguire
l'action come nell'esempio seguente

```
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
```
