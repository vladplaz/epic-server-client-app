import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import './Navbar.css'
import {upperCaseFirst} from '../../helpers/name.helper'
import {connect} from 'react-redux'
import {logout} from '../../actions'

export const Navbar = connect()
(({isAuth, userName, imageUrl, dispatch}) => {
    return (
      <nav>
        <div className="nav-wrapper #6a1b9a purple darken-3">
          {
            isAuth &&
            <ul id="nav-mobile" className="left">

              <li className="hello"><span>Hi {upperCaseFirst(userName)}</span></li>
            </ul>
          }
          <Link to='/todos' className="brand-logo center">Todos App</Link>
          <ul id="nav-mobile" className="right">
            {
              !isAuth &&
              <li><NavLink to='/'>Login/Register</NavLink></li>
            }
            {
              isAuth &&
              <>
                <img src={imageUrl} className="image-profile" alt="profile"/>
                <li><NavLink to='/todos'>Todos</NavLink></li>
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li onClick={() => dispatch(logout())} className="logout">
                  <a>Logout</a>
                </li>
              </>
            }
          </ul>
        </div>
      </nav>
    )
  }
)
