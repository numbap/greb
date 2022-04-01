import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import awsExports from "./aws-exports";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";

import "react-rangeslider/lib/index.css";
import TerritoryListing from "./components/territory/listing";
import Header from "./components/header/header";
import Profile from "./components/profile/profile";

import Footer from "./components/footer/footer";
import { Provider } from "react-redux";
// import {AmplifyAuthenticator, AmplifySignIn} from '@aws-amplify/ui-react'
import store from "./store/index.js";
import FreePaid from "./components/location/freePaid"
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();


Amplify.configure(awsExports);

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={customHistory}>
          <Header credits={this.props.credits} userName={"Loading..."} />
          <div className="inner-wrapper">
            <Switch>
               <Route path='/' exact children={<TerritoryListing />} />
               <Route
                 path='/t/:id'
                 exact
                children={<FreePaid credits={this.props.credits} />}
              />
              <Route path='/profile' children={<Profile />} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Provider>
    )
  }
}

export default App


