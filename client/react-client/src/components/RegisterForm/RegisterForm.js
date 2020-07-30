import React from 'react'
import {useForm} from 'react-hook-form'

export const RegisterForm = ({onRegister, loading}) => {

  const {register, handleSubmit, errors} = useForm()

  const submitHandler = (data) => {
    onRegister(data)
  }

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit(submitHandler)}>
        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input id="username" type="text"
                   name="userName"
                   ref={register({required: true})}/>
            <label htmlFor="username">Username</label>
            {
              errors.password &&
              <span className="helper-text" data-error="wrong"
                    data-success="right">Username is required</span>
            }
          </div>
          <div className="input-field">
            <i className="material-icons prefix">alternate_email</i>
            <input id="email_r" type="text"
                   name="email"
                   ref={register({required: true})}/>
            <label htmlFor="email_r">Email</label>
            {
              errors.email &&
              <span className="helper-text" data-error="wrong"
                    data-success="right">Email is required</span>
            }
          </div>
          <div className="input-field">
            <i className="material-icons prefix">vpn_key</i>
            <input id="password_r" type="password"
                   name="password"
                   ref={register({required: true, minLength: 6})}/>
            <label htmlFor="password_r">Password</label>
            {
              errors.password?.type === 'required' &&
              <span className="helper-text" data-error="wrong"
                    data-success="right">Password is required</span>
            }
            {
              errors.password?.type === 'minLength' &&
              <span className="helper-text text-danger" data-error="wrong"
                    data-success="right">Min length is 6</span>
            }
          </div>
          <div className="input-field">
            <button className="btn"
                    disabled={loading}
                    type="submit"
            >Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
