import React, { useEffect, useState }  from "react";
import ClusterTable from "../location/charts/clusterTable"
import { connect } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { updateTerritory, deleteLocation } from "../../graphql/mutations";

const SeoTextCard = (props) => {
    return (
        <section className="card">
                <div className="card-body ">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <p>{props.territory.text}</p>
                        </div>
                        <div className="col-md-4">
                            <div>
                            <h3>What is VouchIt?</h3>
                            <p>VouchIt is a tool for identifying density and cluster trends in geographic data. Digital marketers use VouchIt to save advertising costs by making accurate statistical predictions about the best places to target their messages. In this example, we’ve used the tool to locate trends in public data. </p>
                            <p>Play with the tool below to learn from the data. </p>
                            </div>
                            <div>{ props.territory.image && (<img src={props.territory.image} />) }</div>
                            <div>{`Last Updated: ${props.territory.updatedAt.split("T")[0]}`}</div>
                            <div>{`Source: ${props.territory.source}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return { 
        territory: state.territory,
     };
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

export default connect(mapStateToProps, mapDispatchToProps)(SeoTextCard);