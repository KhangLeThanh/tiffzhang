import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import eventReducer  from './reducers/eventReducer'
import filterCategory  from './reducers/filterCategory'
import favouriteReducer  from './reducers/favouriteReducer'
import filterMonth  from './reducers/filterMonth'


const reducer = combineReducers({
    events: eventReducer,
    category: filterCategory,
    favourite: favouriteReducer,
    month:filterMonth

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
