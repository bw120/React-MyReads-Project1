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

    render() {
        return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title="Currently Reading" books={ this.filterByShelf("currentlyReading") }/>
                <Shelf title="Want to Read" books={ this.filterByShelf("wantToRead") }/>
                <Shelf title="Read" books={ this.filterByShelf("read") }/>
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