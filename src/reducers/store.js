import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combiner from './index';

const store = createStore(combiner, composeWithDevTools(
  applyMiddleware(thunk),
));

export default store;
