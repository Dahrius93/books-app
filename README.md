applicazione per gestire libri da leggere

utilizza free api per cercare e gestire i libri tramite openlibrary

esempio
https://openlibrary.org/search.json?q=il+nome+della+rosa&limit=5&fields=key,title,author_name,cover_i,first_publish_year

e restituisce

```
{
  "numFound": 36,
  "start": 0,
  "numFoundExact": true,
  "num_found": 36,
  "documentation_url": "https://openlibrary.org/dev/docs/api/search",
  "q": "il nome della rosa",
  "offset": null,
  "docs": [
    {
      "author_name": [
        "Umberto Eco"
      ],
      "cover_i": 8598263,
      "first_publish_year": 1980,
      "key": "/works/OL8996439W",
      "title": "Il nome della rosa"
    },
    {
      "author_name": [
        "Umberto Eco"
      ],
      "cover_i": 5492462,
      "first_publish_year": 1983,
      "key": "/works/OL14852855W",
      "title": "Postille a Il nome della rosa"
    },
    {
      "author_name": [
        "Umberto Eco"
      ],
      "first_publish_year": 1986,
      "key": "/works/OL37388433W",
      "title": "Il nome della rosa"
    },
    {
      "author_name": [
        "Margherita Ganeri"
      ],
      "first_publish_year": 1990,
      "key": "/works/OL2166519W",
      "title": "\"Il nome della rosa\""
    },
    {
      "cover_i": 14362672,
      "first_publish_year": 2022,
      "key": "/works/OL35986141W",
      "title": "EL NOMBRE DE LA ROSA"
    }
  ]
}
```
