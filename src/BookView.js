import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'


class BookView extends Component {
    render() {
        const books = this.props.books;
        const onChange = this.props.onChange;

        return (
            <div>
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf books={books.filter((book) => (book.shelf === "currentlyReading"))}
                                   title="Currently Reading" onShelfChange={onChange}/>
                        <BookShelf books={books.filter((book) => (book.shelf === "read"))} title="Read"
                                   onShelfChange={onChange}/>
                        <BookShelf books={books.filter((book) => (book.shelf === "wantToRead"))} title="Want to Read"
                                   onShelfChange={onChange}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default BookView