import React, { useEffect, useState } from 'react';
import { AbstractSeries, RadialChart } from 'react-vis';
import { ColumnChart } from "react-chartkick"
import "chartkick/chart.js"
import iconArray from "../img/iconArray"
import { calculateRadius } from "../../../functions/cluster"
import { connect } from "react-redux";

const DensityChart = (props) => {

  // let [data, setData] = useState([]);

  // useEffect(() => {
  //   const loadAll = async () => {
  //     let distances = await props.centroids.map(x => calculateRadius(x.count, x.SD, x.mean, props.percentage))
  //     distances = await Promise.all(distances)
  //     // Convert radius units per square kilometer
  //     distances = distances.map((x, i) => [i + 1, ((props.centroids[i].count * (props.percentage / 100)) / (Math.PI * (x ^ 2) / 1000).toPrecision(4))])
  //     // distances = distances.map((x, i) => [i, x / 1000).toPrecision(3)])
  //     setData(distances)
  //   };

  //   loadAll();

  // }, [props.centroids.length, props.percentage]);


  // (Math.PI * (x.radius ^ 2) / 1000)

  let data = props.centroids.map((x, i) => [i + 1, ((x.count * (props.percentage / 100)) / (Math.PI * (x.radius ^ 2) / 1000) ).toPrecision(3)])
  return (
    <ColumnChart data={data} colors={iconArray.lineColor} />
  );

}

const mapStateToProps = (state) => {
  return { centroids: state.centroids, percentage: state.percentage };
};

export default connect(mapStateToProps, null)(DensityChart);
