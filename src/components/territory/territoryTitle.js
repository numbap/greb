import React, { useEffect, useState } from "react";

const initialState = { name: "", error: "", disabled: true };

const TerritoryTitle = (props) => {
  const [formState, setFormState] = useState(initialState);

  return (
    <div className='row'>
      <div className='col-md-12'>
        {formState.disabled ? (
          <span>
            <h1>{props.territoryName} GGGGGG</h1>
          </span>
        ) : (
          <div className='form-group'>
            <label for='exampleInputEmail1'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerritoryTitle;
