import React, {useEffect, useState} from 'react'
import * as api from '../../api'
import {Spinner} from '../../components/Spinner/Spinner'
import './Profile.css'
import {useToasts} from 'react-toast-notifications'
import {connect} from 'react-redux'
import {editUser} from '../../actions'

const mapStateToProps = ({auth: {imageUrl, userName}}) =>
  ({imageUrl, userName})

export const ProfilePage = connect(mapStateToProps)
(({imageUrl, userName, dispatch}) => {

    const [user, setUser] = useState({
      image: '',
      userName,
      imagePreview: imageUrl
    })
    const [loading, setLoading] = useState(false)

    const {addToast} = useToasts()

    if(loading) {
      return <Spinner/>
    }

    const userNameHandler = ({target: {value}}) => {
      setUser({...user, userName: value})
    }

    const submitHandler = (e) => {
      e.preventDefault()
      setLoading(true)
      dispatch(editUser(user))
        .then(() => {
          setLoading(false)
          addToast('Information updated', {
              appearance: 'success',
              autoDismiss: true,
              autoDismissTimeout: 2000
            }
          )
        })
    }

    const imageHandler = ({target: {files}}) => {
      const reader = new FileReader()
      reader.onload = function(e) {
        setUser({
          ...user,
          imagePreview: e.target.result,
          image: files[0]
        })
      }
      reader.readAsDataURL(files[0])
    }

    return (
      <div className="container">
        <div className="row">
          <form className="col s6" onSubmit={submitHandler}>
            <div className="image">
              <img className="materialboxed" width="200"
                   src={user.imagePreview}/>
            </div>
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file"
                       onChange={imageHandler}/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path" type="text"/>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input type="text"
                       placeholder="Username"
                       onChange={userNameHandler}
                       value={user.userName}/>
              </div>
            </div>
            <button className="btn" type="submit">Save</button>
          </form>
        </div>
      </div>
    )
  }
)
