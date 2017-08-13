import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScrollLock from 'react-scrolllock';

class BookDetails extends Component {

    static propTypes = {
        bookInfo: PropTypes.object.isRequired,
        onClose: PropTypes.func
    };

    shelves = {
        read: "Read",
        currentlyReading: "Currently Reading",
        wantToRead: "Want To Read"
    };

    //Get ISBN-13 if available
    getISBN = () => {
        let isbn13 = [];
        if (this.props.bookInfo.industryIdentifiers) {
          isbn13 = this.props.bookInfo.industryIdentifiers.filter((item) => { return item.type === "ISBN_13" });
        }
        return (isbn13[0]) ? isbn13[0].identifier : <em>Not available</em>;
    }

    render() {
        const { bookInfo } = this.props;
        return (
            <div className="modal-bg">
              <div className="modal-container">
                <div className="scroll">
                  <div className="modal-top-bar">
                    <h2 className="modal-title">{ bookInfo.title || <em>Not available</em> }</h2>
                    <a className="close-button" onClick={() => this.props.onClose()}> ×</a>
                  </div>
                  <div className="modal-details-container">
                    <div className="book-cover modal-thumb" style={ {width: 128, height: 193, backgroundImage: "url(" + ((bookInfo.imageLinks) ? bookInfo.imageLinks.smallThumbnail : 'images/defaultBookThumb.png' ) + ")" }}></div>
                    <div className="modal-details">
                      <div className="modal-detail-item"><span className="detail-name">Rating: </span>{ bookInfo.averageRating || <em>Not available</em> }</div>
                      <div className="modal-detail-item">
                        <span className="detail-name">Author{(bookInfo.authors && bookInfo.authors.length > 1) ? "s" : "" }: </span>
                        { (bookInfo.authors) ? bookInfo.authors.join(", ") : <em>Not available</em>}
                      </div>
                      <div className="modal-detail-item"><span className="detail-name">Publisher: </span>{ bookInfo.publisher || <em>Not available</em>}</div>
                      <div className="modal-detail-item"><span className="detail-name">ISBN-13: </span>{ this.getISBN() }</div>
                    </div>
                    <div className="modal-description">
                      <div className="detail-name">Description: </div>
                      { bookInfo.description || <em>Not available</em> }
                    </div>
                  </div>
                </div>
              </div>
              <ScrollLock />
            </div>
        );
    }
};

export default BookDetails;