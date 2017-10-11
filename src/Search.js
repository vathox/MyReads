import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        books: [],
        query: ''
    };


    handleChange = (event) => {
        let input = event.target.value;
        this.setState(() => {
            return {query: input}
        });
        this.search(input)
    };

    search = (input) => {
        if (input.length !== 0) {
            BooksAPI.search(input, 20).then((books) => {
                if (books.length > 0) {
                    books = books.filter((book) => (book.imageLinks));
                    books = this.changeBookShelf(books);
                    this.setState(() => {
                        return {books: books}
                    })
                }
            })
        } else {
            this.setState({books: [], query: ''})
        }
    };

    changeBookShelf = (books) => {
        let all_Books = this.props.currentBooks;
        for (let book of books) {
            book.shelf = "none"
        }

        for (let book of books) {
            for (let b of all_Books) {
                if (b.id === book.id) {
                    book.shelf = b.shelf
                }
            }
        }
        return books
    };

    addBook = (book, shelf) => {
        this.props.onChange(book, shelf)
    };



    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.query.length > 0 && this.state.books.map((book, index) => (
                            <Book book={book} key={index} onUpdate={(shelf) => {
                                this.addBook(book, shelf)
                            }}/>))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;