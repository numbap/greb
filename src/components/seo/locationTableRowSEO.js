import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateLocation, deleteLocation } from "../../graphql/mutations";
import { connect } from "react-redux";
import { geoJSONConvert, getCentroids, calculateRadius, checkIfNumber, dePareto, countCentroids, clusterAll } from "../../functions/cluster"
import { getTerritoryDetails, fetchLocations } from "../database/database";
import {recompile} from '../../functions/stateful'


const precision = 5;

const LocationTableRowSEO = (props) => {
  const location = props.loc;

  let [row, setRow] = useState({
    edit: false,
    name: "",
    id: "",
  });

  useEffect(() => {
    setRow({
      edit: false,
      name: location.name,
      id: location.id,
    });
  }, [props]);

  async function deleteL(id) {
    try {
      await API.graphql(graphqlOperation(deleteLocation, { input: { id } }));
      await recompile(props.territory.id)

      // const currentTerritory = await getTerritoryDetails(props.territory.id);

      // await props.updateTerritory(currentTerritory);


      // if (currentTerritory.locations.items.length > 1) {
      //   const [tmpClusteredLocations, tmpCentroids] = await clusterAll(currentTerritory.locations.items, props.cluster, props.percentage)
      //   await props.updateClusteredLocations(tmpClusteredLocations);
      //   await props.updateCentroids(tmpCentroids)
      // }

    } catch (err) {
      console.log("error deleting location", err);
    }
  }

  const saveRow = async (e) => {
    try {
      e.preventDefault();
      const locationDetails = {
        id: row.id,
        name: row.name,
      };
      await API.graphql({
        query: updateLocation,
        variables: { input: locationDetails },
      });
      await setRow({ ...row, edit: false, oldName: row.name });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <tr key={location.id + 1}>
      <th
        scope='row'
      >
        {props.index + 1}
      </th>
      <td>
          <span> {row.name}</span>
      </td>
      <td>
        {location.distance && location.distance.toFixed(3)}
      </td>
      <td>
        {location.geometry.coordinates[1].toFixed(precision)}
      </td>
      <td>
        {location.geometry.coordinates[0].toFixed(precision)}
      </td>
      <td>
        
      </td>
    </tr>
  );
};



const mapStateToProps = (state) => {
  return { 
    territory: state.territory, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationTableRowSEO);
