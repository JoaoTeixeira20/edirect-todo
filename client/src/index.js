import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import PageHeader from './components/PageLayout/PageHeader';
import PageLayout from './components/PageLayout/PageLayout';
import AuthContextProvider from './context/AuthContext';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PageLayout>
        <PageHeader/>
        <App />
      </PageLayout>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
