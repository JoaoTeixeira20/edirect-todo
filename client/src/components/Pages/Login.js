import React from 'react'

import { loginUser } from '../../api/UserAPI'
import { AuthContext } from '../../context/AuthContext';
import { useHistory, Link } from 'react-router-dom'

export default function Login(){

  const history = useHistory()

  const { setAuthorizationData } = React.useContext(AuthContext)
  
  const [ loginCredentials , setLoginCredentials ] = React.useState({
    username:"",
    password:""
  })

  const [ errorState, seterrorState ] = React.useState("")

  const onChangeHandler = event => {
    const { name, value } = event.target
    setLoginCredentials({...loginCredentials,[name]:value})
  }
  
  const validateLogin = async event => {
    if (event) event.preventDefault()
    loginUser(loginCredentials.username, loginCredentials.password)
      .then(res => {
        if (res.status === 200){
          const token = res.data.BearerToken
          const username = res.data.username
          setAuthorizationData(token, username)
          history.push('/projectList')
        }else{
          setLoginCredentials({...loginCredentials,password:""})
          seterrorState("Invalid credentials")
        }
      })
      .catch(_ => {
        seterrorState('error occured on login validation')
      })
    
  }
  
  return(
    <div className="userFormContainer gradientDecorator">
        <div className="projectTitle">Login</div>
        <input type="text" name="username" placeholder="username" value={loginCredentials.username} onChange={onChangeHandler}></input>
        <input type="password" name="password" placeholder="password" value={loginCredentials.password} onChange={onChangeHandler}></input>
        <div className="buttonStyle" onClick={validateLogin}>submit</div>
        <div>don't have an account?</div>
        <Link to="signup"><div className="buttonStyle">Register</div></Link>
        <p style={{color:"red"}}>{errorState}</p>
      {/* <div>token is {AuthData.token} usename is {AuthData.username}</div> */}
    </div>
    )
  }