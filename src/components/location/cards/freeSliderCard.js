import React, { useState } from "react";
import { connect } from "react-redux";
import LocationSlider from "../Slider"
import OutputFree from "../charts/outputFree"
import ClusterTableFree from "../charts/clusterTableFree"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
  } from "react-router-dom";

const FreeSliderCard = (props) => {
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
                            <div className="col-md-12">
                                <LocationSlider formState={formState} setFormState={setFormState} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <OutputFree formState={formState} />
                                <ClusterTableFree />
                                <Link to="/profile">Enable Clustering</Link>

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

export default connect(mapStateToProps, null)(FreeSliderCard);



