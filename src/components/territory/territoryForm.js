import React, { useEffect, useState } from "react";
import { fetchTerritorys, addTerritory, deleteT } from "../database/database";
import { connect } from "react-redux";

const initialState = {
  name: "",
  error: "",
};

const territoryDefaults = { lat: 0, lon: 0, distance: 0, zoom: 0.5 };

const TerritoryForm = (props) => {
  const { territorys, setTerritorys } = props;

  const [formState, setFormState] = useState(initialState);
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const resetForm = () => {
    setFormState(initialState);
  };
  return (
    <form>
      <div className='row'>
        <div className='col'>
          <div className="input-group mb-3">
            <input 
              type="text" 
              onChange={(event) => setInput("name", event.target.value)}
              value={formState.name}
              placeholder='Territory Name'
              className='form-control'
              />
            <span className="input-group-append">
              <button 
                className="btn btn-primary" 
                type="button"
                onClick={async (e) => {
                  try{
                    e.preventDefault();
                    await addTerritory(formState, resetForm);
                    const newTerritorys = await fetchTerritorys();
                    console.log(newTerritorys, "newTerritorys")
                    props.updateTerritories(newTerritorys);
                    setFormState(initialState);
                  }catch(e){
                    console.log("Error creating territory", e)
                  }

                }}
                >New Territory</button>
            </span>
          </div>
        </div>
        <div className='col'>

        </div>
      </div>
      <hr />
    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(TerritoryForm);




// <button
// onClick={async (e) => {
//   e.preventDefault();
//   await addTerritory(formState, resetForm);
//   const newTerritorys = await fetchTerritorys();
//   props.updateTerritories(newTerritorys);
//   setFormState(initialState);
// }}
// className='btn btn-primary'
// >
// Create Territory
// </button>