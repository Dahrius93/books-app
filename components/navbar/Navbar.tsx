import ClerkNav from './ClerkNav'

const Navbar = () => {
  return (
    <div>
      <header className="flex justify-end items-center p-4 gap-4 h-16 border-b-2">
        <ClerkNav />
      </header>
    </div>
  )
}

export default Navbar
