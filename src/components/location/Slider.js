import React, { useEffect, useState, useCallback } from "react";
import { API } from "aws-amplify";
import { updateTerritory } from "../../graphql/mutations";
import { connect } from "react-redux";
import "react-rangeslider/lib/index.css";
import { debounce } from "lodash";
import { calculateRadius } from "../../functions/cluster"


const LocationSlider = (props) => {
  let [formState, setFormState] = useState({ percentage: 10 });
  // const { radiusCalc } = props

  useEffect(() => {
    setFormState({
      percentage: props.percentage,
    });

  }, [props.percentage]);

  const debounceLog = useCallback(
    debounce((callback) => callback(), 3000),
    []
  );


  const radiusCalc = async (percent) => {
    try {
      await props.updatePercentage(percent)
      let tmp = props.centroids.map(x => calculateRadius(x.count, x.SD, x.mean, percent))
      tmp = await Promise.all(tmp)
      tmp = props.centroids.map((x, i) => {
        return { ...x, radius: Math.trunc(tmp[i]) }
      })
      await setFormState({ ...formState, percentage: percent })
      await props.updateCentroids(tmp)
    } catch (e) {
      console.log(e)
    }

  }

  const updaeTerritotyFunction = async (detail) => {
    await API.graphql({
      query: updateTerritory,
      variables: { input: detail },
    });
  };

  const updateSlider = async (e) => {
    setFormState({ percentage: Math.trunc(e.target.value) });
  };

  return (
    <div className='form-group'>
      <label htmlFor='formControlRange'>Market Share Radius</label>
      <input
        value={formState.percentage}
        type='range'
        className='form-control-range'
        id='formControlRange'
        min={1}
        max={99}
        step={1}
        onChange={(e) => radiusCalc(Math.trunc(e.target.value))}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { percentage: state.percentage, centroids: state.centroids };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerritory: (territory) =>
      dispatch({ type: "UPDATE_TERRITORY", payload: territory }),
    updatePercentage: (percentage) =>
      dispatch({ type: "UPDATE_PERCENTAGE", payload: percentage }),
    updateLocations: (locations) =>
      dispatch({ type: "UPDATE_LOCATIONS", payload: locations }),
    updateLatLonStats: (latLonStats) =>
      dispatch({ type: "UPDATE_LLS", payload: latLonStats }),
    updateCentroids: (centroids) =>
      dispatch({ type: "UPDATE_CENTROIDS", payload: centroids }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSlider);
