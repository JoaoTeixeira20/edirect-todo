import React from 'react';

import { Link } from 'react-router-dom'

const NotFound = () => {
  return ( <div className="homeContent">
    <p>Oops, this page doesn't exists</p>
    <Link to="/"><div className="buttonStyle">go back</div></Link>
  </div> );
}
 
export default NotFound;