import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainPage from './components/pages/MainPage/MainPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import NewsPage from './components/pages/NewsPage/NewsPage';
import AdminNewsPage from './components/pages/AdminNewsPage/AdminNewsPage';
import ChildrenSection from './components/pages/ChildrenSection/ChildrenSection';

const ParentPage = React.lazy(
  () => import('./components/pages/ParentPage/ParentPage')
);

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/parent" component={ParentPage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/children" component={ChildrenSection} />
            <Route exact path="/admin/news" component={AdminNewsPage} />
            <Route exact path="/news/:id" component={NewsPage} />
            <Route exact path="/" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </Router>
  );
};

export default App;
