import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainPage from './components/pages/MainPage/MainPage';
import LoginPage from './components/pages/LoginPage/LoginPage';

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
