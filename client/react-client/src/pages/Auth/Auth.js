import React, {createRef, useEffect, useState} from 'react'
import {LoginForm} from '../../components/LoginForm/LoginForm'
import {RegisterForm} from '../../components/RegisterForm/RegisterForm'
import './Auth.css'
import MaterializeService from '../../shared/MaterializeService'
import {connect} from 'react-redux'
import {login, register} from '../../actions'
import {useToasts} from 'react-toast-notifications'

export const AuthPage = connect()(({dispatch}) => {

    const [loading, setLoading] = useState(false)
    const tabs = createRef()

    const {addToast} = useToasts()

    useEffect(() => {
      MaterializeService.initTabs(tabs.current)
    }, [])

    const registerHandler = (data) => {
      setLoading(true)
      dispatch(register(data))
        .then(_ => {
          },
          e => {
            setLoading(false)
            addToast(e.message || 'Error', {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
              }
            )
          })
    }

    const loginHandler = (data) => {
      setLoading(true)
      dispatch(login(data))
        .then(_ => {
          },
          e => {
            setLoading(false)
            addToast(e.message || 'Error', {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000
              }
            )
          })
    }

    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs" ref={tabs}>
            <li className="tab col s6"><a className="active" href="#login">Login</a></li>
            <li className="tab col s6"><a href="#register">Register</a></li>
          </ul>
        </div>
        <div id="login" className="col s12">
          <LoginForm loading={loading} onLogin={loginHandler}/>
        </div>
        <div id="register" className="col s12">
          <RegisterForm loading={loading} onRegister={registerHandler}/>
        </div>
      </div>
    )
  }
)
