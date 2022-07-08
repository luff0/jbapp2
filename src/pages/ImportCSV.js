import React, { useState } from 'react'
import Papa from 'papaparse'
import myAxios from '../helpers/Request'
import DataTable from 'react-data-table-component';
import { printRp } from '../helpers'


const ImportCSV = () => {
	const [dataCSV, setDataCSV] = useState([])
	const inputHandle = e => {
		Papa.parse(e.target.files[0], {
			header:true,
			complete: function(results) {
				setDataCSV(results.data)
			}
		});
	}
	const submit = () => {
		myAxios.post('/library/item-library/import-csv',{data:dataCSV})
		.then(res => {
		if(res.data.status === "success"){
			console.log(res.data)
		}
    })
    .catch(err => console.log(err))
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

	return(
		<div className="m-4">
			<div>
				<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
					<div className="space-y-1 text-center">
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						stroke="currentColor"
						fill="none"
						viewBox="0 0 48 48"
						aria-hidden="true"
					>
						<path
						d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						/>
					</svg>
					<div className="flex text-sm text-gray-600">
						<label
						htmlFor="file-upload"
						className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
						>
						<span>Upload a file</span>
						<input id="file-upload" onChange={inputHandle} name="file-upload" type="file" className="sr-only" />
						</label>
						<p className="pl-1">or drag and drop</p>
					</div>
					<p className="text-xs text-gray-500">CSV FILE</p>
					</div>
				</div>
				</div>
				<button
					type="button"
					onClick={submit}
					className="my-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Upload
				</button>
				<DataTable columns={columns} data={dataCSV}
					pagination
					highlightOnHover
				/>
		</div>
	)
}

export default ImportCSV