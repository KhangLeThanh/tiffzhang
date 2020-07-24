let current_date = new Date();
let current_month = ((current_date.getMonth() + 1) < 10 ? '0' : '') + (current_date.getMonth() + 1);
const filterMonth = (state = current_month, action) => {
    switch (action.type) {
        case 'FILTER_MONTH':
          return action.filter
        default:
          return state
    }
  }
  
  export const monthChange = filter => {
    return {
      type: 'FILTER_MONTH',
      filter,
    }
  }
  
  export default filterMonth