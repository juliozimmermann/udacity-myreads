import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

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

export default Shelf;