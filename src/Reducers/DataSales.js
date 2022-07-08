const DataSalesReducer = (state = [], action) => {
  switch(action.type){
    case "SET_DATA_SALES":
      return action.data
    default:
      return state
  }
}

export default DataSalesReducer