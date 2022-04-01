import React, { useEffect, useState } from 'react';
import "chartkick/chart.js"
import iconArray from "./img/iconArray"
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer, Circle, Pane, DivOverlay, MapLayer } from "react-leaflet";

const MapCircle = (props) => {
  return (
    <Pane>
        {props.centroids.map((centroid, index) => {
        if (centroid.radius) {
            return (
            <div key={index}><Marker
                icon={iconArray.dark[centroid.id % 10]}
                position={[centroid.centroid.lat, centroid.centroid.lon]}
            />
                <Circle
                center={[centroid.centroid.lat, centroid.centroid.lon]}
                radius={Math.trunc(centroid.radius)}
                /></div>)
        }
        })}
  </Pane>
  );

}

const mapStateToProps = (state) => {
  return { 
    centroids: state.centroids,
   };
};

export default connect(mapStateToProps, null)(MapCircle);