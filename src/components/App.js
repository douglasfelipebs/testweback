import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import importedComponent from 'react-imported-component';
import NavbarHeader from './NavbarHeader'
import PanelsComponents from './PanelsComponents'
import Sobre from './Sobre'
import Loading from './Loading';
import { AppCss } from './Layout.css'

const AsyncNoMatch = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './NoMatch'),
    {
        LoadingComponent: Loading
    }
);

const App = () => {
    return (
        <Router>
            <div className={AppCss}>
                <Route path='/' render={() => (
                    <NavbarHeader />
                )} />
                <Switch>
                    <Route exact path='/' render={() => (
                        <PanelsComponents />
                    )} />
                    <Route exact path='/Sobre' render={() => (
                        <Sobre />
                    )} />
                    <Route component={AsyncNoMatch} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;