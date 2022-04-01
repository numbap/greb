import React from "react";
import ClusterTable from "../charts/clusterTable"

const ClusterCard = (props) => {

    return (
        <section className="card">
            <header className="card-header card-featured-primary card-featured">
                <h2 className="card-title">Clusters</h2>
            </header>
            <div className="card-body ">
                <ClusterTable />
            </div>
        </section>
    )
}

export default ClusterCard