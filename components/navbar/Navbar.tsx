'use client'

import { links } from '@/utils/links'
import ClerkNav from './ClerkNav'
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
          className="grid place-items-center w-5 h-5 cursor-pointer"
          type="button"
          onClick={toggleTheme}
          aria-label="Cambia tema"
        >
          <FaMoon className="col-start-1 row-start-1 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <IoSunny className="col-start-1 row-start-1 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </button>
        <ClerkNav />
      </header>
    </div>
  )
}

export default Navbar
