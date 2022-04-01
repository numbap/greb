import React from 'react'
import {Auth} from "aws-amplify";


function CustomSignout() {
  const signOut = (e) => {
      e.preventDefault();
      Auth.signOut();
      window.location.href = `https://${window.location.host}`
    }

  return (
    <button className="mb-1 mt-0 mr-1 btn btn-default" onClick={signOut}>
      Sign out
    </button>
  )
}

export default CustomSignout;