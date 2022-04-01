import React, { useEffect, useState } from "react";
import Amplify, { Auth, API } from "aws-amplify";
import CustomSignout from "../header/customSignout"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import { connect } from "react-redux";

import { AmplifySignOut } from "@aws-amplify/ui-react";

import logo from "./img/logo.svg"

class HeaderSEO extends React.Component {

  render() {

    return (

      <header className="header">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <a className='navbar-brand' href='https://vouch.it'>
                <img src={logo} width="135px" className="m-1" />
              </a>
            </div>
            <div className="col-md-6">
              <div id="userbox" className="float-right">
                <div className="userbox profile-info">
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderSEO;