import React, { useEffect, useState, Fragment, useRef } from 'react'
import { printRp } from '../helpers'
import {useDispatch, useSelector} from 'react-redux'
// import ModalComponent from '../components/ModalComponent'
import { CSVLink } from "react-csv";
import myAxios from '../helpers/Request'
import DataTable from 'react-data-table-component';
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';



const Library = () => {

	const dispatch = useDispatch()
	let dataLibrary = useSelector(state => state.ProductListReducer)
	const [filteredItems, setFilteredItems] = React.useState()
	const [open, setOpen] = useState(false)
  	const cancelButtonRef = useRef(null)
	const form = {sku:'', category:'', itemName:'', basicPrice:'', costAmount:'',stock:'', stockAlert:''}
	const [dataTambah, setDataTambah] = useState(form)
	const navigate = useNavigate()
	useEffect(()=>{
		myAxios.get('/users/cookie')
		.then(res => {
			if(!res.data.cookie){
			  navigate('/login')
			}
		})
		.catch(err => console.log(err))
		//eslint-disable-next-line
	},[])
	useEffect(()=>{
		setFilteredItems(dataLibrary)
	},[dataLibrary])
	const exportCSV = dataLibrary.map(e =>{
		return {_id:e._id, sku:e.sku, category:e.category, itemName:e.itemName,variantName:e.variantName, basicPrice:e.basicPrice, costAmount:e.costAmount, stock:e.stock, stockAlert:e.stockAlert}
	})

	const [dataEdit, setDataEdit] = useState({})
	const [dataDelete, setDataDelete] = useState([])
	const doDelete = () => {
		for(let i = 0; i < dataDelete.length; i++){
			myAxios.post('/library/item-library/deleteone',{_id:dataDelete[i]._id})
			.then(res => {
			if(res.data.status === "success"){
				console.log('hapus success')
			}else{
				console.log('failed')
			}
			})
			.catch(err => console.log(err))
		}
		dispatch({
			type:"SET_REFRESH_ITEM_LIBRARY"
		})
	}
	const columns = [
		{name: 'SKU', selector: row => row.sku, width:'10%'},
		{name: 'Category', selector: row => row.category, sortable:true, width:'10%'},
		{name: 'Item Name', selector: row => row.itemName, sortable:true},
		// {name: 'Variant', selector: row => row.variant},
		{name: 'Basic Price', selector: row => row.basicPrice, sortable:true, format: row => printRp(row.basicPrice), width:'15%'},
		{name: 'Cost Amount', selector: row => row.costAmount, sortable:true, format: row => printRp(row.costAmount), width:'15%'},
		{name: 'Stok', selector: row => row.stock, sortable:true, width:'6%'},
		{name: 'Stok Alert', selector: row => row.stockAlert, width:'7%'},
	]
	const [filterText, setFilterText] = React.useState('');
	useEffect(()=>{
		let filterData = dataLibrary.filter(
			item => item.itemName && item.itemName.toLowerCase().includes(filterText.toLowerCase()),
			);
			setFilteredItems(filterData)
	// eslint-disable-next-line
	},[filterText])
	const inputHandler = (e) => {
		setFilterText(e.target.value)
	}
	const conditionalRowStyles = [
		{
		  when: row => row.stock > row.stockAlert,
		  style: {
			backgroundColor: '#91d391',
			color: 'black',
			'&:hover': {
			  cursor: 'pointer',
			},
		  },
		},
		{
		  when: row => row.stock === row.stockAlert,
		  style: {
			backgroundColor: '#ffff7b',
			color: 'black',
			'&:hover': {
			  cursor: 'pointer',
			},
		  },
		},
		{
		  when: row => row.stock < row.stockAlert,
		  style: {
			backgroundColor: '#ff7777',
			color: 'black',
			'&:hover': {
			  cursor: 'pointer',
			},
		  },
		},
	  ];

	
	const [editBtn, setEditBtn] = useState(true)
	const [onEdit, setOnEdit] = useState(false)
	const [deleteBtn, setDeleteBtn] = useState(true)
	const selectedRow = (row) => {
		if(row.selectedCount === 1){
			setEditBtn(false)
			setDataEdit(row.selectedRows[0])
		}else{
			setEditBtn(true)
		}
		if(row.selectedCount > 0){
			setDeleteBtn(false)
			setDataDelete(row.selectedRows)
		}else{
			setDeleteBtn(true)
		}
	}

	/////MODAL
	const formHandler = (e) => {
		setDataTambah({...dataTambah,[e.target.name]:e.target.value})
	}
	const onSaveTambah = () => {
		myAxios.post('/library/item-library/createone',dataTambah)
		.then(res=>{
		  if(res.data.status === "success"){
			dispatch({
			type:"SET_REFRESH_ITEM_LIBRARY"
			})
		  }else{
			console.log('simpan gagal')
		  }
		})
		.catch(err=>{
		  console.log(err)
		})
	}
	const onSaveEdit = () => {
		myAxios.post('/library/item-library/updateone',dataTambah)
		.then(res=>{
		if(res.data.status === "success"){
			dispatch({
				type:"SET_REFRESH_ITEM_LIBRARY"
			})
		}else{
			console.log('simpan gagal')
		}
		})
		.catch(err=>{
		console.log(err)
		})
	}
	return(
		<>
		<div className="m-4">
			<h2 className="text-2xl font-medium my-3">Library</h2>
			<div className="mt-1 relative rounded-md shadow-sm">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<span className="text-gray-500 sm:text-sm">
						Search
					</span>
				</div>
				<input onChange={inputHandler} type="text" name="price" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 pr-12 sm:text-sm border-gray-300 rounded-md"></input>
			</div>
			<div className='flex flex-row gap-x-2 my-3 items-center'>
				<button
					type="button"
					onClick={()=>{setOpen(true);setOnEdit(false);setDataTambah(form)}}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Tambah Produk
				</button>
				<button
					disabled={editBtn}
					onClick={()=>{setOnEdit(true);setOpen(true);setDataTambah(dataEdit)}}
					type="button"
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Edit
				</button>
				<button
					disabled={deleteBtn}
					type="button"
					onClick={doDelete}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Delete
				</button>
				<button
					type="button"
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<CSVLink style={{float:'right', color:'black'}} data={exportCSV}>Export CSV</CSVLink>
				</button>
			</div>
			<DataTable columns={columns} data={filteredItems}
				selectableRows
				onSelectedRowsChange = {selectedRow}
				pagination
				highlightOnHover
				conditionalRowStyles={conditionalRowStyles}
			/>
		</div>
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
				<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>
				<div className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
					<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
					<Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
								Tambah Produk
							</Dialog.Title>
							<div className="mt-2">
							<form action="#" method="POST">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
										<label htmlFor="sku" className="block text-sm font-medium text-gray-700">
											SKU
										</label>
										<input
											onChange={formHandler}
											value={dataTambah.sku}
											type="text"
											name="sku"
											id="sku"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
										<label htmlFor="category" className="block text-sm font-medium text-gray-700">
											Category
										</label>
										<input
											onChange={formHandler}
											value={dataTambah.category}
											type="text"
											name="category"
											id="category"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6">
										<label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
											Nama Item
										</label>
										<input
											onChange={formHandler}
											value={dataTambah.itemName}
											type="text"
											name="itemName"
											id="itemName"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										</div>

										<div className="col-span-6 sm:col-span-3">
										<label htmlFor="basicPrice" className="block text-sm font-medium text-gray-700">
											Basic Price
										</label>
										<input
											onChange={formHandler}
											value={dataTambah.basicPrice}
											type="number"
											name="basicPrice"
											id="basicPrice"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
										<label htmlFor="costAmount" className="block text-sm font-medium text-gray-700">
											Cost Amount
										</label>
										<input
											onChange={formHandler}
											value={dataTambah.costAmount}
											type="number"
											name="costAmount"
											id="costAmount"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										</div>
										<div className="col-span-6 sm:col-span-3">
										<label htmlFor="stock" className="block text-sm font-medium text-gray-700">
											Stok
										</label>
										<input
											onChange={formHandler}
											value={dataTambah.stock}
											type="number"
											name="stock"
											id="stock"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
										<label htmlFor="stockAlert" className="block text-sm font-medium text-gray-700">
											Stok Alert
										</label>
										<input
											onChange={formHandler}
											value={dataTambah.stockAlert}
											type="number"
											name="stockAlert"
											id="stockAlert"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										</div>
									</div>
									</div>
								</div>
								</form>
							</div>
							</div>
						</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							{
								onEdit?
								<button
									type="button"
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={() => {setOpen(false); onSaveEdit()}}
								>
									Simpan Edit
								</button>:
								<button
									type="button"
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={() => {setOpen(false); onSaveTambah()}}
								>
									Simpan
								</button>
							}
						<button
							type="button"
							className="mt-3 mx-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => setOpen(false)}
							ref={cancelButtonRef}
						>
							Cancel
						</button>
						</div>
					</Dialog.Panel>
					</Transition.Child>
				</div>
				</div>
			</Dialog>
			</Transition.Root>
		</>
	)
}

export default Library