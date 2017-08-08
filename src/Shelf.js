import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        inSearch: PropTypes.bool
    };

    render() {
        const { books, title, onChangeShelf, inSearch } = this.props;

        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">

              {
                books.map((book, key) => (
                  <li key={ key }>
                      <Book bookInfo={ book } onChangeShelf={ onChangeShelf } inSearch={inSearch}/>
                  </li>
                ))
              }

              </ol>
            </div>
          </div>
        );
    }
}

export default Shelf;