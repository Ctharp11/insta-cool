import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import rootReducer from './reducers/index';
import posts from './data.json';
import comments from './data.json';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create object for default data
const defaultState = {
    posts,
    comments
}

const store = createStore(
    connectRouter(history)(rootReducer),
    defaultState,
    composeEnhancers(applyMiddleware(middleware))
  );

export { history };
export default store; 