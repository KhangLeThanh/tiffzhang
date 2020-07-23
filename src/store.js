import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import eventReducer  from './reducers/eventReducer'
import filterReducer  from './reducers/filterReducer'
import favouriteReducer  from './reducers/favouriteReducer'


const reducer = combineReducers({
    events: eventReducer,
    filter: filterReducer,
    favourite: favouriteReducer

})
const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}
const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store