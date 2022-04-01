import React, { Component, useEffect, useState } from "react";
import FormsCard from "./cards/formsCard"
import TerritoryMap from "./cards/map";
import FreeSliderCard from './cards/freeSliderCard'
import ProbabilityCard from './cards/probabilityCard'
import { connect } from "react-redux";



const FreeUser = (props) => {

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>{props.territoryName}{" "}</h1>
                    <FormsCard />
                    <hr />
 
                </div>
            </div>
            <div className="row">
                <div className='col-md-12'>
                    {props.locationCount > 3 && (
                        <TerritoryMap />
                    )}
                </div>
                { (props.locationCount > 3) && (<hr />) }
            </div>
            { (props.locationCount > 3) && (<hr />) }
            <div className="row">
                <div className='col-md-6'>
                    {props.locationCount > 3 && (
                        <FreeSliderCard />
                    )}
                </div>
                <div className='col-md-6'>
                    {props.locationCount > 3 && (
                        <ProbabilityCard />
                    )}

                </div>
            </div>
            { (props.locationCount > 3) && (<hr />) }
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        territoryName: state.territory.name,
        locationCount: state.locationCount
     };
};

export default connect(mapStateToProps, null)(FreeUser);
