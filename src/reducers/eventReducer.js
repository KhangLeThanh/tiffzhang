import eventService from '../services/event'
const eventReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_EVENT':
            return Object.values(action.data.results)
        case 'SPECIFIC_EVENT':
            return action.data.results
        default:
            return state
  
    }
}

export const intializeEvent = () =>{
    return async dispatch => {
        const events = await eventService.getAll()
        
        dispatch({
          type: 'INIT_EVENT',
          data: events,
        })
      }
    
}
export const getAnEvent = (id) =>{
    return async dispatch => {
        const events = await eventService.fetchAnEvent(id)
        
        dispatch({
          type: 'SPECIFIC_EVENT',
          data: events,
        })
      }
    
}
export default eventReducer