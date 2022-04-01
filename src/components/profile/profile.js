import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import ContentCard from "./cards/contentCard"
import ReactGA from "react-ga4";
import { connect } from "react-redux";

const stripePromise = loadStripe("pk_live_L2mMsd1SE8FmcR99WC0DbPBt000L9zeASj");
const initialState = {
  url: null,
  userAccount: null,
  newUser: null,
  userEmail: null,
};

const Profile = (props) => {
  const [portalState, setPortalState] = useState(initialState);
  ReactGA.initialize("G-P2T7YZS1NX");

  useEffect(() => {
    const getPortalLink = async () => {
      try {
        const userAccount = await Auth.currentAuthenticatedUser();
        await setPortalState({ ...portalState, userAccount: userAccount });

        // window.location.hostname.contains("localhost") ? "https://localhost:3000" : "https://main.d1dqcess7witkd.amplifyapp.com"
        const myInit = {
          body: { redirect: window.location.host.toString() },
        };
        // console.log(window.location.host.toString().includes("localhost"), "reeeee" )
        const stripeLink = await API.post("stripePortal", "/");

        await setPortalState({
          ...portalState,
          url: stripeLink.stripe.url,
          newUser: stripeLink.newUser,
          userEmail: userAccount.attributes.email,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPortalLink();
  }, []);

  if(portalState.url && !portalState.newUser){
    ReactGA.event({
      category: "pro_visit",
      action: "pro_visit",
      label: "pro_visit", // optional
      value: 1, // optional, must be a number
      nonInteraction: true, // optional, true/false
      transport: "xhr", // optional, beacon/xhr/image
    });
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h1>
            {portalState.newUser && "Practical Tools for Elite Growth Hackers" }
            {portalState.url && !portalState.newUser && "Profile"}
          </h1>


        </div>

        <div className='col-md-12'>
          {portalState.newUser && <ContentCard />}

          {portalState.url && !portalState.newUser && (props.stripeClient != "cus_K7hmOHO3fWIcwG") && (
            <a href={portalState.url}>Go To Portal</a>
          )}
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return { 
    stripeClient: state.stripeClient};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCredits: (payload) =>
      dispatch({ type: "UPDATE_CREDITS", payload: payload }),
    updateLatLonStats: (LatLonStats) =>
      dispatch({ type: "UPDATE_LLS", payload: LatLonStats }),
    setTerritory: (LatLonStats) =>
      dispatch({ type: "SET_TERRITORY", payload: LatLonStats }),
    updateLocations: (locations) =>
      dispatch({ type: "UPDATE_LOCATIONS", payload: locations }),
    updateClusteredLocations: (clusteredLocations) =>
      dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: clusteredLocations }),
    updateCentroids: (centroids) =>
      dispatch({ type: "UPDATE_CENTROIDS", payload: centroids }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


