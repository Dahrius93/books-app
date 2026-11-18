import { BookSearch } from '@/components/BookSearch'
import { fetchMyLibrary } from '@/utils/actions'

const Search = async () => {
  const library = await fetchMyLibrary()

  return <BookSearch savedIds={library.map((b) => b.workId)} />
}

export default Search
