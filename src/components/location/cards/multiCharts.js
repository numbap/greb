import React from 'react';
import MarketShareChart from "../charts/marketShareChart"
import RadiusChart from "../charts/radiusChart"
import DensityChart from "../charts/densityChart"


const MultiCharts = (props) => {

    return (
        <div className="container">
            <div className="row">
                <header className="card-header col-md-12 card-featured-primary card-featured">
                    <h2 className="card-title">Statistics</h2>
                </header>
                <div className="card-body col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Data Points Per KM<sup>2</sup></h5>
                            <DensityChart />
                        </div>
                        <div className="col-md-4">
                            <h5>Cluster Distribution</h5>
                            <MarketShareChart />
                        </div>
                        <div className="col-md-4">
                            <h5>Radius Size (KM)</h5>
                            <RadiusChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiCharts