
const favouriteReducer = (state = [], action) => {
    switch (action.type) {
        
        case 'ADD_EVENT':
          return  [...state, action.data]
        case 'REMOVE_EVENT':
            const eventId = action.data.eid 
            const removeItem = state.filter( n  => n.eid !== eventId)
            return [
                ...removeItem
            ]
        default:
          return state
    }
  };
  
export const addEvent = (data) => {
    return {
        type: 'ADD_EVENT',
        data,
    }
}
export const removedEvent = (data) =>{

    return {
          type: 'REMOVE_EVENT',
          data,
      }
    
}  
export default favouriteReducer