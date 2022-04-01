import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { updateTerritory, deleteTerritory } from "../../graphql/mutations";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./territoryRow.css"

import { connect } from "react-redux";
const precision = 5;

const TerritoryRow = (props) => {
  let { id, name, index, lat, lon, zoom, distance } = props.territory;
  let [row, setRow] = useState({ edit: false, name: name, id });

  async function deleteL(id) {
    try {
      console.log("Deleting ", id);
      await props.deleteTerritory(id);
      // Delete from State

      // Archive Territory
      const territoryDetails = {
        id: id
      };

      await API.graphql({
        query: deleteTerritory,
        variables: { input: territoryDetails },
      });
    } catch (err) {
      console.log("error deleting location", err);
    }
  }

  const saveRow = async (e) => {
    e.preventDefault();

    const territoryDetails = {
      id: id,
      name: row.name,
    };

    await API.graphql({
      query: updateTerritory,
      variables: { input: territoryDetails },
    });

    setRow({ ...row, edit: false });
  };

  return (
    <tr key={id}>
      <th scope='row'>{props.index + 1}</th>
      <td className="rowHover" onDoubleClick={() => setRow({ ...row, edit: !row.edit })}>
        {row.edit ? (
          <input
            name='Name'
            value={row.name}
            onChange={(e) => setRow({ ...row, name: e.target.value })}
          />
        ) : (
          <Link to={`/t/${id}`} key={id}>
            {row.name}
          </Link>
        )}{" "}
        {row.edit && (
          <button type='button' className='btn btn-primary' onClick={saveRow}>
            Save
          </button>
        )}
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        {" "}
        <i className='fas fa-trash-alt' onDoubleClick={() => deleteL(id)}></i>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTerritory: (id) =>
      dispatch({ type: "DELETE_TERRITORY", payload: id }),
  };
};

export default connect(null, mapDispatchToProps)(TerritoryRow);
