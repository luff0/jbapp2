import ProductListReducer from './ProductList'
import LoggedReducer from './LoggedReducer'
import CategoryReducer from './CategoryList'
import CostumerReducer from './CostumerList'
import ModalReducer from './Modal'
import DataSalesReducer from './DataSales'
import RefreshItemLibraryReducer from './RefreshItemLibrary'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    ProductListReducer,
    LoggedReducer,
    CategoryReducer,
    CostumerReducer,
    ModalReducer,
    DataSalesReducer,
    RefreshItemLibraryReducer
})


export default allReducers