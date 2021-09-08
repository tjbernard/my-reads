import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookCover from './BookCover'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
    static propTypes = {
        onMoveBook: PropTypes.func.isRequired,
    }
    
    state = {
        query: '',
        results: [],
        isResutlsEmpty: false
    }

    searchQuery = () => {
        this.setState({
            query: this.search.value,
            results: [],
            isResutlsEmpty: false
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                BooksAPI.search(this.state.query.toLocaleLowerCase()).then(response => {
                    if(response.error) {
                        this.setState({ 
                            isResutlsEmpty: true,
                            results: []
                        })
                    } else {
                        this.setState({ 
                            results: response,
                            isResutlsEmpty: false
                        })
                    }
                })
            }
        })
    }

    moveBook = (book, shelf) => {
        const { onMoveBook } = this.props;
        onMoveBook(book, shelf);
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                    <input 
                        type="text"
                        placeholder="Search by title or author"
                        ref={input => this.search = input}               
                        onChange={(event) => this.searchQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.isResutlsEmpty && (
                        <div className="no-results">
                            <span>No results matching query were found</span>
                        </div>
                    )}
                    <ol className="books-grid">
                        {this.state.results.length > 0 && (
                            this.state.results.map((book, i) =>(
                                <BookCover
                                    bookInfo={book}
                                    key={i}
                                    onMoveBook={this.moveBook}
                                />
                            ))
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage
