import React, {Component} from 'react'


export class InternalApp extends Component {
  render() {
    if (this.props.authState === 'signedIn') {
      return (
        <div>
          <p>Internal Application behind Login</p>
        </div>
      )
    } else {
      return null
    }
  }
}