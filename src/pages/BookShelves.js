import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Book = (props) => {
    return (
        <li key={props.book.id}>
            <div key={'divBook' + props.book.id} className="book">
                <div key={'divBookTop' + props.book.id} className="book-top">
                    <div key={'divBookCover' + props.book.id} className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage: `url("${props.book.imageLinks ? props.book.imageLinks.thumbnail : ''}")` }} />
                    <div key={'divBookShelfChanger' + props.book.id} className="book-shelf-changer">
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

const Shelf = (props) => {
    return (
        <div key={'divBookShelf' + props.shelf.shelf} className="bookshelf">
            <h2 key={'divBookShelfTitle' + props.shelf.shelf} className="bookshelf-title">{props.shelf.description}</h2>
            <div key={'divBookShelfBooks' + props.shelf.shelf} className="bookshelf-books">
                <ol key={'divBookShelfBooksGrid' + props.shelf.shelf} className="books-grid">
                    {
                        props.books.map((book) => (
                            <Book key={'bookShelf' + props.shelf.shelf + 'Book' + book.id}
                                  book={book}
                                  handleShelfChange={props.handleShelfChange}
                                  shelves={props.shelves} />
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
}

class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        handleShelfChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <div key='divListBooks' className="list-books">
                <div key='divListBooksTitle' className="list-books-title">
                    <h1 key='h1ListBooksTitle'>MyReads</h1>
                </div>
                <div key='divListBooksContent' className="list-books-content">
                    {
                        this.props.shelves.map((shelf) => (
                            <Shelf key={'shelfListBooksContent' + shelf.shelf}
                                    shelf={shelf}
                                    books={this.props.books.filter((bookFilter) => (bookFilter.shelf === shelf.shelf))}
                                    shelves={this.props.shelves}
                                    handleShelfChange={this.props.handleShelfChange} />
                        ))
                    }
                </div>
                <div key='divListBooksOpenSearch' className="open-search">
                    <Link key='linkListBooksOpenSearch' to='/SearchPage'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookShelves;