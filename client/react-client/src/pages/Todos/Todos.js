import React, {useEffect} from 'react'
import {TodoMainForm} from '../../components/TodoMainForm/TodoMainForm'
import {TodoList} from '../../components/TodosList/TodosList'
import './Todos.css'
import {connect} from 'react-redux'
import {fetchTodos} from '../../actions'
import {SearchForm} from '../../components/SearchForm/SearchForm'
import {Spinner} from '../../components/Spinner/Spinner'

const {useState} = require('react')

const mapStateToProps = ({
                           todos:
                             {searchTodos, todos, isSearch}
                         }) =>
  ({
    todos,
    searchTodos,
    isSearch
  })

export const TodosPage = connect(mapStateToProps)
(({dispatch, todos, isSearch, searchTodos}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
      dispatch(fetchTodos())
        .then(() => setLoading(false))
    }, [])

    const items = isSearch ? searchTodos : todos

    if(loading)
      return <Spinner/>

    return (
      <div className="container">
        <TodoMainForm/>
        <SearchForm/>
        {
          items.length > 0 ? (
              <div className="todos">
                <TodoList todos={items}/>
              </div>
            )
            : isSearch
            ? <p className="center no-todos">No items by this search</p>
            : <p className="center no-todos">Lets begin</p>
        }
      </div>
    )
  }
)
