import React from 'react';
import PropTypes from 'prop-types';

const BookImage = (props) => {
    return (
        <div key={'divBookCover' + props.bookId} className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url("${props.imagePath}")` }} />
    );
}

BookImage.propTypes = {
    bookId: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
}

const BookSelectShelf = (props) => {
    return (
        <select key={'selectBookShelfChanger' + props.book.id} value={props.book.shelf || props.shelf || 'none'}
                onChange={(event) => (props.handleShelfChange(props.book, event.target.value))}>
            <option key={'optionBookShelfChangerNoneDisabled' + props.book.id} value="noneDisabled" disabled>Move to...</option>
                {
                    props.shelves.map((shelf) => (
                        <option key={'optionBookShelfChanger' + shelf.shelf + props.book.id} value={shelf.shelf}>
                            {shelf.description}
                        </option>
                    ))
                }
            <option key={'optionBookShelfChangerNone' + props.book.id} value="none">None</option>
        </select>
    );
}

BookSelectShelf.propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string,
    shelves: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
}

export const Book = (props) => {
    return (
        <li key={props.book.id}>
            <div key={'divBook' + props.book.id} className="book">
                <div key={'divBookTop' + props.book.id} className="book-top">
                    <BookImage bookId={props.book.id} imagePath={props.book.imageLinks ? props.book.imageLinks.thumbnail : ''} />
                    <div key={'divBookShelfChanger' + props.book.id} className="book-shelf-changer">
                        <BookSelectShelf book={props.book} shelf={props.shelf} shelves={props.shelves} handleShelfChange={props.handleShelfChange} />   
                    </div>
                </div>
                <div key={'divBookTitle' + props.book.id} className="book-title">{props.book.title}</div>
                <div key={'divBookAuthors' + props.book.id} className="book-authors">
                    { (props.book.authors instanceof Array && props.book.authors.join(', ') )}
                </div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string,
    shelves: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
}

export default Book;