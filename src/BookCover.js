import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookCover extends Component {
    _isMounted = false;

    static propTypes = {
        bookInfo: PropTypes.object.isRequired,
        onMoveBook: PropTypes.func.isRequired,
    }

    state = {
        value: '',
        selected: ''
    }

    componentDidMount = () => {
        this._isMounted = true;
        const { bookInfo } = this.props;
        
        BooksAPI.get(bookInfo.id).then(book => {
            if (this._isMounted) {
                this.setState({
                    selected: book.shelf
                })
            }
        })
    }
 
    componentWillUnmount() {
      this._isMounted = false;
    }

    handleChange = shelf => {
        const { bookInfo, onMoveBook } = this.props;
        this.setState({
            selected: shelf
        })
        onMoveBook(bookInfo, shelf)
    }

    render() {
        const { bookInfo } = this.props
        return(
            <li>                
                <div className="book">
                    <div className="book-top">
                        {bookInfo.imageLinks && bookInfo.imageLinks.thumbnail !==''
                            ? <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${bookInfo.imageLinks.thumbnail})` }}></div>
                            : <div className="book-cover" style={{ width: 128, height: 192, }}></div>
                        }
                        
                        <div className="book-shelf-changer">
                            <select onChange={e => this.handleChange(e.target.value)} value={this.state.selected}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{bookInfo.title}</div>
                    {bookInfo.authors &&  bookInfo.authors.length > 0 && (
                        <div className="book-authors">
                            <div  className="authors-name">
                                {bookInfo.authors.map((author, i) => (
                                    <span key={i}>{author}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </li>
        )
    }
}

export default BookCover;