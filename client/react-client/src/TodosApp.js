import React from 'react'
import {Navbar} from './components/Navbar/Navbar'
import {Routes} from './Routes'
import {connect} from 'react-redux'
import {Spinner} from './components/Spinner/Spinner'

function TodosApp({auth}) {

  const renderApp = () => {
    return (
      <>
        <Navbar userName={auth.userName}
                isAuth={auth.isAuth} imageUrl={auth.imageUrl}/>
        <Routes isAuth={auth.isAuth}/>
      </>
    )
  }

  return (
    auth.isResolved ? renderApp() : <Spinner/>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(TodosApp)
