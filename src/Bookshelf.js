import React from 'react'
import PropTypes from 'prop-types'
import BookCover from './BookCover';

const Bookshelf = (props) => {
    
    const moveBook = (book, shelf) => {
        const { onMoveBook } = props;
        onMoveBook(book, shelf);
    }

    const { books, isLoading } = props;
    const currentReading = books.filter((b) => b.shelf === 'currentlyReading');
    const wantToRead = books.filter((b) => b.shelf === 'wantToRead');
    const read = books.filter((b) => b.shelf === 'read');

    const shelf = (books, heading) => {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{heading}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.length > 0
                            ? books.map((book, i) => (
                                <BookCover
                                    bookInfo={book}
                                    key={i}
                                    onMoveBook={moveBook}
                                />
                            ))
                            : <span>No books</span>
                        }
                    </ol>
                </div>
            </div>
        )
    }
    
    return(
        <div>
            {isLoading && (
                <div className="page-loading">
                    <span>Loading...</span>
                </div>
            )}
            {shelf(currentReading, 'Current Reading')}
            {shelf(wantToRead, 'Want To Read')}
            {shelf(read, 'Read')}
        </div>
    );
}

export default Bookshelf;

Bookshelf.propTypes = {
    onMoveBook: PropTypes.func.isRequired,
}
