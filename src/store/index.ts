import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export default function configureStore():Store {
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
