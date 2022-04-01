import React, { useEffect, useState } from "react";
import Amplify, { Auth, API } from "aws-amplify";
import CustomSignout from "./customSignout"

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

API.configure();

const dssdasda = async () => {
  try {
    const apiName = "llcalc";
    const path = "/string";
    const myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
    };
    API.get(apiName, path, myInit)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });

    // API.get("llcalc", "/string", { body: { toot: "ddddddddd" } });
  } catch (err) {
    console.log(err);
  }
};

const apiName = "geocoordinates"; // replace this with your api name.
const path = "/string"; //replace this with the path you have configured on your API
const myInit = {
  body: { salad: "potato" }, // replace this with attributes you need
  headers: {}, // OPTIONAL
};

// How do I pass these props using redux?
// Convert this into a class
// https://chriscourses.com/blog/redux
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const getCurrentUser = async () => {
      const userInfo = await Auth.currentUserInfo();
      const stripeAPI = await API.post("stripePortal", "/", {});
      const { credits, userName, userId, stripeClient, accountLevel } = stripeAPI.userAccount;

      await this.props.setCredits({
        credits,
        userName,
        accountLevel: accountLevel,
        sub: userId,
        stripeClient: stripeClient,
      });
    };
    getCurrentUser();
  }

  render() {

    return (

      <header className="header">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <Link className='navbar-brand' to='/'>
                <img src={logo} width="135px" className="m-1" />
              </Link>

            </div>
            <div className="col-md-6">
              <div id="userbox" className="float-right">
                <div className="userbox profile-info">
                  <Link className='nav-link' to='/profile'>
                    <span className="name">{this.props.userName}</span>
                    <span className="role">{this.props.credits == -1 || this.props.credits} Credits</span>
                  </Link>
                  <CustomSignout />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCredits: (payload) =>
      dispatch({ type: "UPDATE_CREDITS", payload: payload }),
    initState: () => dispatch({ type: "INIT_STATE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);