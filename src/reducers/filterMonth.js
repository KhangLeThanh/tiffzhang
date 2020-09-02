
const filterMonth = (state = "07", action) => {
  switch (action.type) {
    case "FILTER_MONTH":
      return action.filter;
    default:
      return state;
  }
};

export const monthChange = (filter) => {
  return {
    type: "FILTER_MONTH",
    filter,
  };
};

export default filterMonth;
