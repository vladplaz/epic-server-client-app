import {combineReducers} from 'redux'
import auth from './auth.reducer'
import todos from './todo.reducer'

const app = combineReducers({
  auth,
  todos
})

export default app
