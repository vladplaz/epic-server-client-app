import React from 'react'
import {TodoListItem} from '../TodoListItem/TodoListItem'
import './TodoList.css'

export const TodoList = (({todos}) => {
    return (
      <>
        {
          todos.map((todo, index) => {
            return (
              <div className="item"
                   key={JSON.stringify(todo)}>
                <div className="circle"></div>
                {
                  index < todos.length - 1 &&
                  <div className="line"></div>
                }
                <TodoListItem todo={todo}/>
              </div>
            )
          })
        }
      </>
    )
  }
)
