import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import "react-rangeslider/lib/index.css";
import { debounce } from "lodash"
import { calculateRadius, checkIfNumber, clusterAll } from "../../functions/cluster"


const ClusterStrength = (props) => {


  useEffect(() => {
    const seoCluster = async () => {
      if(props.territory.cluster){
        let e = {target: {value: props.territory.cluster}}
        await props.setCluster(props.territory.cluster)
        recluster(props.territory.cluster)
      }  
    }
    seoCluster()
  }, [props.territory.cluster]);

  const onClusterChange = async (e) => {
    e.persist();
    try {
      // await setFormState({ ...formState, cluster: e.target.value });
      props.setCluster(e.target.value)
      delayedAction(e.target.value);
    } catch (e) {
      console.log(e)
    }

  }


  const radiusCalc = async () => {
    try {
      let tmp = props.centroids.map(x => calculateRadius(x.count, x.SD, x.mean, props.percent))
      tmp = await Promise.all(tmp)
      tmp = props.centroids.map((x, i) => {
        return { ...x, radius: Math.trunc(tmp[i]) }
      })
      await props.updateCentroids(tmp)
    } catch (e) {
      console.log(e)
    }
  }


  const recluster = async (cluster) => {
    try {
      if (props.locationCount > 0 && checkIfNumber(cluster)) {
        const [tmpClusteredLocations, tmpCentroids] = await clusterAll(props.territory.locations.items, cluster, props.percentage)
        await props.updateClusteredLocations(tmpClusteredLocations);
        await radiusCalc(tmpCentroids)
        await props.updateCentroids(tmpCentroids)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const delayedAction = useCallback(
    debounce((cluster) => {
      recluster(cluster)
    }, 1000),
    []
  );

  return (
    <div className='form-group'>
      <label htmlFor='formControlRange'>Cluster Strength</label>
      <input
        value={props.cluster}
        type='number'
        step={0.01}
        className='form-control'
        id='formControlRange'
        min={0.01}
        max={2000}
        onChange={onClusterChange}
      />
    </div>
  );
};


const mapStateToProps = (state) => {
  return { 
    cluster: state.cluster, 
    territory: state.territory, 
    centroids: state.centroids, 
    percentage: state.percentage,
    locationCount: state.locationCount };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerritory: (territory) =>
      dispatch({ type: "UPDATE_TERRITORY", payload: territory }),
    setCluster: (cluster) =>
      dispatch({ type: "SET_CLUSTER", payload: cluster }),
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

export default connect(mapStateToProps, mapDispatchToProps)(ClusterStrength);