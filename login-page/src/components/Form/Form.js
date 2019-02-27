import React from 'react'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputName: React.createRef(),
      inputPassword: React.createRef(),
      ifErrorMessage: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    alert(
      'A name was submitted: ' +
        this.state.inputName.current.value +
        this.state.inputPassword.current.value
    )
    let url // server route
    let data = {
      username: this.state.inputName.current.value,
      password: this.state.inputPassword.current.value
    } // JSON username/password

    console.log(data)

    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(data), // data can be `string` or {object}!
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    //   // triggered with authentication error
    // }).then(() => {
    //   this.setState({ ifErrorMessage: true })
    // })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className='formComponent'>
        <label>
          Name:
          <br />
          <input
            type='text'
            ref={this.state.inputName}
            className='inputField'
          />
        </label>
        <label>
          <br />
          Password:
          <br />
          <input
            type='text'
            ref={this.state.inputPassword}
            className='inputField'
          />
        </label>
        <br />
        <input type='submit' value='Submit' className='inputButton' />
        <br />
        {!this.state.ifErrorMessage ? (
          <div className='loginError'>
            There was a problem with the login. Please try again.
          </div>
        ) : null}
      </form>
    )
  }
}

export default Form
