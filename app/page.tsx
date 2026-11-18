import Library from '@/components/Library'
import { fetchMyLibrary } from '@/utils/actions'

const Home = async () => {
  // test loading page
  await new Promise((r) => setTimeout(r, 5000))

  const library = await fetchMyLibrary()
  return (
    <div>
      <p>app per gestire libri</p>
      <div className="pt-4">
        <Library books={library} />
      </div>
    </div>
  )
}

export default Home
