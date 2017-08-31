import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Shelf from '../components/Shelf';

class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        handleShelfChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <div key="divListBooks" className="list-books">
                <div key="divListBooksTitle" className="list-books-title">
                    <h1 key="h1ListBooksTitle">MyReads</h1>
                </div>
                <div key="divListBooksContent" className="list-books-content">
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
                <div key="divListBooksOpenSearch" className="open-search">
                    <Link key="linkListBooksOpenSearch" to="/SearchPage">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookShelves;