import React from 'react'
import {Provider} from 'react-redux'
import {ToastProvider} from 'react-toast-notifications'
import initStore from './store'
import {BrowserRouter as Router} from 'react-router-dom'
import TodosApp from './TodosApp'
import {loginFromStore} from './actions'

const store = initStore()

class App extends React.Component {

  componentDidMount() {
    store.dispatch(loginFromStore())
  }

  render() {
    return (
      <Provider store={store}>
        <ToastProvider>
          <Router>
            <TodosApp/>
          </Router>
        </ToastProvider>
      </Provider>
    )
  }
}

export default App
