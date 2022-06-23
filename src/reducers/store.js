import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combiner from './index';

const store = createStore(combiner, composeWithDevTools());

export default store;
