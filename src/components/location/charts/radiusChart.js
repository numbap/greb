import React from 'react';
import { ColumnChart } from "react-chartkick"
import "chartkick/chart.js"
import iconArray from "../img/iconArray"
import { connect } from "react-redux";

const RadiusChart = (props) => {

  let data = props.centroids.map((x, i) => [i + 1, Number( (x.radius / 1000).toPrecision(3) ) ])

  return (
    <ColumnChart data={data} colors={iconArray.lineColor} />
  );

}

const mapStateToProps = (state) => {
  return { 
    centroids: state.centroids,
   };
};

export default connect(mapStateToProps, null)(RadiusChart);

// <ColumnChart data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} />