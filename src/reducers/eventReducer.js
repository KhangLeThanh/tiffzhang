import eventService from '../services/event'
const eventReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_EVENT':
            return Object.values(action.data.results)
        
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
export default eventReducer