import React, { useState } from "react";
import "./pricing.css";
import Coins from "./img/abundantcredits.jpg"
import CSV from "./img/SSVimg.png"
import ClusterMap from './img/clustermap.png'
import Graphs from './img/graphs.png'

const SalesContent = () => {

    return(
        <div>
            <p>We hope that you’re enjoying the Genius Edition of VouchIt. This powerful system offers everything you need to accurately trim waste and optimize the ROI of your digital campaigns. And best of all, it’s FREE to use. </p>

            <p>We also recognize that some power users require more sophisticated analysis and better transparency under more demanding conditions. </p>

            <p>For these elite clients, we’ve created the Pro Membership.</p>
            <hr />
            <div className="container pr-5 pl-5">
                <div className="row pt5 ">
                <div className="col-md-6">
                    <h3 ><strong>Density-Based Clustering</strong></h3>
                    <p ><small>Center-of-mass geofencing is excellent for optimizing for small datasets. With larger groups, more efficiency can be achieved by isolating outliers and breaking the remaining locations into smaller clusters. Our AI makes this effortless.  </small></p>
                </div>
                <div className="col-md-6 center">
                <img className="center" src={ClusterMap} width="300" />
                </div>
            </div>
            <hr />
            <div className="row pt3 ">
                <div className="col-md-6 center">
                    <span className="fiveThousand" >5000</span><span className="fiveThousandSub" >/mo.</span>
                </div>
                <div className="col-md-6">
                    <h3 ><strong>5000 Credits per Month</strong></h3>
                    <p ><small>Take your data science to the next level, with enough credits for your most ambitious optimization efforts. </small></p>
                </div>

            </div>
            <hr />
            <div className="row pt3">
                <div className="col-md-6">
                    <h3 ><strong>Anonymized Data</strong></h3>
                    <p >Gain peace of mind around security and privacy, by uploading raw anonymized Latitude/Longitude geo-coordinates.</p>
                </div>
                <div className="col-md-6 center">
                    <img src={CSV} width="300" />
                </div>
            </div>
            <hr />
            <div className="row pt3 ">
            <div className="col-md-6 center">
                <img src={Graphs} width="400" />
            </div>
            <div className="col-md-6">
                <h3 ><strong>Persuasive Graphs & Statistics</strong></h3>
                <p >Gain better transparency into your analysis, and provide the visualizations that will illustrate your analysis clearly and effectively when communicating with non-technical stakeholders.</p>
            </div>
        </div>

            </div>

            <hr />

            <h1>Upgrade Today</h1>
        </div>
    )

}

export default SalesContent