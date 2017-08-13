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

    componentDidMount = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books })
        })
    };

    changeShelf = (book, shelf) => {
        const bookID = book.id;
        let bookFound = false;

        //If book is already on the shelf, update shelf
        let allBooks = this.state.books.map((b) => {
            if (b.id === bookID) {
                b.shelf = shelf;
                bookFound = true;
            }
            return b;
        });

        //If book isn't already on shelf, add it
        if (!bookFound) {
            book.shelf = shelf;
            allBooks.push(book);
        }

        //Update component state
        this.setState({
            books: allBooks
        });

        //update on the API
        BooksAPI.update(book, shelf).then((response) => {
            if (shelf !== 'none' && response[shelf].indexOf(bookID) < 0) {
                console.error('There was an error updating the server');
            }
        });
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
              <Search bookshelf={ this.state.books } changeShelf={ this.changeShelf } />
            )}/>

          </div>
        )
    }
};

export default BooksApp