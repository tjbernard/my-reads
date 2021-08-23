import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookCover from './BookCover';

class Bookshelf extends Component {
    static propTypes = {
        onMoveBook: PropTypes.func.isRequired,
    }

    moveBook = (book, shelf) => {
        const { onMoveBook } = this.props;
        onMoveBook(book, shelf);
    }

    render() {
        const { books, isLoading } = this.props;
        
        return(
            <div>
                {isLoading && (
                    <div className="page-loading">
                        <span>Loading...</span>
                    </div>
                )}
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter((b) => b.shelf === 'currentlyReading').length > 0
                                ? books.filter((b) => b.shelf === 'currentlyReading').map((book, i) => (
                                    <BookCover
                                        bookInfo={book}
                                        key={i}
                                        onMoveBook={this.moveBook}
                                    />
                                ))
                                : <span>No books</span>
                            }
                        </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter((b) => b.shelf === 'wantToRead').length > 0
                                ? books.filter((b) => b.shelf === 'wantToRead').map((book, i) => (
                                    <BookCover
                                        bookInfo={book}
                                        key={i}
                                        onMoveBook={this.moveBook}
                                    />
                                ))
                                : <span>No books</span>
                            }
                        </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter((b) => b.shelf === 'read').length > 0
                                ? books.filter((b) => b.shelf === 'read').map((book, i) => (
                                    <BookCover
                                        bookInfo={book}
                                        key={i}
                                        onMoveBook={this.moveBook}
                                    />
                                ))
                                : <span>No books</span>
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookshelf;