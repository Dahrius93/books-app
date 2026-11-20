installazione

- npm i -D vitest @types/node@^22

---

testeremo:

- Setup e test degli schemi Zod: funzioni pure, senza Next, Prisma o rete. È il punto più facile per iniziare.
- mapDocs: altra funzione pura, con la logica dell’autore sconosciuto e dell’URL della copertina.
- La route /api/search: qui devi simulare (mock) il fetch verso Open Library.
- Le Server Actions: mock di db, di Clerk e di revalidatePath. È il passo più impegnativo.

---

configurazione:
creare il file vitest.config.mts nella root e incollare

```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { tsconfigPaths: true }, // fa funzionare gli import con '@/...'
  test: { environment: 'node' },
})
```

e in package.json, mettere questo dentro a scripts:

```
"test": "vitest"
```

---

primo test
creare il file lib/schemas.test.ts

```
import { describe, it, expect } from 'vitest'
import { bookResultSchema } from '@/lib/schemas'

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
})
```
