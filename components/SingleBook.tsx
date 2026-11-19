type SingleBookProps = {
  coverUrl?: string | null
  title: string
  author: string
  year?: number | null
}

const SingleBook = ({ coverUrl, title, author, year }: SingleBookProps) => {
  return (
    <>
      {/* caso in cui ho l'immagine allora la mostro altrimenti riquadro scuro */}
      {coverUrl ? (
        <img src={coverUrl} alt="" className="h-16 w-11 rounded object-cover" />
      ) : (
        <div className="h-16 w-11 rounded bg-muted" />
      )}
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">
          {author}
          {year && ` · ${year}`}
        </p>
      </div>
    </>
  )
}

export default SingleBook
