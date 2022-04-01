import React, { useState } from "react";
import LocationTableSEO from "./locationTableSEO";
import { connect } from "react-redux";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
  } from "react-router-dom";

const FormsCard = (props) => {
    let [formState, setFormState] = useState({ collapse: (props.locationCount > 9) });
    
    return (
        <section className={`card ${formState.collapse && "card-collapsed"}`} >
            <header className="card-header card-featured-primary card-featured">
                <div className="card-actions">
                    <a href="#" className="card-action card-action-toggle" onClick={(e) => {
                        e.preventDefault()
                        setFormState({ ...formState, collapse: !formState.collapse })
                    }} />

                </div>
                <h2 className="card-title">Locations</h2>
            </header>
            <div className="card-body">
                <LocationTableSEO />
                { !props.stripeClient && (<Link to="/profile">Upload Anonymized Data</Link>) }
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return { 
        stripeClient: state.stripeClient,
        accountLevel: state.accountLevel
     };
};

export default connect(mapStateToProps, null)(FormsCard);
