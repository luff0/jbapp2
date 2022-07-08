const CategoryList = (state = [], action) => {
  switch(action.type){
    case "SET_CATEGORY_LIST":
      return action.data
    default:
      return state
  }
}

export default CategoryList