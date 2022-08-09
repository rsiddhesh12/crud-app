import {createStore} from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist'


const logger = (store) => (next) => (action) => {
    console.log(`Logging Data: ${action.type}=>
    Date:=>${JSON.stringify(action)}`);
    console.log(store.getState());
    next(action)
}

const persistConfig = {
    key: 'redux',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

export const store =createStore(persistedReducer ,applyMiddleware(logger,thunk));
export const persistor = persistStore(store)