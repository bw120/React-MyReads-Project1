import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        bookInfo: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {
        const { bookInfo } = this.props;

        return (
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookInfo.imageLinks.smallThumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={bookInfo.shelf} onChange={(event) => this.props.onChangeShelf(bookInfo, event.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{ bookInfo.title }</div>
            <div className="book-authors">{ bookInfo.author }</div>
          </div>
        );
    }

}

export default Book;