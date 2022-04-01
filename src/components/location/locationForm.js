import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createLocation } from "../../graphql/mutations.js";
import { connect } from "react-redux";
import { getTerritoryDetails } from "../database/database";
import { calculateRadius, checkIfNumber, clusterAll } from "../../functions/cluster"
import {recompile} from '../../functions/stateful'
import { v4 as uuidv4 } from 'uuid';

const initialState = { name: "", addresses: "", error: "", obfuscate: false, disabled: false };

const LocationForm = (props) => {
  var id = props.territory ? props.territory.id : "";

  const [formState, setFormState] = useState(initialState);

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const commaTabLatLon = (str) =>
  {
    var patt = /^((\-?|\+?)?\d+(\.\d+)?)(,|\t|[\s]+)\s*((\-?|\+?)?\d+(\.\d+)?)$/
    if(patt.test(str)){
      return str.replace("\t", ",").split(",")
    } else {
      return false;
    }
  }



  function removeSpecials(str) {
    var lower = str.toLowerCase();
    var upper = str.toUpperCase();

    if(commaTabLatLon(str.toString())){
      return str.toString();
    } else {
      var res = "";
      for(var i=0; i<lower.length; ++i) {
          if(lower[i] != upper[i] || lower[i].trim() === '' || str[i].trim() === ' ' || str[i].trim() === '.' || str[i].trim() === '-' || str[i].trim() === ',' || isNumeric(str[i]))
              res += str[i];
      }
      return res;
    }
  }


  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const obfuscate = (str) => {
    const strBeg = str.substring(0, 4);
    const strEnd = str.substring(str.length-4, str.length)
    return `${strBeg} ... ${strEnd}`

  }



  const wait = (delay, ...args) =>
    new Promise((resolve) => setTimeout(resolve, delay, ...args));

  async function addBulkLocations(props) {
    try {
      // Exit if form is empty
      if (!formState.addresses) return;

      await setFormState({ ...formState, disabled: true });

      let looper = formState.addresses;
      let tmpError = ""
      let tmp
      let tmpClean

      while (looper) {
        // Pull the first element
        tmp = looper.split("\n")[0];
        tmpClean = removeSpecials(tmp.trim());
        if (tmpClean.trim() && tmpClean.length > 3) {

          // Set geostring of body to first element of string
          const myInit = {
            body: { geoString: tmpClean, obfuscate: formState.obfuscate },
          };

          // If a free user tries to upload a lat/lon, throw an error and skip. 
          if(commaTabLatLon(tmpClean) && !props.stripeClient){
              // Trigger an error
              //await setFormState({...formState, name: "ggggg", error: "Please upgrade to enable Geocoordinates" })
              await setTimeout(function(){ console.log(formState, "An error has been triggered"); }, 1050);
              tmpError = "Please upgrade to enable Geocoordinates"

          } else {

            // Call the lookup API, and decrement credit
            const geoResponse = await API.post("lookup", "/", myInit).catch(e => {});
            console.log(geoResponse, "geoResponse")
            // If a valid response comes back
            if (geoResponse && geoResponse.sub) {
              const { lat, lon } = geoResponse.LatLonResults;

              const tmpLoc = {
                id: uuidv4(),
                territoryId: props.territory.id,
                name: formState.obfuscate ? obfuscate(tmpClean) : tmpClean,
                lat: lat,
                lon: lon,
              };

              await API.graphql( graphqlOperation(createLocation, { input: tmpLoc }) );

              await props.setCredits({ credits: geoResponse.LatLonResults.credits, });
              
              if (geoResponse.lat == 999999 && geoResponse.lon == 999999) {
                looper = "";
              }
            }
          }

        }

        // Update form contents
        looper = looper.substring(tmp.length + 1);
        await setFormState({
          ...formState,
          addresses: looper,
          error: tmpError,
          disabled: true,
        });

        if(!looper){
          let tmpState = formState
          await recompile(props.territory.id)
          await setFormState({ ...tmpState, addresses: "", disabled: false, error: tmpError, });
        }
      }
    } catch (err) {
      console.log("error creating location", err);
    }
  }

  return props.credits > 0 ? (
    <div>
      <div className='form-group'>
            {formState.error &&  
            ( 
            <div className='alert alert-warning' role='alert'>
            <a href="#" className="close" aria-label="close" onClick={ (e)=> {
                e.preventDefault();
                setFormState({...formState, error:""})
            }} >&times;</a>
            {formState.error}
            </div> 
            )}

        <textarea
          value={formState.addresses}
          className='form-control'
          id='exampleFormControlTextarea1'
          placeholder='Paste Addresse List'
          rows='3'
          onChange={(e) => {
            const tmp = e.target.value.replace(/\t/g, " ");
            setInput("addresses", tmp);
          }}
          disabled={formState.disabled}
        ></textarea>
      </div>
      <div className="row">
        <div className="col col-md-9">
          <button
          type='button'
          className='btn btn-primary btn-lg'
          onClick={async () => {
            if (formState.addresses) {
              await addBulkLocations(props);
            }
          }}
          disabled={formState.disabled}
        >
          {formState.disabled ? "Loading..." : "Add"}
        </button>
      </div>
        <div className="col col-md-3">
  
        </div>
      </div>

      




      <hr />
    </div>
  ) : (
    props.credits > -1 && (
      <div className='alert alert-warning' role='alert'>
        You have no remaining credits. Please upgrade to add locations
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return { 
    credits: state.credits, 
    territory: state.territory, 
    locationCount: state.locationCount,
    stripeClient: state.stripeClient};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCredits: (payload) =>
      dispatch({ type: "UPDATE_CREDITS", payload: payload }),
    updateLatLonStats: (LatLonStats) =>
      dispatch({ type: "UPDATE_LLS", payload: LatLonStats }),
    setTerritory: (LatLonStats) =>
      dispatch({ type: "SET_TERRITORY", payload: LatLonStats }),
    updateLocations: (locations) =>
      dispatch({ type: "UPDATE_LOCATIONS", payload: locations }),
    updateClusteredLocations: (clusteredLocations) =>
      dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: clusteredLocations }),
    updateCentroids: (centroids) =>
      dispatch({ type: "UPDATE_CENTROIDS", payload: centroids }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);


