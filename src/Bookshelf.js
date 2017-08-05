import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class Bookshelf extends Component {

    state = {
      books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books : books})
        })
    }

    filterByShelf = (shelf) => {
      return this.state.books.filter((b) => b.shelf === shelf);
    }

    changeShelf = (bookID, shelf) => {
      this.setState((state) => ({
        books: this.state.books.map((b) => {
          if (b.id === bookID) {
            b.shelf = shelf;
            BooksAPI.update(b, shelf).then((response) => {
              if (shelf !== "none" && response[shelf].indexOf(bookID) < 0) {
                console.error("There was an error updating the server");
              }
            });
          }
          return b;
          })
      })
    )}

    render() {
        return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title="Currently Reading" books={ this.filterByShelf("currentlyReading") } onChangeShelf={ this.changeShelf } />
                <Shelf title="Want to Read" books={ this.filterByShelf("wantToRead") } onChangeShelf={ this.changeShelf } />
                <Shelf title="Read" books={ this.filterByShelf("read") } onChangeShelf={ this.changeShelf }/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        );
    }
}

export default Bookshelf;