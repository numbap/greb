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

import HeaderSEO from "../seo/headerSEO"
import FooterSEO from "../seo/footerSEO"


const Viz = (props) => {
    const [territories, setTerritories] = useState([])

  useEffect(() => {
      const getPages = async () => {
        const territoryList = await API.post("listSEO", "/");
        setTerritories(territoryList.Items)
      }
      getPages()
  }, []);

  return (
    <div>
    <HeaderSEO />
    <div className="inner-wrapper">
    <div className='container'>
    <h1>{props.territory.name}</h1>
    <div className="row">
        <div className='col-md-12'>


            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Page</th>
                </tr>
                </thead>
                <tbody>
                {territories.map((x, i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td><a href={`https://app.vouch.it/s/${x.urlString}`} >{x.urlString}</a></td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Viz);