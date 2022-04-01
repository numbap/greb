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

        const stripeLink = await API.post("stripePortal", "/portal", {});

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
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Replace with the ID of your price
        { price: price, quantity: 1 },
      ],
      mode: "subscription",
      successUrl: "app.vouch.it",
      cancelUrl: "app.vouch.it",
      customerEmail: portalState.userEmail,
    });
  };

  return (
    <div className='demo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 col-sm-6'>
            <div className='pricingTable'>
              <div className='pricingTable-header'>
                <span className='heading'>Startup</span>
              </div>
              <div className='pricing-plans'>
                <span className='price-value'>
                  <i className='fa fa-usd'></i>
                  <span>50/mo</span>
                </span>
                <span className='subtitle'>Billed Annually</span>
              </div>
              <div className='pricingContent'>
                <ul>
                  <li>
                    <b>100</b> Monthly Credits
                  </li>
                  <li>
                    <b>Free</b> training
                  </li>
                  <li>
                    <b>Unlimited</b> locations
                  </li>
                  <li>
                    <b>Unlimited</b> territories
                  </li>
                  <li>
                    <b>Bulk</b> uploads
                  </li>
                </ul>
              </div>

              <div className='pricingTable-sign-up'>
                <button
                  onClick={() => handleClick("price_1JK8YXIX2AWpfOPCncZGvy32")}
                  class='btn btn-block btn-default'
                >
                  Subscribe <i class='fas fa-house-user'></i>
                </button>
              </div>
            </div>
          </div>

          <div className='col-md-4 col-sm-6'>
            <div className='pricingTable'>
              <div className='pricingTable-header'>
                <span className='heading'>Corporate</span>
              </div>
              <div className='pricing-plans'>
                <span className='price-value'>
                  <i className='fa fa-usd'></i>
                  <span>150/mo</span>
                </span>
                <span className='subtitle'>Billed Annually</span>
              </div>
              <div className='pricingContent'>
                <ul>
                  <li>
                    <b>500</b> monthly credits
                  </li>
                  <li>
                    <b>Free</b> training
                  </li>
                  <li>
                    <b>Email</b> concierge
                  </li>
                  <li>
                    <b>Unlimited</b> locations
                  </li>
                  <li>
                    <b>Unlimited</b> territories
                  </li>

                  <li>
                    <b>Bulk</b> uploads
                  </li>
                </ul>
              </div>

              <div className='pricingTable-sign-up'>
                <button
                  onClick={() => handleClick("price_1IaY1uIX2AWpfOPCu6Yjgy7u")}
                  className='btn btn-block btn-default'
                >
                  Subscribe <i class='fas fa-building'></i>
                </button>
              </div>
            </div>
          </div>

          <div className='col-md-4 col-sm-6'>
            <div className='pricingTable'>
              <div className='pricingTable-header'>
                <span className='heading'>Agency</span>
              </div>
              <div className='pricing-plans'>
                <span className='price-value'>
                  <i className='fa fa-usd'></i>
                  <span>450/mo</span>
                </span>
                <span className='subtitle'>Billed Annually</span>
              </div>
              <div className='pricingContent'>
                <ul>
                  <li>
                    <b>2500</b> monthly credits
                  </li>
                  <li>
                    <b>Free</b> training
                  </li>
                  <li>
                    <b>Collaboration</b> concierge
                  </li>
                  <li>
                    <b>Unlimited</b> locations
                  </li>
                  <li>
                    <b>Unlimited</b> territories
                  </li>

                  <li>
                    <b>Bulk</b> uploads
                  </li>
                </ul>
              </div>

              <div className='pricingTable-sign-up'>
                <button
                  onClick={() => handleClick("price_1IaY0IIX2AWpfOPC2jAzOxFx")}
                  className='btn btn-block btn-default'
                >
                  Subscribe <i class='fas fa-city'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
