import React from 'react'
import { Route } from 'react-router-dom'
import StaticConfigs from './config/staticConfig'
import BookShelves from './pages/BookShelves'
import SearchBooks from './pages/SearchBooks'
import * as BooksAPI from './api/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		shelves: StaticConfigs.shelves,
		allBooks: [],
		queryCurrentSearch: '',
		currentSearch: []
	}

	componentDidMount = () => ( this.handleAllBooks() )

	handleAllBooks = () => ( BooksAPI.getAll().then((allBooks) => ( this.setState({ allBooks: allBooks }) )) )

	handleSearchBook = (inputSearch) => {
    	let request = null;

    	this.setState({queryCurrentSearch: inputSearch})

		if (inputSearch) {
			request = BooksAPI.search(inputSearch, 10).then((searchResult) => {
				this.setState({currentSearch: searchResult instanceof Array ? searchResult : [] })
			})
		} else {
			this.setState({currentSearch: [] })
		}

		return request || Promise.resolve();
	}

	handleShelfChange = (bookToChange, newShelf) => (BooksAPI.update(bookToChange, newShelf).then(() => (this.handleAllBooks())))

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<BookShelves books={this.state.allBooks}
								shelves={this.state.shelves}
								handleShelfChange={this.handleShelfChange} />
				)}  />

				<Route exact path='/SearchPage' render={({history}) => (
					<SearchBooks querySearchBooks={ this.state.queryCurrentSearch }
								dataSearchBooks={ this.state.currentSearch }
								shelves={this.state.shelves}
								books={this.state.allBooks}
								handleSearchBook={this.handleSearchBook}
								handleShelfChange={(book, shelf) => {
									this.handleShelfChange(book, shelf);
									history.push('/')
								}} />
				)} />
			</div>
		)
	}
}

export default BooksApp
