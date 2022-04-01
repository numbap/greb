import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { predictionStrenght } from "../../../functions/cluster"
import iconArray from "../img/iconArray"
import { connect } from "react-redux";
import { areaCalc } from "../../../functions/cluster"

const ClusterTable = (props) => {

  const { centroids } = props

  return (
    <section className="card">
      <div className="card-body">
        <table className="table table-responsive-md table-hover mb-0">
          <thead>
            <tr>
              <th scope="col pl-1 pr-1">#</th>
              <th scope="col pl-1 pr-1">Lat</th>
              <th scope="col pl-1 pr-1">Lon</th>
              <th scope="col pl-1 pr-1">Radius (KM)</th>
            </tr>
          </thead>
          <tbody>
            {centroids.map((x, i) => (
              <tr key={i}>
                <th scope="row"><img src={iconArray.lightImg[i % 10]} height="20" /></th>
                <td className="pl-1 pr-1">{x.centroid.lat.toPrecision(8)}</td>
                <td className="pl-1 pr-1">{x.centroid.lon.toPrecision(8)}</td>
                <td className="pl-1 pr-1">{(x.radius / 1000).toPrecision(4)}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return { centroids: state.centroids, percentage: state.percentage };
};

export default connect(mapStateToProps, null)(ClusterTable);
