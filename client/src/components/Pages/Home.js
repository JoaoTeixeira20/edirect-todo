import React from 'react';

import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext';

const Home = () => {

  const { AuthData } = React.useContext(AuthContext)

  if (!AuthData.username){
    return (
      <div className="homeContent gradientDecorator">
      <div className="projectTitle">Hello guest, please login or register on our app</div>
      <Link to="/login"><div className="buttonStyle">Login</div></Link>
      <Link to="/signup"><div className="buttonStyle">Register</div></Link>
      </div>
    )
  }
  return (
    <div className="homeContent">
    <div>Hello {AuthData.username}, check your projects here</div>
    <Link to="/projectlist"><div className="buttonStyle">Projects</div></Link>
    </div>
  )
}
 
export default Home;