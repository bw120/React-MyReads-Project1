import React from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books })
        })
    }

    addBook = (book, shelf) => {
        const bookID = book.id

        this.setState((state) => ({
            books: this.state.books.concat(book)
        }))

        BooksAPI.update(book, shelf).then((response) => {
            if (shelf !== 'none' && response[shelf].indexOf(bookID) < 0) {
                console.error('There was an error updating the server');
            }
        });
    };


    changeShelf = (book, shelf) => {
        const bookID = book.id

        this.setState((state) => ({
            books: this.state.books.map((b) => {
                if (b.id === bookID) {
                    b.shelf = shelf;
                    BooksAPI.update(b, shelf).then((response) => {
                        if (shelf !== 'none' && response[shelf].indexOf(bookID) < 0) {
                            console.error('There was an error updating the server');
                        }
                    });
                }
                return b;
            })
        }))
    };

    render() {
        return (
          <div className="app">

            {/* Main page route */}

            <Route exact path="/" render={() => (
              <Bookshelf books={ this.state.books } onChangeShelf={ this.changeShelf } />
            )}/>

            {/* Search page route */}

            <Route exact path="/search" render={() => (
              <Search bookshelf={ this.state.books } onChangeShelf={ this.addBook } />
            )}/>

          </div>
        )
    }
}

export default BooksApp