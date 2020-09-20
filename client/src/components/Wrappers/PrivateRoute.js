import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest}) => {
  
  const { AuthData } = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => AuthData.token
        ? <Component {...rest} />
        : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute;