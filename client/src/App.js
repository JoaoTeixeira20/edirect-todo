import React from 'react';

import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'

import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import ProjectList from './components/Pages/ProjectList';
import PrivateRoute from './components/Wrappers/PrivateRoute';
import NotFound from './components/Pages/NotFound';
import Home from './components/Pages/Home';
import ErrorBoundaries from './ErrorBoundaries';



// function CountComponent() {
//   const count = useSelector(getCount)
//   return <p>Count: {count}</p>
// }

// function ButtonComponent() {
//   const dispatch = useDispatch()

//   return (
//     <>
//       <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
//       <button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>
//     </>
//   )
// }

function App() {
  return (
    <div className="pageContent">
      <ErrorBoundaries>
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp}/>
            <PrivateRoute path='/projectlist' component={ProjectList}/>
            <Route component={NotFound}></Route>
          </Switch>
        </Router>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
