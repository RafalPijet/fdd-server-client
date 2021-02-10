import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainPage from './components/pages/MainPage/MainPage';

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
