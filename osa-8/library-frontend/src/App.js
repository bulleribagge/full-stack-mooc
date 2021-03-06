import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


const ADD_BOOK = gql`
  mutation newBook($author: String, $title: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title, author { name }, published, genres
    }
  }`

const EDIT_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) { name, born }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) { value }
  }
`

const ALL_AUTHORS = gql`
{
  allAuthors { name, bookCount, born, id }
}
`
const BOOK_DETAILS = gql`
 fragment BookDetails on Book {
   author { name, born, bookCount, id },
   title,
   published,
   genres,
   id
 }
`

const ALL_BOOKS = gql`
 {
   allBooks { ...BookDetails }
 }
 ${BOOK_DETAILS}
`
const ME = gql`
 {
   me { username, favoriteGenre }
 }
`

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
 ${BOOK_DETAILS}
`

const LOCALSTORAGE_TOKEN_KEY = 'library-user-token'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(ADD_BOOK, { refetchQueries : [{ query : ALL_AUTHORS }, { query : ALL_BOOKS }]})
  const [updateAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries : [ { query : ALL_AUTHORS }]})
  const [login] = useMutation(LOGIN)
  const userQuery = useQuery(ME)

  useEffect(() => {
    const storedToken = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
    setToken(storedToken)
  }, [])

  const client = useApolloClient()
  const logout = () => {
    client.resetStore()
    setToken(null)
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
  }

  const addBookToCache = (addedBook) => {
    const includedIn = (set, object) => set.map(o => o.id).includes(object.id)

    const allBooksQueryCache = client.readQuery({ query : ALL_BOOKS })
    const allAuthorsQueryCache = client.readQuery({ query : ALL_AUTHORS })

    if (!includedIn(allBooksQueryCache.allBooks, addedBook)) {
      const updatedBooksCache = allBooksQueryCache.allBooks.concat(addedBook)
      client.writeQuery({ query : ALL_BOOKS, data : { allBooks : updatedBooksCache } })
    }

    if (!includedIn(allAuthorsQueryCache.allAuthors, addedBook.author)) {
      const updatedAuthorsCache = allAuthorsQueryCache.allAuthors.concat(addedBook.author)
      client.writeQuery({ query : ALL_AUTHORS, data : { allAuthors : updatedAuthorsCache }})
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      addBookToCache(addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={() => setPage('recommend')}>recommend</button> }
        { token && <button onClick={logout}>logout</button> }
      </div>

      <LoginForm
        show={page === 'login'}
        login={login}
        onSuccess={() => setPage('authors')}
        setToken={setToken}
      />

      <Authors
        show={page === 'authors'}
        authors={authorsQuery.data.allAuthors}
        updateAuthor={updateAuthor}
        loggedIn={!!token}
      />

      <Books
        show={page === 'books'}
        books={booksQuery.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Recommendations
        show={page === 'recommend'}
        books={booksQuery.data.allBooks}
        user={userQuery.data.me}
      />

    </div>
  )
}

export default App