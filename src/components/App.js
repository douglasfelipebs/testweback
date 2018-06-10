import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import importedComponent from 'react-imported-component';
import NavbarHeader from './NavbarHeader'
import PanelsComponents from './PanelsComponents'
import Sobre from './Sobre'
import FormBombeiroVoluntario from './FormBombeiroVoluntario'
import Dashboard from './Dashboard'
import Loading from './Loading'
import { connect } from "react-redux"
import ConsultaNoticias from './ConsultaNoticias'
import { sessionService } from 'redux-react-session'
import { AppCss } from './Layout.css'

const AsyncNoMatch = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './NoMatch'),
    {
        LoadingComponent: Loading
    }
);


const AsyncSobre = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './Sobre'),
    {
        LoadingComponent: Loading
    }
);

const AsyncFormBombeiroVoluntario = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './FormBombeiroVoluntario'),
    {
        LoadingComponent: Loading
    }
);

const AsyncConsultaNoticias = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './ConsultaNoticias'),
    {
        LoadingComponent: Loading
    }
);

const AsyncConsultaPrimeirosSocorros = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './ConsultaPrimeirosSocorros'),
    {
        LoadingComponent: Loading
    }
);
const AsyncPagSeguro = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './Doacoes'),
    {
        LoadingComponent: Loading
    }
);

const App = () => {

    return (
        <Router>
            <div className={AppCss}>
                <Route path='/' render={(routerProps) => (
                    <NavbarHeader props={routerProps}/>
                )} />
                <Switch>
                    <Route exact path='/' render={(routerProps) => (
                        <PanelsComponents props={routerProps} />
                    )} />
                    <Route exact path='/Sobre' component={AsyncSobre}/>
                    <Route exact path='/Voluntario'  component={AsyncFormBombeiroVoluntario}/>
                    <Route path='/Noticias'  component={AsyncConsultaNoticias}/>
                    <Route path='/PrimeirosSocorros'  component={AsyncConsultaPrimeirosSocorros}/>
                    <Route path='/Doacoes'  component={AsyncPagSeguro}/>
                    <Route path='/Dashboard' render={(routerProps) => (
                        <Dashboard props={routerProps} />
                    )} />
                    <Route component={AsyncNoMatch} />
                </Switch>
            </div>
        </Router>
    );
};



export default App;