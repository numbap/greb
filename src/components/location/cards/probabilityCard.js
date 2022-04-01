import React, { useState } from "react";
import ProbabilityCurve from "../charts/probabilityCurve"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
  } from "react-router-dom";

const ProbabilityCard = (props) => {
    let [formState, setFormState] = useState({ collapse: false });
    return (
        <section className="card">
            <header className="card-header card-featured-primary card-featured">
                <h2 className="card-title">Probability Curve</h2>
            </header>
            <div className="card-body ">
                <ProbabilityCurve />
                <Link to="/profile">Advanced Reporting</Link>
            </div>
        </section>
    )
}

export default ProbabilityCard