import React from 'react'

export const AuthContext = React.createContext()

const token = localStorage.getItem("Token")
const username = localStorage.getItem("username")

const AuthContextProvider = (props) => {

  //initialized with localstorage data
  const [ AuthData, setAuthData ] = React.useState({ token:token, username: username })

  const setAuthorizationData = (token, username) => {
    setAuthData({token: token, username: username})
  }

  const logOut = () => {
    setAuthorizationData(null,null)
  }

  //triggers to update the localstorage with user credentials
  React.useEffect(() => {
    AuthData.token ? localStorage.setItem("Token", AuthData.token) : localStorage.removeItem("Token")
    AuthData.username ? localStorage.setItem("username", AuthData.username) : localStorage.removeItem("username")
  },[AuthData])


  return (<AuthContext.Provider value={{AuthData, setAuthorizationData, logOut}}>
    {props.children}
  </AuthContext.Provider>)
}

export default AuthContextProvider
