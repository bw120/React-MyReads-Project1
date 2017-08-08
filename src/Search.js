import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import PropTypes from 'prop-types'
import DebounceInput from 'react-debounce-input';
import sortBy from 'sort-by'


class Search extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
        bookshelf: PropTypes.array.isRequired
    };

    state = {
        query: '',
        books: []
    };

    //lists of books on myshelves to update shelf dropdown on book component
    myBooks = {};
    createShelfList = (books) => {
      books.forEach((book) => {
        this.myBooks[book.id] = book.shelf;
      });
    }

    //update shelf for items in search
    setShelf = () => {
      let books = this.state.books;
      books.map((book) => {
        if (this.myBooks[book.id]) {
          book.shelf = this.myBooks[book.id];
        } else {
          book.shelf = "none";
        }
        return book;
      });
      books.sort(sortBy("title"));
      this.setState({ books: books });
    }

    //This is used to change what message is displayed when no results are shown.
    //the user is told to enter a query in the search bar or nothing matched search
    searchedYet = false;

    updateQuery = (query) => {
        this.setState({ query: query });
        if (query.length > 0) {
            BooksAPI.search(query, 20).then((b) => {
                //when the API doensn't have any matching results it returns an object instead of an array.
                //so we need to check before we setState
                this.setState({ books: (Array.isArray(b)) ? b : [] });
                this.setShelf();
                this.searchedYet = true;
            });
        } else {
            this.setState({ books: [] });
            this.searchedYet = true;
        }
    }

    render() {
      this.createShelfList(this.props.bookshelf);
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <DebounceInput
                    type="text"
                    placeholder="Search by title or author"
                    value={this.state.query}
                    debounceTimeout={250}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />

                </div>
              </div>
              <div className="search-books-results">
                {
                  (this.state.books.length > 0 && this.state.query.length > 0) ? (
                  <Shelf title="Search Results" books={ this.state.books } onChangeShelf={ this.props.onChangeShelf } />
                  ) : (
                  <div className="search-no-results">{(this.searchedYet) ? (<span>Sorry, we did not find anything that mached</span>) : (<span>Please enter a search term above</span>)}</div>
                  )
                }
              </div>
            </div>
        );
    }
}

export default Search;