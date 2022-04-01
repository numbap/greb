import React, { useEffect, useState } from "react";

import { fetchTerritorys, addTerritory, deleteT } from "../database/database";
import { connect } from "react-redux";

import "react-rangeslider/lib/index.css";

import TerritoryForm from "./territoryForm";
import TerritoryTable from "./territoryTable";

import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";

const TerritoryListing = (props) => {
  const [territorys, setTerritorys] = useState([]);
  const [pageProperties, setPageProperties] = useState({trainingCollapse: true})

  const starter = async () => {
    await props.resetState()
  } 

  useEffect(() => {
    starter()
  }, [])


  return props.userName ? (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Territories</h1>
            <section className="card card-featured-primary card-featured">
              <div className="card-body">
              <TerritoryForm
              territorys={territorys}
              setTerritorys={setTerritorys}
            />
                <TerritoryTable
                territorys={territorys}
                setTerritorys={setTerritorys}
              />

              </div>
            </section>



            <section className={`card ${pageProperties.trainingCollapse && "card-collapsed"}`} >

              <header className="card-header card-featured-primary card-featured">
                <div className="card-actions">
                  <a href="#" className="card-action card-action-toggle" onClick={
                    (e) => {
                      e.preventDefault();
                      setPageProperties({ ...pageProperties, trainingCollapse: !pageProperties.trainingCollapse })
                    }
                  }></a>
                </div>
                <h2 className="card-title">Training</h2>
              </header>


            <div className="card-body">
              <div className="text-center">
                <video className="img-fluid border border-secondary rounded" src="https://vouch.it/wp-content/uploads/2021/08/introduction.mp4" width="850" controls></video>
              </div>
            </div>
          </section>

          </div>
        </div>
      </div>
    ) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => dispatch({ type: "INIT_STATE" }),
    // updateTerritories: () => dispatch({ type: "UPDATE_TERRITORIES" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TerritoryListing);
