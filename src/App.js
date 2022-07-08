import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {Dashboard, Library} from './pages'
import myAxios from './helpers/Request';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const refreshItemLibrary = useSelector(state=>state.RefreshItemLibraryReducer)

  // GET PRODUCT DATA
  useEffect( () => {
    myAxios.get('/library/item-library/getAll')
    .then(res => {
      if(res.data.status === "success"){
        dispatch({
          type:"SET_PRODUCT_LIST",
          data:res.data.product
        })
      }
    })
    .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[refreshItemLibrary])

  //GET DATA COSTUMERS
  useEffect( () => {
    myAxios.get('/costumers/getCostumers')
    .then(res => {
      if(res.data.status === "success"){
        dispatch({
          type:"SET_COSTUMER_LIST",
          data:res.data.costumers
        })
      }
    })
    .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //GET DATA CATEGORIES
  useEffect( () => {
    myAxios.get('/category/getall')
    .then(res => {
      if(res.data.status === "success"){
      dispatch({
          type:"SET_CATEGORY_LIST",
          data:res.data.category
        })
      }
    })
    .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Router>
      <div id="mySidebar" className="h-full text-start fixed z-10 w-56 top-0 left-0 bg-slate-200 overflow-x-hidden pt-16 sidebar transition">
        <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/">Dashboard</a>
        <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/library">Library</a>
        <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/import-csv">Import CSV</a>
        <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/po">Purchase Order</a>
        <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/costumers">Costumers</a>
      </div>
      <div id="main" className="ml-56">
        <Routes>
          <Route path="/" element={<Library/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          {/* <Route path="/" element={<Dashboard/>}/>
          <Route path="/library" element={<Library/>}/> */}
          {/* <Route path="/import-csv" exact component={ImportCSV}/>
          <Route path="/po" exact component={PurchaseOrder}/>
          <Route path="/po/create" exact component={CreatePO}/>
          <Route path="/costumers" exact component={Costumers}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
