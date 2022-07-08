// import React, { useState } from 'react'
// import Papa from 'papaparse'
// import { Button, Container, Form } from 'react-bootstrap'
// import myAxios from '../helpers/Request'
// import { NavbarDashboard } from '../components/NavbarComponent'
// import DataTable from 'react-data-table-component';
// import { printRp } from '../helpers'


const ImportCSV = () => {
	// const [dataCSV, setDataCSV] = useState([])
	// const inputHandle = e => {
	// 	Papa.parse(e.target.files[0], {
	// 		header:true,
	// 		complete: function(results) {
	// 			setDataCSV(results.data)
	// 		}
	// 	});
	// }
	// const submit = () => {
	// 	myAxios.post('/library/item-library/import-csv',{data:dataCSV})
	// 	.then(res => {
	// 	if(res.data.status === "success"){
	// 		console.log(res.data)
	// 	}
    // })
    // .catch(err => console.log(err))
	// }

	// const columns = [
	// 	{name: 'SKU', selector: row => row.sku, width:'10%'},
	// 	{name: 'Category', selector: row => row.category, sortable:true, width:'10%'},
	// 	{name: 'Item Name', selector: row => row.itemName, sortable:true},
	// 	// {name: 'Variant', selector: row => row.variant},
	// 	{name: 'Basic Price', selector: row => row.basicPrice, sortable:true, format: row => printRp(row.basicPrice), width:'15%'},
	// 	{name: 'Cost Amount', selector: row => row.costAmount, sortable:true, format: row => printRp(row.costAmount), width:'15%'},
	// 	{name: 'Stok', selector: row => row.stock, sortable:true, width:'6%'},
	// 	{name: 'Stok Alert', selector: row => row.stockAlert, width:'7%'},
	// ]

	return(
		<div className="import-csv">
			<h2 className="text-2xl font-medium my-3">Import CSV</h2>
			{/* <NavbarDashboard title="importCSV"/>
			<Container fluid>
			<section className="form">
				<Form.Group style={{width:'50%'}} controlId="formFileSm" className="mb-3">
					<Form.Control onChange={inputHandle} type="file" size="sm" />
				</Form.Group>
				<Button size='sm' variant='light' onClick={submit}>Upload</Button>
				<DataTable columns={columns} data={dataCSV}
					pagination
					highlightOnHover
				/>
			</section>
			</Container> */}
		</div>
	)
}

export default ImportCSV