import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Book } from './BookShelves';
import { LoadingIndicator } from '../controls/LoadingIndicator'

export class SearchBooks extends Component {
    static propTypes = {
        querySearchBooks: PropTypes.string.isRequired,
        dataSearchBooks: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        handleSearchBook: PropTypes.func.isRequired,
        handleShelfChange: PropTypes.func.isRequired
    }

    state = {
        searchsInProgress: 0
    }

    updateSearchsInProgress = (value) => (this.setState((currentState) => ( { searchsInProgress: currentState.searchsInProgress + value } )))
    increaseSearchsInProgress = () => (this.updateSearchsInProgress(1))
    dencreaseSearchsInProgress = () => (this.updateSearchsInProgress(-1))

    handleSearchBookProxy = (inputSearch) => {
        this.increaseSearchsInProgress();
        this.props.handleSearchBook(inputSearch).then(() => (this.dencreaseSearchsInProgress()));
    }

    render() {
        return (
            <div key='divSearchBooks' className="search-books">
                <div key='divSearchBooksbar' className="search-books-bar">
                    <Link key='linkSearchBooksClose' className="close-search" to='/'>Close</Link>
                    <div key='divSearchBooksInputWrapper' className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input key='inputSearchBooks' type="text" value={this.props.querySearchBooks}
                            onChange={(event) => this.handleSearchBookProxy(event.target.value)}
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div key='divSearchBooksResults' className="search-books-results">
                    <LoadingIndicator display={this.state.searchsInProgress > 0} />
                    {/* <div key='divSearchBooksResultsLoading' className='search-books-results-loading'
                        style={{display: this.state.searchsInProgress > 0 ? 'flex' : 'none'}} /> */}
                    <ol key='olSearchBooksGrid' className="books-grid">
                        {
                            (this.props.querySearchBooks.length > 0 &&
                            this.props.dataSearchBooks.length === 0) ?
                                <li key='liSearchBooksNotFound'>No books found</li>
                            :
                                this.props.dataSearchBooks.map((book) => {
                                    let foundBook = this.props.books.filter((currentBook) => (currentBook.title === book.title))
                                    return <Book key={'bookSearchBooks' + book.id}
                                                book={book}
                                                shelf={foundBook.length > 0 ? foundBook[0].shelf : 'none'}
                                                shelves={this.props.shelves}
                                                handleShelfChange={this.props.handleShelfChange}/>
                                })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks