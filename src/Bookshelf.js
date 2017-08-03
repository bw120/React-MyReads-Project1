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
          console.log(books);
            this.setState({books : books})
        })
    }

    render() {
        const { books } = this.state;

        return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title="Currently Reading" books={ books }/>
                <Shelf title="Want to Read" books={ books }/>
                <Shelf title="Read" books={ books }/>
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