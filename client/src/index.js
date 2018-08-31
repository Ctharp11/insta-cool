import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import Con from './components/Con'
// css
import './App.css';
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><ConnectedRouter history={history}><Con /></ConnectedRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
