const RefreshItemLibraryReducer = (state = '', action) => {
  switch(action.type){
    case "SET_REFRESH_ITEM_LIBRARY":
      return Math.random().toString(36)
    default:
      return state
  }
}

export default RefreshItemLibraryReducer