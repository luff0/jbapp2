const CostumersReducer = (state = [], action) => {
  switch(action.type){
    case "SET_COSTUMER_LIST":
      return action.data
    default:
      return state
  }
}

export default CostumersReducer