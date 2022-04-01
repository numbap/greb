import React, { useEffect, useState } from "react";
import "./chart.css"
import { calculateRadius } from "../../../functions/cluster"
import { connect } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import iconArray from "../img/iconArray"



const ProbabilityCurve = (props) => {


  let mean = 15
  let SD = 3.3
  let count = 55
  let tmpRadius = null
  let tikki = 1

  let [data, setData] = useState([]);
  // {name: 'Page A', uv: 400, pv: 2450, amt: 2400}

  useEffect(() => {
    const loadAll = async () => {
      let distance = []
      let tmp = [];

      for (let i = 5; i < 99; i++) {
        distance = await props.centroids.map(x => calculateRadius(x.count, x.SD, x.mean, i))
        distance = await Promise.all(distance)
        distance = await [0, ...distance.map(x => (x / 1000).toPrecision(3))]
        distance = await Object.assign({}, distance)
        delete distance["0"]

        tmp.push({ ...distance, p: i })
      }
      setData(tmp)
    };

    loadAll();

  }, [props.centroids]);


  let graphHigh = Math.max( ...data.filter(x => x.p == 98).map(x => parseFloat(x[1]).toFixed(2) ) )



  return (
    <div>
      <h4>Distance by Market Share (KM)</h4>
      <LineChart width={620} height={350} data={data} margin={{ top: 5, right: 210, bottom: 5, left: 0 }}>
        {props.centroids.map((x, i) => (
          <Line type="monotone" key={i} dataKey={i + 1} strokeWidth={2} stroke={iconArray.lineColor[i % 10]} dot={false} />
        ))}

        <XAxis dataKey="p" domain={[0, 100]} />
        <YAxis domain={[0, graphHigh]} />
        <Tooltip />
      </LineChart>
    </div>
  )

}

const mapStateToProps = (state) => {
  return { centroids: state.centroids };
};

export default connect(mapStateToProps, null)(ProbabilityCurve);

//         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />