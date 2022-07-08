const ModalReducer = (state = {show:false,size:'sm'}, action) => {
  switch(action.type){
    case "SHOW_MODAL":
      return {show:true,for:action.for,data:action.data,size:action.size}
    case "HIDE_MODAL":
      return {show:false,size:'sm'}
    default:
      return state
  }
}

export default ModalReducer