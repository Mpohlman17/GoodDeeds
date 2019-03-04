import React, { Component } from 'react'
import Form from '../Form/Form'
import logo from './gooddeedslogo.svg'

class LoginPage extends Component {
  render () {
    return (
      <div className='loginPage'>
        <img src={logo} alt='logo' id='signupLogo' />
        <div className='headerArea'>
          {' '}
          <h2 className='signupHeader'>Login / Sign up</h2>
        </div>
        <br />
        <Form />
      </div>
    )
  }
}

export default LoginPage
