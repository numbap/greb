import React, { useEffect, useState } from "react";
import stripeCheckout from "react-stripe-checkout";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { loadStripe } from "@stripe/stripe-js";
import "./pricing.css";


const stripePromise = loadStripe("pk_live_L2mMsd1SE8FmcR99WC0DbPBt000L9zeASj");
const initialState = {
  url: null,
  userAccount: null,
  newUser: null,
  userEmail: null,
};

const Pricing = () => {
  const [portalState, setPortalState] = useState(initialState);

  useEffect(() => {
    const getPortalLink = async () => {
      try {
        const userAccount = await Auth.currentAuthenticatedUser();
        await setPortalState({ ...portalState, userAccount: userAccount });

        const stripeLink = await API.post("stripePortal", "/", {});

        await setPortalState({
          ...portalState,
          url: stripeLink.stripe.url,
          newUser: stripeLink.newUser,
          userEmail: userAccount.attributes.email,
        });
        console.log(stripeLink);
      } catch (err) {
        console.log(err);
      }
    };
    getPortalLink();
  }, []);

  const handleClick = async (price) => {
    // When the customer clicks on the button, redirect them to Checkout.
    console.log(window.location.host, "Hostname")
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Replace with the ID of your price
        { price: price, quantity: 1 },
      ],
      mode: "subscription",
      successUrl: `https://${window.location.host}`,
      cancelUrl: `https://${window.location.host}`,
      customerEmail: portalState.userEmail,
    });
  };

  return (

        <div className="pricing-table row no-gutters mt-3 mb-3">
        <div className="col-lg-6 col-sm-6">
          <div className="plan">
            <h3>Genius Membership<span>Free</span></h3>
            <ul>
              <li><strong>500</strong> credits/mo.</li>
              <li>Map IP Addresses</li>
              <li>Map Mailing Addresses</li>
              <li>Center-of-mass Geofencing</li>
              <li>Bulk Uploads</li>
              <li>Unlimited Locations</li>
              <li>Unlimited Territories</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-sm-6 text-center">
          <div className="plan most-popular">
            <div className="plan-ribbon-wrapper"><div className="plan-ribbon">Best Value</div></div>
            <h3>Pro Membership<span>$749</span></h3>
            <button className="btn btn-lg btn-primary" 
              onClick={() => handleClick("price_1JkiIpIX2AWpfOPCtr7qEZCt")}
              >Upgrade</button>
            <ul>
            <li><strong>5000</strong> credits/mo.</li>
            <li>Map Geocoordinates</li>
            <li>Clustering</li>
            <li>Detailed Statistics</li>
            <li>Support</li>
            <li>Map IP Addresses</li>
            <li>Map Mailing Addresses</li>
            <li>Center-of-mass Geofencing</li>
            <li>Bulk Uploads</li>
            <li>Unlimited Locations</li>
            <li>Unlimited Territories</li>
            </ul>

          </div>
        </div>

        </div>

  );
};

export default Pricing;