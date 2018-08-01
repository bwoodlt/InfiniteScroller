import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const initialState = {};

const middleware = [thunk];

const compose = composeWithDevTools(applyMiddleware(...middleware));

function configureStore() {
  return createStore(rootReducer, initialState, compose);
};

export default configureStore;