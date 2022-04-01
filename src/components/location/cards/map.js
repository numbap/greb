import React from "react";
import { Map, Marker, Popup, TileLayer, Circle, Pane, DivOverlay, MapLayer } from "react-leaflet";
import { connect } from "react-redux";
import iconArray from "../img/iconArray"
import MapCircle from "../mapCircle"


const TerritoryMap = (props) => {
  const a = "x";
  let plotData = []

  if(props.clusteredLocations.centerOfMass){

    return (
      <section className="card card-featured-primary card-featured">
        <div className="card-body">
  
          <Map
            center={[props.clusteredLocations.centerOfMass.geometry.coordinates[1], props.clusteredLocations.centerOfMass.geometry.coordinates[0]]}
            zoom={11}
            className='img-rounded'
            style={{ height: "750px" }}
          >
  
            <TileLayer url='https://{s}-tiles.locationiq.com/v2/streets/r/{z}/{x}/{y}.png?key=pk.b977cd3653b8783d5560ffc8fca00ba1' />
  
            <Pane>
              {props.clusteredLocations.features.map((x, index) => {
  
                return (
                  <Marker
                    icon={x.properties.dbscan == "core" ? iconArray.light[x.properties.cluster % 10] : iconArray.outlier}
                    key={index}
                    position={[x.geometry.coordinates[1], x.geometry.coordinates[0]]}
  
  
                  />
                )
              })
              }
            </Pane>
  
            <MapCircle />
  
  
          </Map>
        </div>
      </section>
    );

  }else{
    return <div>Loading</div>
  }

};


const mapStateToProps = (state) => {
  return { 
    clusteredLocations: state.clusteredLocations, 
    // centroids: state.centroids 
  };
};

export default connect(mapStateToProps, null)(TerritoryMap);

// {clusteredLocations.features.map((x, index) => (
//   <Marker
//   icon={x.properties.dbscan == "core" ? iconArray.light[(index == 0) ? 7 : x.properties.cluster % 10] : iconArray.outlier}
//   key={index}
//   position={[x.geometry.coordinates[1], x.geometry.coordinates[0]]}

//   />
// ))}



// https://{s}-tiles.locationiq.com/v2/streets/r/{z}/{x}/{y}.png?key=pk.b977cd3653b8783d5560ffc8fca00ba1