import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import requestReducer from './reducers/requestReducer';
import userReducer from './reducers/userReducer';
import messagesReducer from './reducers/messagesReducer';
import generalReducer from './reducers/generalReducer';
import reportsReducer from './reducers/reportsReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    request: requestReducer,
    general: generalReducer,
    user: userReducer,
    userMessages: messagesReducer,
    reports: reportsReducer
});

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeEnhancers && composeEnhancers()
));

export default store;