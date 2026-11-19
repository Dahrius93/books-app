import Library from '@/components/Pages/Library'
import { fetchMyLibrary } from '@/utils/actions'

const Home = async () => {
  // test loading page
  await new Promise((r) => setTimeout(r, 1000))

  const library = await fetchMyLibrary()
  return (
    <div>
      <div className="">
        <Library books={library} />
      </div>
    </div>
  )
}

export default Home
