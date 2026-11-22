---
title: Next.js
description: Adding dark mode to your Next.js app.
---

<Steps>

## Install next-themes

Start by installing `next-themes`:

```bash
npm install next-themes
```

## Create a theme provider

```tsx title="components/theme-provider.tsx" showLineNumbers
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

## Wrap your root layout

Add the `ThemeProvider` to your root layout and add the `suppressHydrationWarning` prop to the `html` tag.

```tsx {1,6,9-14,16} title="app/layout.tsx" showLineNumbers
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange --> abilitare per nascondere le transizioni
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
```

## Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

esempio 1:

```tsx con menu
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

esempio 2:

```tsx semplice senza transizione
'use client'

import { links } from '@/utils/links'
import Link from 'next/link'
import { FaMoon } from 'react-icons/fa'
import { IoSunny } from 'react-icons/io5'
import { useTheme } from 'next-themes'

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div>
      <header className="flex justify-end items-center p-4 gap-4 h-16 border-b-2">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          )
        })}
        <button className="cursor-pointer" onClick={toggleTheme}>
          <FaMoon className="dark:hidden" />
          <IoSunny className="hidden dark:block" />
        </button>
      </header>
    </div>
  )
}

export default Navbar
```

esempio 3 con transizione tailwind:

```tsx
'use client'

import { links } from '@/utils/links'
import Link from 'next/link'
import { FaMoon } from 'react-icons/fa'
import { IoSunny } from 'react-icons/io5'
import { useTheme } from 'next-themes'

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div>
      <header className="flex justify-end items-center p-4 gap-4 h-16 border-b-2">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          )
        })}
        <button
          className="relative grid place-items-center size-5 cursor-pointer"
          type="button"
          onClick={toggleTheme}
          aria-label="Cambia tema"
        >
          {/* 
          - "col-start-1 row-start-1" = senza classe row e queste altre due classi le icone sarebbero su due righe diverse
          - "transition-all duration-500" = abilita la transizione
          - luna -> "rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
                    ruota da 0° in light a 90° in dark
                    dark:scale-0 la rimpicciolisce da 100% a 0%

          - Sole -> "rotate-90 scale-0 dark:rotate-0 dark:scale-100"
                    ruota da 90° in light a 0° in dark
                    dark:scale-100 La ingrandisce da 0% a 100%         
          */}
          <FaMoon className="col-start-1 row-start-1 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <IoSunny className="col-start-1 row-start-1 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </button>
      </header>
    </div>
  )
}

export default Navbar
```
