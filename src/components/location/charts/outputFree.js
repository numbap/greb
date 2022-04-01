import React from "react";
import { connect } from "react-redux";
import { areaCalc, predictionStrenght } from "../../../functions/cluster"

const precision = 5;

const OutputFree = (props) => {
  const { centroids, records, locationCount } = props;

  if (centroids.length) {
    return (
      <div className="row">
        <div className="col-md-4"><h1 className="text-center pt-0"><i>{props.percentage}%</i></h1><h6 className="text-center">Market Share</h6></div>
        <div className="col-md-8">
          {centroids.length && (

            <span><br />
              <span className="title">Locations: <b style={{ color: predictionStrenght(locationCount).color }} >{locationCount}</b></span><br />
              <span className="title">Coverage: <b>{ ( locationCount * (props.percentage / 100) ).toPrecision(4) }</b></span><br />
              <span className="title">Area KM<sup>2</sup>: <b >{ areaCalc(centroids[0].radius).toPrecision(5) }</b></span><br />
            </span>

          )}
        </div>

      </div>
    );
  } else {
    return <div className="row">Loading...</div>
  }



};

const mapStateToProps = (state) => {
  return { 
    percentage: state.percentage, 
    centroids: state.centroids,
    locationCount: state.locationCount
   };
};

export default connect(mapStateToProps, null)(OutputFree);