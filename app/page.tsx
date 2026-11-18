import Library from '@/components/ui/Library'
import { fetchMyLibrary } from '@/utils/actions'

const Home = async () => {
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
