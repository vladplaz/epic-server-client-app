import React, {createRef, useEffect, useState} from 'react'
import './TodoForm.css'
import {connect} from 'react-redux'
import {addTodo} from '../../actions'
import {useToasts} from 'react-toast-notifications'

export const TodoForm = connect()(({parent, dispatch}) => {

    const [todoText, setText] = useState('')
    const input = createRef()

    const {addToast} = useToasts()

    const changeHandler = ({target: {value}}) => {
      setText(value)
    }

    useEffect(() => {
      input.current.focus()
    }, [])

    const submitHandler = ({key}) => {
      if(key === 'Enter' && todoText.trim()) {
        dispatch(addTodo({text: todoText, parent}))
          .then(() => {
            addToast('Todo added', {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 1000
              }
            )
          })
        setText('')
      }
    }

    return (
      <div className="row form">
        <div className="input-field">
          <input placeholder="Add branch...."
                 className="materialize-textarea"
                 value={todoText}
                 onChange={changeHandler}
                 onKeyDown={submitHandler}
                 ref={input}
          />
        </div>
      </div>
    )
  }
)
