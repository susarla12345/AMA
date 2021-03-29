import { createStore, applyMiddleware } from 'redux';
import testReducer from './reducers/test-reducers';
import thunkMiddleware from 'redux-thunk'

const store = createStore(testReducer, applyMiddleware(thunkMiddleware));

export default store;