import React, { Component, useEffect, useState } from "react";
import FormsCard from "./cards/formsCard"
import TerritoryMap from "./cards/map";
import ProSliderCard from './cards/proSliderCard'
import SeoCard from './cards/seoCard';
import ClusterCard from './cards/clusterCard'
import { connect } from "react-redux";
import MultiCharts from "./cards/multiCharts"


const ProUser = (props) => {
    const { recluster, radiusCalc } = props;
    console.log(props.territory, "territory")
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>{props.territory.name}</h1>
                    <FormsCard />
                    <hr />

                </div>
            </div>
            <div className="row">
                <div className='col-md-12'>
                    {props.territory.locations.items.length > 3 && (
                        <TerritoryMap />
                    )}
                </div>
            </div>
            { (props.locationCount > 3) && (<hr />) }
            <div className="row">
                <div className='col-md-6'>
                    {props.locationCount > 3 && (
                        <ProSliderCard recluster={recluster} radiusCalc={radiusCalc} />
                    )}
                </div>
                <div className='col-md-6'>
                    {props.locationCount > 3 && (
                        <ClusterCard />
                    )}
                </div>
            </div>
            { (props.locationCount > 3) && (<hr />) }
            <div className="row">
                <div className='col-md-12'>
                    {props.locationCount > 3 && (
                        <MultiCharts />
                    )}
                </div>
            </div>
            { (props.locationCount > 3) && (<hr />) }
            { (props.SEO == "true") && (
                <div>
                    <SeoCard />
                </div>) }
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        territory: state.territory,
        locationCount: state.locationCount
     };
};

export default connect(mapStateToProps, null)(ProUser);
