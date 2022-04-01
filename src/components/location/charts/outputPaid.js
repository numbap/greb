import { clusters } from "@turf/turf";
import React from "react";
import { connect } from "react-redux";
import { areaCalc } from "../../../functions/cluster"

const precision = 5;

const OutputPaid = (props) => {
  const { centroids, locationCount } = props;

  if (centroids.length) {
    return (
      <div className="row">
        <div className="col-md-4"><h1 className="text-center pt-3"><i>{props.percentage}%</i></h1><h6 className="text-center">Market Share</h6></div>
        <div className="col-md-4">
          {centroids.length && (

            <span><br />
              <span className="title">Clusters: <b>{centroids.length}</b></span><br />
              <span className="title">Locations: <b>{locationCount}</b></span><br />
              <span className="title">Outliers: <b>{centroids[0].outliers}</b></span><br />
              </span>
          )}
        </div>
        <div className="col-md-4">
        {centroids.length && (

          <span><br />
            <span className="title">Coverage: <b>{ ( locationCount * (props.percentage / 100) ).toPrecision(4) }</b></span><br />
            <span className="p0 m0">Saturation: <b>{(( centroids.map(x => x.count).reduce((a, b) => a + b) / ( centroids.map(x => x.count).reduce((a, b) => a + b) + centroids[0].outliers ) ) * 100).toPrecision(3)} %</b></span>
            </span>
        )}
      </div>
      </div>
    );
  } else {
    return <div className="row"><div className="col-md-12">No Data</div></div>
  }



};

const mapStateToProps = (state) => {
  return { 
    percentage: state.percentage, 
    centroids: state.centroids,
    locationCount: state.locationCount
   };
};

export default connect(mapStateToProps, null)(OutputPaid);