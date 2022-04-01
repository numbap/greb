import React, { useEffect, useState } from "react";

import Chart from "react-google-charts";

import { scatterData } from '../../../functions/math'

const Scatter = (props) => {
  let plotData = []
  const a = "x";
  const [plot, setPlot] = useState([]);

  useEffect(() => {
    const loadAll = async () => { };
    loadAll();
    scatterData(props.latLonStats).then(x => { setPlot(x) })
  }, [a, props.latLonStats.distSd]);

  return (

    <Chart
      width={'100%'}
      height={'400px'}
      chartType="ScatterChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Percentage", "Radius"],
      ].concat(plot)}
      options={{
        title: 'Radius by Percentage of Market Share',
        hAxis: { title: 'Percentage', minValue: 0, maxValue: 99 },
        vAxis: { title: 'Radius', minValue: 0, maxValue: plot[plot.length - 1] * 1.02 },
        legend: 'none',
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  )

}

export default Scatter