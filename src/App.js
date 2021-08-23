import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import Search from './SearchPage'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      sample: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.getAllBookshelfs();
  }

  getAllBookshelfs = () => {
    this.setState({ isLoading: true })
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books,
        isLoading: false
      })
    })
  }

  moveBookHandle = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getAllBookshelfs();
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
              <div className="list-books-title">
                  <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <Bookshelf
                    books={this.state.books}
                    onMoveBook={this.moveBookHandle}
                    isLoading={this.state.isLoading}
                  />
              </div>
              <div>
                  <div className="open-search">
                      <Link to="/search">Add a book</Link>
                  </div>
              </div>          
          </div>
        )}/>
        
        <Route path='/search' render={({ history }) => (
          <Search
            onMoveBook={this.moveBookHandle}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
