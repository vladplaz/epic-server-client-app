import React, {useState} from 'react'
import './TodoListItem.css'
import {TodoList} from '../TodosList/TodosList'
import {TodoForm} from '../TodoForm/TodoForm'
import {connect} from 'react-redux'
import {changeOpen, deleteTodo, editTodo, markExecuted, markStared} from '../../actions'
import {EditModal} from '../EditModal/EditModal'
import {createIdsArray} from '../../helpers/array.helper'
import {useToasts} from 'react-toast-notifications'

const mapStateToProps = ({todos: {isSearch}}) => ({isSearch})

export const TodoListItem = connect(mapStateToProps)
(({todo, dispatch, isSearch}) => {

    const [isCreating, setCreate] = useState(false)
    const [isEdit, setEdit] = useState(false)

    const {addToast} = useToasts()

    const openHandler = () => {
      dispatch(changeOpen(todo.id, !todo.isOpen))
    }

    const createTodoHandler = () => {
      setCreate(!isCreating)
    }

    const starHandler = () => {
      dispatch(markStared(todo.id, !todo.stared))
        .then(() => {
          addToast('Stared complete', {
              appearance: 'success',
              autoDismiss: true,
              autoDismissTimeout: 1000
            }
          )
        })
    }

    const execHandler = ({target: {checked}}) => {
      dispatch(markExecuted(todo.id, checked))
        .then(() => {
          addToast('Executed complete', {
              appearance: 'success',
              autoDismiss: true,
              autoDismissTimeout: 1000
            }
          )
        })
    }

    const deleteHandler = () => {
      if(window.confirm(`Delete this todo ${todo.todos.length ? 'and all branches ' : ''}?`)) {
        dispatch(deleteTodo(todo.id,
          [todo.id, ...createIdsArray(todo.todos)]))
      }
    }

    const editHandler = () => {
      setEdit(!isEdit)
    }

    const onEditFinish = (result) => {
      setEdit(false)
      if(result.status === 'ok' && todo.text !== result.text) {
        dispatch(editTodo(todo.id, result.text))
          .then(() => {
            addToast('Edit complete', {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 1000
              }
            )
          })
      }
    }

    return (
      <div className="todo-container">
        <div className="todo-item">
          <i className="material-icons prefix edit"
             onClick={editHandler}
          >mode_edit</i>
          <div className="todo-item-text">
            {todo.text}
          </div>
          {
            todo.executed &&
            <div className="executed"></div>
          }
          <div className="todo-item-actions">
            <p>
              <label>
                <input type="checkbox" checked={todo.executed}
                       onChange={execHandler}
                />
                <span></span>
              </label>
            </p>
            <i className={`material-icons prefix star 
        ${todo.stared ? 'stared' : ''}`}
               onClick={starHandler}
            >
              {todo.stared ? 'star' : 'star_border'}
            </i>
            {
              !isSearch &&
              <i className="material-icons prefix delete"
                 onClick={deleteHandler}
              >
                delete
              </i>
            }
          </div>
          {
            todo.todos.length > 0 && !isSearch &&
            <>
              <i className="material-icons open"
                 onClick={openHandler}
              >
                keyboard_arrow_down
              </i>
            </>
          }
          {
            !isSearch &&
            <i className="material-icons add"
               onClick={createTodoHandler}
            >
              add
            </i>
          }
        </div>
        {
          isCreating &&
          <div className="next">
            <TodoForm parent={todo.id}/>
          </div>
        }
        {
          todo.isOpen &&
          <div className="next">
            <TodoList todos={todo.todos}/>
          </div>
        }
        {
          isEdit &&
          <EditModal todoText={todo.text} onEditFinish={onEditFinish}/>
        }
      </div>
    )
  }
)
