import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center text-white p-5 rounded">
        <h3 className="mb-5">Sorry, nothing found by this link!</h3>
        <Link className="btn btn-secondary" to='/'>Go home...</Link>
    </div>
  )
}

export default NotFound;
