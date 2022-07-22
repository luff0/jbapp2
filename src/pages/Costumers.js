import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import myAxios from '../helpers/Request';

const Costumers = () => {

	const [filterText, setFilterText] = React.useState('');
	const [filteredItems, setFilteredItems] = React.useState()
	const costumers = useSelector(state => state.CostumerReducer)
	const navigate = useNavigate()
	useEffect(()=>{
		myAxios.get('/users/cookie')
		.then(res => {
			if(!res.data.cookie){
			  navigate('/login')
			}
		})
		.catch(err => console.log(err))
		setFilteredItems(costumers)
	},[costumers])
	const columns = [
		{name: 'Nama', selector: row => row.nama, width:'20%'},
		{name: 'Telp', selector: row => row.nohp, width:'15%'},
		{name: 'Email', selector: row => row.email, sortable:true, width:'20%'},
		{name: 'Alamat', selector: row => row.address},
	]
	const inputHandler = (e) => {
		setFilterText(e.target.value)
	}
	useEffect(()=>{
		let filterData = costumers.filter(
			item => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()),
		);
		setFilteredItems(filterData)
		//eslint-disable-next-line
	},[filterText])
	return(
		<div className="m-4">
			<h2 className="text-2xl font-medium my-3">Costumers</h2>
			<div className="mt-1 relative rounded-md shadow-sm my-3">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<span className="text-gray-500 sm:text-sm">
						Search
					</span>
				</div>
				<input onChange={inputHandler} type="text" name="price" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 pr-12 sm:text-sm border-gray-300 rounded-md"></input>
			</div>
			<DataTable columns={columns} data={filteredItems}
				pagination
				highlightOnHover
				/>
		</div>
	)
}

export default Costumers