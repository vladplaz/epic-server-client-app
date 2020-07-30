import React, {createRef, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import './SearchForm.css'
import {onSearch} from '../../actions'

const mapStateToProps = ({todos: {todos, isSearch}}) =>
  ({todos, isSearch})

export const SearchForm = connect(mapStateToProps)
(({dispatch, todos, isSearch}) => {

    const [text, setSearch] = useState('')

    const changeHandler = ({target: {value}}) => {
      const text = value.trimLeft().toLowerCase()
      setSearch(text)
      dispatch(onSearch(text, [...todos]))
    }

    return (
      <div className="input-field search">
        <input type="text" value={text}
               placeholder="Search items..."
               className="input-search"
               onChange={changeHandler}/>
        <i className={`material-icons search-icon ${isSearch ? 'is-search' : ''}`}>search</i>
      </div>
    )
  }
)
