import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from './reducers';


export default function configureStore() {
	return createStore(reducers, composeWithDevTools());
}