
import React from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">

    {/* Main page route */}

        <Route exact path="/" render={() => (
          <Bookshelf/>
        )}/>

    {/* Search page route */}

        <Route exact path="/search" render={() => (
          <Search/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
