import React, {Component} from 'react'
import {InternalApp} from './InternalApp'
import {CustomSignIn} from './customSignIn'

class AuthWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
    this.updateUsername = this.updateUsername.bind(this)
  }

  updateUsername(newUsername) {
    this.setState({username: newUsername})
  }

  render() {
    return (
      <div className="flex-1">
        <CustomSignIn
          authState={this.props.authState}
          updateUsername={this.updateUsername}
          onStateChange={this.props.onStateChange}
        />
      </div>
    )
  }
}

export default AuthWrapper
