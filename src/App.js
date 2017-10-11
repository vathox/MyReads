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
            this.setState({books: books})
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
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookView
                        books={this.state.books}
                        onChange={this.updateBook}/>
                )}/>
                <Route path="/search" render={ () => (
                    <Search currentBooks={this.state.books}
                            onChange={this.updateBook}/>
                )} />
            </div>
        )
    }
}

export default BooksApp
