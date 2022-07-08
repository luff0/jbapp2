import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { printRp } from '../helpers'
import myAxios from '../helpers/Request';

const PurchaseOrder = () => {
	const [poList, setPoList] = React.useState([])
	useEffect(()=>{
		myAxios.get('/po/getAll')
		.then(res => {
		if(res.data.status === "success"){
			setPoList(res.data.po)
		}
		})
		.catch(err => console.log(err))
	},[])

	const printDate = (x) => {
		var d = new Date(x);
		var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();
		return datestring
		// 16-5-2015 9:50
	}

	const columns = [
		{name: 'PO id', selector: row => row.poId, width:'5%'},
		{name: 'Tgl', selector: row => row.date, width:'15%', format: row => printDate(row.date)},
		{name: 'Sub-Total', selector: row => row.subTotal, width:'10%', format: row => printRp(row.subTotal)},
		{name: 'Total', selector: row => row.total, width:'10%', format: row => printRp(row.total)},
		{name: 'Vendor', selector: row => row.vendor.vendorName},
	]

	// data provides access to your row data
	const ExpandedComponent = ({ data }) => {
		return(
			<div className='m-4'>
				<table className="w-full">
					<thead>
						<tr>
							<th className="text-left text-xs py-2">Produk</th>
							<th className="text-left text-xs py-2">Cost Amount</th>
							<th className="text-left text-xs py-2">Price</th>
							<th className="text-left text-xs py-2">Qty</th>
							<th className="text-left text-xs py-2">Total</th>
						</tr>
					</thead>
					<tbody>
						{
							data.productList.map(e => (
								<tr className='text-xs'>
									<td className='py-1'>{e.itemName}</td>
									<td className='py-1'>{printRp(e.costAmount)}</td>
									<td className='py-1'>{printRp(e.price)}</td>
									<td className='py-1'>{e.qty}</td>
									<td className='py-1'>{printRp(e.total)}</td>
								</tr>
							))
						}
					</tbody>
				</table>
				<div className='flex flex-row text-xs my-5'>
					<div className='mr-10'>
						<p className='my-1'>Tax</p>
						<p className='my-1'>Shipping</p>
						<p className='my-1'>Other</p>
					</div>
					<div className='mx-10'>
						<p className='my-1'>{printRp(data.tax)}</p>
						<p className='my-1'>{printRp(data.shipping)}</p>
						<p className='my-1'>{printRp(data.other)}</p>
					</div>
				</div>
			</div>
		)
	};
	return(
		<div className="m-4">
			<h2 className="text-2xl font-medium my-3">Purchase Order</h2>
			<div className='flex flex-row gap-x-2 my-3 items-center'>
				<a href='/po/create'>
				<button
					type="button"
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Purchase Order
				</button>
				</a>
			</div>
			<DataTable columns={columns} data={poList}
				pagination
				highlightOnHover
				pointerOnHover
				expandableRows
				expandableRowsComponent={ExpandedComponent}
			/>
		</div>
	)
}

export default PurchaseOrder