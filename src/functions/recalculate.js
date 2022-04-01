import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { geoJSONConvert, getCentroids, calculateRadius, checkIfNumber, dePareto, countCentroids, clusterAll } from "../../functions/cluster"
import { getTerritoryDetails, fetchLocations } from "../database/database";

const Recalculate = (props) => {
    const recalculate = async () => {
        try {
            const [tmpClusteredLocations, tmpCentroids] = await clusterAll(props.territory.locations.items, props.cluster, props.percentage)
            await props.setClusteredLocations(tmpClusteredLocations);
            await props.setCentroids(tmpCentroids)
        } catch (e) {
            console.log(e)
        }
    }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Recalculate);