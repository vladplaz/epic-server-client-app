import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {TodosPage} from './pages/Todos/Todos'
import {ProfilePage} from './pages/Profile/Profile'
import {AuthPage} from './pages/Auth/Auth'

export const Routes = ({isAuth}) => {
  if(isAuth) {
    return (
      <Switch>
        <Route path='/todos'><TodosPage/></Route>
        <Route path='/profile'><ProfilePage/></Route>
        <Redirect to='/todos'/>
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/'><AuthPage/></Route>
      <Redirect to='/'/>
    </Switch>
  )
}
