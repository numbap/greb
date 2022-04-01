import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "react-rangeslider/lib/index.css";
import { getTerritoryDetails } from "../database/database";
import {clusterAll } from "../../functions/cluster"
import FreeUser from "./freeUser";
import ProUser from "./proUser"
import {recompile} from '../../functions/stateful'



const FreePaid = (props) => {

    let { id } = useParams();
    let [formState, setFormState] = useState({ percentage: 95, collapse: false, cluster: 1.8, radius: 1 });
    let [currentTerritory, setCurrentTerritory] = useState({})
 

    useEffect(() => {
        console.log("recompiling")
        recompile(id)
    }, [id]);

    if (props.territory.id) {
        if (props.stripeClient) {
            return <ProUser recluster radiusCalc />
        } else {
            return <FreeUser recluster radiusCalc />
        }
    } else {

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(FreePaid);