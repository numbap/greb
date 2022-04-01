import React from "react";
import LocationTableRow from "./locationTableRow";
import { connect } from "react-redux";


const LocationTable = (props) => {

  return (
    <table className='table'>
      <thead className='thead-dark'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Address</th>
          <th scope='col'>Δ</th>
          <th scope='col'>Lat</th>
          <th scope='col'>Lon</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {props.clusteredLocations.features
          .map((loc, index) => (
            <LocationTableRow loc={loc} key={index} index={index} />
          ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    territory: state.territory,
    clusteredLocations: state.clusteredLocations
  }
};

export default connect(mapStateToProps, null)(LocationTable);



