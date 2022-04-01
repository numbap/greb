import React, { PureComponent } from 'react';
import { AbstractSeries, RadialChart } from 'react-vis';
import { PieChart } from "react-chartkick"
import "chartkick/chart.js"
import iconArray from "../img/iconArray"
import { connect } from "react-redux";

const MarketShareChart = (props) => {

  const slices = props.centroids.map((x, i) => [i + 1, x.count])
  return (
    <PieChart data={[...slices]} colors={iconArray.lineColor} />
  );

}

const mapStateToProps = (state) => {
  return { centroids: state.centroids };
};

export default connect(mapStateToProps, null)(MarketShareChart);

// <PieChart data={[["Blueberry", 44], ["Strawberry", 23]]} />