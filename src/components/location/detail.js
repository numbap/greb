import React, { Component, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { updateTerritory } from "../../graphql/mutations";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import LocationTable from "./locationTable";
import "react-rangeslider/lib/index.css";
import { getTerritoryDetails, fetchLocations } from "../database/database";
import LocationForm from "./locationForm";
import TerritoryMap from "./cards/map";
import Output from "./charts/outputPaid";
import LocationSlider from "./Slider";
import { geoJSONConvert, getCentroids, calculateRadius, checkIfNumber, dePareto, countCentroids, clusterAll } from "../../functions/cluster"
import ClusterStrength from "./clusterStrength"
import ClusterTable from "./charts/clusterTable"
import ProbabilityCurve from "./charts/probabilityCurve"
import MultiCharts from "./cards/multiCharts"


const TerritoryDetail = (props) => {

  let { id } = useParams();
  let [formState, setFormState] = useState({ percentage: 95, collapse: false, cluster: 1000, radius: 1 });
  let [centroids, setCentroids] = useState([]);
  let [clusteredLocations, setClusteredLocations] = useState({ features: [] })
  let [currentTerritory, setCurrentTerritory] = useState({})

  useEffect(() => {
    const loadAll = async (x) => {
      try {
        const currentTerritory = await getTerritoryDetails(id);
        await props.updateTerritory(currentTerritory);
        await setFormState({ ...formState, percentage: formState.percentage });
        await setCurrentTerritory(currentTerritory)

        if (currentTerritory.locations.items.length > 10) {
          setFormState({ ...formState, collapse: true })
        }

        if (currentTerritory.locations.items.length > 0) {
          const [tmpClusteredLocations, tmpCentroids] = await clusterAll(currentTerritory.locations.items, formState.cluster, formState.percentage)
          await setClusteredLocations(tmpClusteredLocations);
          await setCentroids(tmpCentroids)
        }
      } catch (e) {
        console.log(e)
      }
    };
    loadAll();

  }, [id]);

  const recluster = async (cluster, locations) => {
    try {
      if (locations.items.length > 0 && checkIfNumber(cluster)) {
        const [tmpClusteredLocations, tmpCentroids] = await clusterAll(locations.items, cluster, formState.percentage)
        await setClusteredLocations(tmpClusteredLocations);
        await setCentroids(tmpCentroids)
      }
    } catch (e) {
      console.log(e)
    }

  }

  const radiusCalc = async (percent) => {
    try {
      let tmp = centroids.map(x => calculateRadius(x.count, x.SD, x.mean, percent))
      tmp = await Promise.all(tmp)
      tmp = centroids.map((x, i) => {
        return { ...x, radius: Math.trunc(tmp[i]) }
      })
      await setFormState({ ...formState, percentage: percent })
      await setCentroids(tmp)
    } catch (e) {
      console.log(e)
    }

  }


  return props.territory ? (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h1>
            {props.territory.name}{" "}
            {formState.collapse ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-caret-up-fill'
                viewBox='0 0 16 16'
                onClick={() => {
                  setFormState({ ...formState, collapse: false });
                }}
              >
                <path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-caret-down-fill'
                viewBox='0 0 16 16'
                onClick={() => {
                  setFormState({ ...formState, collapse: true });
                }}
              >
                <path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
              </svg>
            )}
          </h1>


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
              <LocationForm />
              <LocationTable id={id} />

            </div>
          </section>
          <hr />
        </div>
      </div>


      <div className="row">
        <div className='col-md-12'>
          {props.territory.locations.items.length > 3 && (
            <TerritoryMap
              locations={props.territory.locations.items}
              latLonStats={props.latLonStats}
              centroids={centroids}
              clusteredLocations={clusteredLocations}
              formState={formState}
              setCentroids={setCentroids}
            />
          )}
        </div>
      </div>

      <hr />

      <div className="row">
        <div className='col-md-6'>
          <section className="card">
            <header class="card-header card-featured-primary card-featured">
              <h2 class="card-title">Segmentation</h2>
            </header>
            <div className="card-body ">
              {props.territory.locations.items.length > 3 && (
                <div>

                  <div className="row">

                    <div class="col-md-9">
                      <LocationSlider formState={formState} setFormState={setFormState} setCentroids={setCentroids} radiusCalc={radiusCalc} />
                    </div>
                    <div className="col-md-3">
                      <ClusterStrength formState={formState} locations={props.territory.locations} recluster={recluster} setFormState={setFormState} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Output formState={formState} clusters={centroids} records={clusteredLocations.features.length} />
                      <ProbabilityCurve centroids={centroids} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
        <div className='col-md-6'>

          <header class="card-header card-featured-primary card-featured">

            <h2 class="card-title">Clusters</h2>
          </header>
          <div className="card-body">
            <ClusterTable centroids={centroids} />
          </div>
        </div>
      </div>
      <MultiCharts centroids={centroids} percentage={formState.percentage} />
      <hr />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerritory: (territory) =>
      dispatch({ type: "UPDATE_TERRITORY", payload: territory }),
    updateLocations: (locations) =>
      dispatch({ type: "UPDATE_LOCATIONS", payload: locations }),
    updateLatLonStats: (latLonStats) =>
      dispatch({ type: "UPDATE_LLS", payload: latLonStats }),
    updateCentroids: (centroids) =>
      dispatch({ type: "UPDATE_CENTROIDS", payload: centroids }),
    updateClusteredLocations: (clusteredLocations) =>
      dispatch({ type: "UPDATE_CLUSTEREDLOCATIONS", payload: clusteredLocations }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TerritoryDetail);




