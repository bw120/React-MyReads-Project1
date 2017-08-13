import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookDetails from './BookDetails'

class Book extends Component {

    static propTypes = {
        bookInfo: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        inSearch: PropTypes.bool
    };

    state = {
        showBookDetails: false
    };

    shelves = {
        read: "Read",
        currentlyReading: "Currently Reading",
        wantToRead: "Want To Read"
    };

    toggleBookDetails = () => {
        this.setState((state) => ({ showBookDetails: !state.showBookDetails }));
    };

    render() {
        const { bookInfo, inSearch } = this.props;
        return (
            <div className="book">
            <div className="book-top">
              { this.state.showBookDetails && <BookDetails bookInfo={ this.props.bookInfo } onClose={ this.toggleBookDetails }/> }
              <a onClick={() => this.toggleBookDetails()} >
                <div className="book-cover" style={ {width: 128, height: 193, backgroundImage: "url(" + ((bookInfo.imageLinks) ? bookInfo.imageLinks.smallThumbnail : 'images/defaultBookThumb.png' ) + ")" }}></div>
              </a>
              { inSearch && this.shelves[bookInfo.shelf] && <div className="book-shelf-flag">{ this.shelves[bookInfo.shelf] }</div> }
              <div className="book-shelf-changer">
                <select value={bookInfo.shelf} onChange={ (event) => this.props.onChangeShelf(bookInfo, event.target.value) }>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{ bookInfo.title || "" }</div>
            <div className="book-authors">{ bookInfo.author || "" }</div>
          </div>
        );
    }
};

export default Book;