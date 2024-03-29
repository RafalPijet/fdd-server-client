import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const DonatePage = React.lazy(
  () => import('./components/pages/DonatePage/DonatePage')
);

const PercentPage = React.lazy(
  () => import('./components/pages/PercentPage/PercentPage')
);

const ResetPasswordPage = React.lazy(
  () => import('./components/pages/ResetPasswordPage/ResetPasswordPage')
);

const MainPage = React.lazy(
  () => import('./components/pages/MainPage/MainPage')
);

const LoginPage = React.lazy(
  () => import('./components/pages/LoginPage/LoginPage')
);

const AdminPage = React.lazy(
  () => import('./components/pages/AdminPage/AdminPage')
);

const AdminNewsPage = React.lazy(
  () => import('./components/pages/AdminNewsPage/AdminNewsPage')
);

const AdminReportsPage = React.lazy(
  () => import('./components/pages/AdminReportsPage/AdminRepotsPage')
);

const ChildrenSection = React.lazy(
  () => import('./components/pages/ChildrenSection/ChildrenSection')
);

const NewsPage = React.lazy(
  () => import('./components/pages/NewsPage/NewsPage')
);

const StatutPage = React.lazy(
  () => import('./components/pages/StatutPage/StatutPage')
);

const ClausePage = React.lazy(
  () => import('./components/pages/ClausePage/ClausePage')
);

const ParentPage = React.lazy(
  () => import('./components/pages/ParentPage/ParentPage')
);

const ReportsPage = React.lazy(
  () => import('./components/pages/ReportsPage/ReportsPage')
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
            <Route exact path="/statut" component={StatutPage} />
            <Route exact path="/clause" component={ClausePage} />
            <Route exact path="/reports" component={ReportsPage} />
            <Route exact path="/percent" component={PercentPage} />
            <Route exact path="/donate/:id" component={DonatePage} />
            <Route exact path="/admin/news" component={AdminNewsPage} />
            <Route exact path="/admin/reports" component={AdminReportsPage} />
            <Route exact path="/news/:id" component={NewsPage} />
            <Route
              exact
              path="/change/:email/:token"
              component={ResetPasswordPage}
            />
            <Route exact path="/" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </Router>
  );
};

export default App;
