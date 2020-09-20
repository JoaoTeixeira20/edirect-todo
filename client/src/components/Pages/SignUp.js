import React from 'react';

import { registerUser } from '../../api/UserAPI'

import { useHistory } from "react-router-dom"

const SignUp = () => {

  const history = useHistory()

  const [ loginCredentials , setLoginCredentials ] = React.useState({
    name:"",
    username:"",
    password:"",
    confirmpassword:""
  })

  const [ errorState, seterrorState ] = React.useState("")

  const onChangeHandler = event => {
    const { name, value } = event.target
    setLoginCredentials({...loginCredentials,[name]:value})
  }

  const registerUserHandler = async event => {
    if (event) event.preventDefault()
    if (loginCredentials.password === loginCredentials.confirmpassword){
      registerUser(loginCredentials.name, loginCredentials.username, loginCredentials.password)
        .then(res => {
          if (res.status === 201){
            history.push('/login')
          }else{
            seterrorState("error registering user, username might already exists")
          }
        })
    }else{
      seterrorState("the passwords doesn't match")
    }
  }

  return ( 
      <div className="userFormContainer">
          <div className="projectTitle">Register</div>
          <input type="text" name="name" placeholder="name" value={loginCredentials.name} onChange={onChangeHandler}></input>
          <input type="text" name="username" placeholder="username" value={loginCredentials.username} onChange={onChangeHandler}></input>
          <input type="password" name="password" placeholder="password" value={loginCredentials.password} onChange={onChangeHandler}></input>
          <input type="password" name="confirmpassword" placeholder="confirm password" value={loginCredentials.confirmpassword} onChange={onChangeHandler}></input>
          <div className="buttonStyle" onClick={registerUserHandler}>Register</div>
          <p style={{color:"red"}}>{errorState}</p>
        {/* <div>token is {AuthData.token} usename is {AuthData.username}</div> */}
      </div>
   );
}
 
export default SignUp;