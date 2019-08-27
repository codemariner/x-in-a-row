import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export default function configureStore() {
    return createStore(
        reducers,
        composeWithDevTools(
            applyMiddleware(store => next => action => {
                store.getState;
                next(action);
            })
        )
    );
}
