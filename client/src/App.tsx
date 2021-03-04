import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const MainPage = React.lazy(
  () => import('./components/pages/MainPage/MainPage')
);
const LoginPage = React.lazy(
  () => import('./components/pages/LoginPage/LoginPage')
);

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
