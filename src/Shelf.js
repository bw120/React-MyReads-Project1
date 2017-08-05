import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
    static propTypes = {
          title: PropTypes.string.isRequired,
          books: PropTypes.array.isRequired,
          onChangeShelf: PropTypes.func.isRequired
        }

    render() {
        const { books, title, onChangeShelf } = this.props;

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{ title }</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                {books.map((book) => (
                    <li key={ book.id }>
                        <Book bookInfo={ book } onChangeShelf={ onChangeShelf }/>
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