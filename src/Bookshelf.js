import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


class Bookshelf extends Component {

    static propTypes = {
          books: PropTypes.array.isRequired,
          onChangeShelf: PropTypes.func.isRequired
        }

    filterByShelf = (shelf) => {
      return this.props.books.filter((b) => b.shelf === shelf);
    }

    render() {

        return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title="Currently Reading" books={ this.filterByShelf("currentlyReading") } onChangeShelf={ this.props.onChangeShelf } />
                <Shelf title="Want to Read" books={ this.filterByShelf("wantToRead") } onChangeShelf={ this.props.onChangeShelf } />
                <Shelf title="Read" books={ this.filterByShelf("read") } onChangeShelf={ this.props.onChangeShelf }/>
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