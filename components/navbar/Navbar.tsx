import { links } from '@/utils/links'
import ClerkNav from './ClerkNav'
import Link from 'next/link'

const Navbar = () => {
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
        <ClerkNav />
      </header>
    </div>
  )
}

export default Navbar
