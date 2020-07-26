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

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)


export default store
