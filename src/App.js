import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookView from './BookView'
import Search from "./Search";

class BooksApp extends Component {
    state = {
        books: []
    };


    getBook = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    };

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.getBook()
        })
    };

    componentDidMount() {
        this.getBook()
    }

    render() {
        let books = this.state.books;
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookView
                        key={books.length}
                        books={books}
                        onChange={this.updateBook}/>
                )}/>
                <Route path="/search" render={() => (
                    <Search currentBooks={books}
                            onChange={this.updateBook}/>
                )} />
            </div>
        )
    }
}

export default BooksApp
