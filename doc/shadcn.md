componenti UI riutilizzabili

- npx shadcn@latest init
  component library = baseUI
  preset = Nova

  viene creata la cartella components e lib/utils.ts

  oppure procedere dal sito shadcn, scegliere il preset che si vuole e poi ottenere il
  comando da lanciare per installare il preset corretto

---

differenza tra Radix e BaseUI

// Radix
<Button asChild><Link href="/books">Libri</Link></Button>

// Base UI
<Button render={<Link href="/books" />}>Libri</Button>

# La funzione `cn`

È un'**utility** (non un componente) resa popolare da **shadcn/ui**. Serve a comporre le classi Tailwind in modo pulito e combina due librerie.

## `clsx`

Costruisce la stringa di classi a partire da condizioni, oggetti e array, ignorando i valori falsy:

```ts
clsx('p-4', isActive && 'bg-blue-500', { 'opacity-50': disabled })
// → "p-4 bg-blue-500" (se isActive è true e disabled è false)
```

## `twMerge`

Risolve i conflitti tra classi Tailwind: se due classi toccano la stessa proprietà, vince l'ultima.

```ts
twMerge('p-4 p-2') // → "p-2"
twMerge('bg-red-500 bg-blue-500') // → "bg-blue-500"
```

> **Attenzione:** senza `twMerge` restano entrambe nell'HTML, e vince quella che compare dopo nel CSS generato, non quella che hai scritto per ultima. Un bug subdolo.

## Dove serve davvero

Nei **componenti riutilizzabili** che accettano un `className` dall'esterno:

```tsx
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger'
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'rounded-md px-4 py-2 font-medium',
        variant === 'primary' && 'bg-blue-600 text-white',
        variant === 'danger' && 'bg-red-600 text-white',
        className, // le classi del chiamante sovrascrivono quelle di default
      )}
      {...props}
    />
  )
}

// Uso:
;<Button className="px-8">Salva</Button> // px-8 sostituisce px-4
```
