import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {Costumers, CreatePO, Dashboard, ImportCSV, Library, PurchaseOrder} from './pages'
import myAxios from './helpers/Request';
import { useEffect, useState } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Report from './pages/Report';

function App() {
  const [cookie, setCookie] = useState(true)
  const dispatch = useDispatch()
  const refreshItemLibrary = useSelector(state=>state.RefreshItemLibraryReducer)
  const logged = useSelector(state=>state.LoggedReducer)

  // GET PRODUCT DATA
  useEffect( () => {
    myAxios.get('/users/cookie')
    .then(res => {
        if(res.data.cookie){
          setCookie(true)
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
        }else{
          setCookie(false)
        }
    })
    .catch(err => console.log(err))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[refreshItemLibrary])

  //GET DATA COSTUMERS
  useEffect( () => {
    if(cookie){
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cookie])

  return (
    <Router>
      {
        logged?
        <div id="mySidebar" className="h-full text-start fixed z-10 w-56 top-0 left-0 bg-slate-200 overflow-x-hidden pt-16 sidebar transition">
          <a className="py-2 pl-8 pr-2 text-md text-slate-800 block transition hover:text-slate-500" href="/">Dashboard</a>
          <a className="py-2 pl-8 pr-2 text-md text-slate-800 block transition hover:text-slate-500" href="/library">Library</a>
          <a className="py-2 pl-8 pr-2 text-md text-slate-800 block transition hover:text-slate-500" href="/import-csv">Import CSV</a>
          <a className="py-2 pl-8 pr-2 text-md text-slate-800 block transition hover:text-slate-500" href="/po">Purchase Order</a>
          <a className="py-2 pl-8 pr-2 text-md text-slate-800 block transition hover:text-slate-500" href="/costumers">Costumers</a>
          <a className="py-2 pl-8 pr-2 text-md text-slate-800 block transition hover:text-slate-500" href="/report">Report</a>
        </div>:null
      }
      <div id="main" className={logged?"ml-56":""}>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/import-csv" element={<ImportCSV/>}/>
          <Route path="/po" element={<PurchaseOrder/>}/>
          <Route path="/po/create" element={<CreatePO/>}/>
          <Route path="/costumers" element={<Costumers/>}/>
          <Route path="/report" element={<Report/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
