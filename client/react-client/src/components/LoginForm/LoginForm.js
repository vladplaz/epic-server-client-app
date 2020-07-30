import React from 'react'
import {useForm} from 'react-hook-form'

export const LoginForm = ({onLogin, loading}) => {

  const {register, handleSubmit, errors} = useForm()

  const submitHandler = (data) => {
    onLogin(data)
  }

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit(submitHandler)}>
        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">alternate_email</i>
            <input id="email_l" type="text"
                   name="email"
                   ref={register({required: true})}/>
            <label htmlFor="email_l">Email</label>
            {
              errors.email &&
              <span className="helper-text" data-error="wrong"
                    data-success="right">Email is required</span>
            }
          </div>
          <div className="input-field">
            <i className="material-icons prefix">vpn_key</i>
            <input id="password_l" type="password"
                   name="password"
                   ref={register({required: true})}/>
            <label htmlFor="password_l">Password</label>
            {
              errors.password &&
              <span className="helper-text" data-error="wrong"
                    data-success="right">Password is required</span>
            }
          </div>
          <div className="input-field">
            <button className="btn"
                    disabled={loading}
                    type="submit"
            >Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
