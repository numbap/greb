import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchTerritorys, addTerritory, deleteT } from "../database/database";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import TerritoryRow from "./territoryRow";

const TerritoryTable = (props) => {
  useEffect(() => {
    const asyncLoader = async () => {
      const tmpTerritorys = await fetchTerritorys();

      props.updateTerritories(tmpTerritorys);
    };
    asyncLoader();
  }, []);

  return (
    <table className='table table-responsive-md table-hover mb-0'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Name</th>
          <th scope='col'></th>
          <th scope='col'></th>
          <th scope='col'></th>
          <th scope='col'></th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {props.territories &&
          props.territories.filter(x => x.archived ? false : true).map(
            (territory, index) =>
              territory.archived || (
                <TerritoryRow
                  territory={territory}
                  key={territory.id}
                  index={index}
                />
              )
          )}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => dispatch({ type: "INIT_STATE" }),
    updateTerritories: (territories) =>
      dispatch({ type: "UPDATE_TERRITORIES", payload: territories }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TerritoryTable);
