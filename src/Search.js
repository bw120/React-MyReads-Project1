import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import PropTypes from 'prop-types'
import DebounceInput from 'react-debounce-input';
import sortBy from 'sort-by'


class Search extends Component {

    static propTypes = {
        changeShelf: PropTypes.func.isRequired,
        bookshelf: PropTypes.array.isRequired
    };

    state = {
        query: '',
        books: []
    };

    //Creates a list of an object with all books currently on my shelf
    //Used to set the bookshelf on the search results
    myBooks = {};
    createShelfList = (books) => {
      books.forEach((book) => {
        this.myBooks[book.id] = book.shelf;
      });
    }

    //Updates the shelf for each item in the search results.
    //It is set to either the value from our bookshelf or set to "none"
    //Note: some of the results from the API come over with the shelf set to an arbitrary value
    //So this needs to be set to "none" if it is not in our bookshelf
    setShelf = () => {
      let books = this.state.books;
      books.map((book) => {
        book.shelf = (this.myBooks[book.id]) ? this.myBooks[book.id] : "none";
        return book;
      });
      books.sort(sortBy("title"));
      this.setState({ books: books });
    }

    //Handler for updating shelf on search screen
    //update local state for search and then call handler from App.js to update bookshelf
    updateBookshelf = (book, shelf) => {
      this.myBooks[book.id] = shelf;
      this.setShelf();
      this.props.changeShelf(book, shelf);
    }

    //This is used to change what message is displayed when no results are shown.
    //the user is told to enter a query in the search bar or if nothing matched query
    searchedYet = false;

    updateQuery = (query) => {
        this.setState({ query: query });
        if (query.length > 0) {
            BooksAPI.search(query, 20).then((b) => {
                //when the API doensn't have any matching results it returns an object instead of an array.
                //so we need to only passes an array to setState
                this.setState({ books: (Array.isArray(b)) ? b : [] });
                this.setShelf();
            });
        } else {
            this.setState({ books: [] });
        }
        this.searchedYet = true;
    }

    render() {
      this.createShelfList(this.props.bookshelf);
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">

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
                  <Shelf title="Search Results" books={ this.state.books } onChangeShelf={ this.updateBookshelf } inSearch={true} />
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