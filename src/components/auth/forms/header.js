import React from 'react'
import logo from './Black logo - no background.png'

const Header = (props) => (
    <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6"><img src={logo} alt="Vouch.it"/></div>
        <div className="col-md-3"></div>
    </div>
)

export default Header

