import React from 'react'
import { AuthContext } from './../../context/AuthContext';

export default function PageHeader(){
  

  const { AuthData, logOut } = React.useContext(AuthContext)

  const LoginRedirect = () => {
    window.location.href= "/login"
  }

  
  return(
    <div className="gradientDecorator pageHeader">
      <p>EDirectinsure TODO list</p>
      <div style={{display:"flex", flexDirection:"row"}}>
        <p>Welcome {AuthData.username ? AuthData.username : "guest"}</p>
        {AuthData.username ? <div className="buttonStyle" onClick={logOut}>Logout</div> : <div onClick={LoginRedirect} className="buttonStyle">Login</div>}
      </div>
    </div>
    )
  }