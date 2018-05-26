import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import { sessionService } from 'redux-react-session'
import reducers from './reducers'
import  thunk  from 'redux-thunk'
import App from './components/App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

// Init the session service
sessionService.initSessionService(store,
    {
        refreshOnCheckAuth: true,
        driver: 'COOKIES',
        redirectPath: "/"
    });

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );

render(App);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept('./components/App', () => render(App));

/*
"engines": {
    "node": "8.9.4",
    "yarn": "1.4.0"
  },

"postinstall": "npm run build",
  */