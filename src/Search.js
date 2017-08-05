import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import PropTypes from 'prop-types'


class Search extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    searchedYet = false;

    updateSearch = (query) => {
        this.searchedYet = true;
        this.setState({ query: query.trim() })
        if (query.length > 0) {
            BooksAPI.search(query, 20).then((b) => {
                this.setState({ books: b });
            });
        } else {
            this.setState({ books: '' });
        }
    }

    render() {

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
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateSearch(event.target.value)}
                />

            </div>
          </div>
          <div className="search-books-results">
            {
              (this.state.books.length > 0) ? (
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