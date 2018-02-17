///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
import 'babel-polyfill';
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
window.Tether = require('tether');
/////////////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import ReduxToastr from 'react-redux-toastr'

import configureStore from './store/configureStore';

const store = configureStore();

import rootRoute from './routes/index';

ReactDOM.render(
  <Provider store={store}>
    <Router onChange={() => {console.log('change route');}} history={browserHistory} routes={rootRoute}>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar/>
    </Router>
  </Provider>,
  document.getElementById('root')
);