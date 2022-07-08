const ProductListReducer = (state = [], action) => {
  switch(action.type){
    case "SET_PRODUCT_LIST":
      return action.data
    default:
      return state
  }
}

export default ProductListReducer