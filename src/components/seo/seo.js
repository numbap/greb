import React, { Component, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { connect } from "react-redux";
import { geoJSONConvert, getCentroids, calculateRadius, checkIfNumber, dePareto, countCentroids, clusterAll } from "../../functions/cluster"
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";

import store from "../../store/index";
import { createBrowserHistory } from "history";

import {recompileSEO} from '../../functions/stateful'

import FormsCardSEO from "./formsCardSEO"
import TerritoryMap from "../location/cards/map";
import ProSliderCard from '../location/cards/proSliderCard'
import FreeSliderCard from '../location/cards/freeSliderCard'
import ClusterCard from '../location/cards/clusterCard'
import MultiCharts from "../location/cards/multiCharts"
import SeoTextCard from "./seoTextCard"
import HeaderSEO from "./headerSEO"
import ProbabilityCard from "components/location/cards/probabilityCard";
import FooterSEO from "./footerSEO"


const SEO = (props) => {
  let { seoString } = useParams();

  useEffect(() => {
      recompileSEO(seoString)
  }, [seoString]);


  return (
    <div>
    <HeaderSEO />
    <div className="inner-wrapper">
    <div className='container'>
    <h1>{props.territory.name}</h1>
    <div className="row">
        <div className='col-md-12'>
            {(props.locationCount > 3) && (
                <SeoTextCard />
            )}
        </div>
    </div>
    { (props.locationCount > 3) && (<hr />) }
    { (props.locationCount > 3) && (
        <div className="row">
        <div className='col-md-12'>
            {props.territory.locations.items.length > 3 && (
                <TerritoryMap />
            )}
        </div>
    </div>
    )}
    { (props.locationCount > 3) && (<hr />) }
    { (props.locationCount > 3) && (
        <div className="row">
            <div className='col-md-6'>
                {(props.locationCount > 3) && (props.territory.cluster == 0)  ? (
                    <FreeSliderCard seoCluster={props.territory.cluster}/>
                ) : 
                ( 
                    <ProSliderCard seoCluster={props.territory.cluster}/>                                
                )}
            </div>
            <div className='col-md-6'>

                {(props.locationCount > 3) && (props.territory.cluster == 0)  ? (
                    <ProbabilityCard />
                ) : 
                ( 
                    <ClusterCard />                                
                )}
            </div>
        </div> 
    )}
    { (props.locationCount > 3) && (<hr />) }
    <div className="row">
        <div className='col-md-12'>
            {(props.locationCount > 3) && (props.territory.cluster > 0) && (
                <MultiCharts />
            )}
        </div>
    </div>
    <hr />
    <div className='row'>
 
        <div className='col-md-12'>
        {(props.locationCount > 3) &&
            (<FormsCardSEO />)}
            
        </div>
    </div>

      { (props.locationCount > 3) && (<hr />) }
    </div>
    </div>
    <FooterSEO />
    </div>
  )
}
  
const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateTerritory: (territory) =>
          dispatch({ type: "UPDATE_TERRITORY", payload: territory }),
      updateLocations: (locations) =>
          dispatch({ type: "UPDATE_LOCATIONS", payload: locations }),
      updateLatLonStats: (latLonStats) =>
          dispatch({ type: "UPDATE_LLS", payload: latLonStats }),
      updateCentroids: (centroids) =>
          dispatch({ type: "UPDATE_CENTROIDS", payload: centroids }),
      updateClusteredLocations: (clusteredLocations) =>
          dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: clusteredLocations }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SEO);