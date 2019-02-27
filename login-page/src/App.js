import React, { Component } from 'react'
import './App.css'
import '../src/components/CSS/formstyle.css'
import LoginPage from './components/LoginPage/LoginPage'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <LoginPage />
      </div>
    )
  }
}

export default App
