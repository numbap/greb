import React, { Component, useEffect, useState } from "react";
import LocationForm from "../locationForm";
import LocationTable from "../locationTable";
import { connect } from "react-redux";
import LocationSlider from "../Slider"
import OutputPaid from "../charts/outputPaid"
import ProbabilityCurve from "../charts/probabilityCurve"
import ClusterTable from "../charts/clusterTable"
import ClusterStrength from "../clusterStrength"

const ProSliderCard = (props) => {
    const { recluster, radiusCalc } = props;
    let [formState, setFormState] = useState({ collapse: false });
    return (
        <section className="card">
            <header className="card-header card-featured-primary card-featured">
                <h2 className="card-title">Segmentation</h2>
            </header>
            <div className="card-body ">
                {props.locationCount > 3 && (
                    <div>

                        <div className="row">
                            <div className="col-md-8">
                                <LocationSlider radiusCalc />
                            </div>
                            <div className="col-md-4">
                                <ClusterStrength recluster={recluster} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <OutputPaid formState={formState} />
                                <ProbabilityCurve />

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return { locationCount: state.locationCount };
};

export default connect(mapStateToProps, null)(ProSliderCard);



