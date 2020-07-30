import React, {useState} from 'react'
import './TodoMainForm.css'
import {connect} from 'react-redux'
import {addTodo} from '../../actions'
import {useToasts} from 'react-toast-notifications'

const mapStateToProps=({todos:{isSearch}})=>({isSearch})

export const TodoMainForm = connect(mapStateToProps)(({dispatch,isSearch}) => {

    const [todo, setTodo] = useState({
      text: '',
      stared: false
    })

  const {addToast} = useToasts()

    const starHandler = () => {
      setTodo({...todo, stared: !todo.stared})
    }

    const changeHandler = ({target: {value}}) => {
      setTodo({...todo, text: value})
    }

    const submitHandler = ({key}) => {
      if(key === 'Enter' && todo.text.trim()) {
        dispatch(addTodo(todo))
          .then(()=>{
            addToast('Todo added', {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 1000
              }
            )
          })
        setTodo({text: '', stared: false})
      }
    }

    return (
      <div className="row">
        <div className="input-field">
          <i className="material-icons prefix">mode_edit</i>
          <input placeholder="Add todo..."
                 className="materialize-input"
                 value={todo.text}
                 onChange={changeHandler}
                 onKeyDown={submitHandler}
                 disabled={isSearch}
          />
          <i className={`material-icons prefix ${todo.stared ? 'stared' : ''}`}
             onClick={starHandler}
          >
            {todo.stared ? 'star' : 'star_border'}
          </i>
        </div>
      </div>
    )
  }
)
