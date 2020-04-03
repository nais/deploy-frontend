import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import apiKeysSaga from '../sagas'
import rootReducer from './rootReducer'

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    
    let composedMiddleware

    if(process.env.NODE_ENV !== 'production')  {
        console.log("WARNING: Running Redux with devTools extension. This should only be used in development and not in production.")
        composedMiddleware = composeWithDevTools(applyMiddleware(sagaMiddleware))
    } 
    else {
        composedMiddleware = compose(applyMiddleware(sagaMiddleware))
    }
    
    
    const store =  createStore(rootReducer, composedMiddleware)
    sagaMiddleware.run(apiKeysSaga)
    return store
}