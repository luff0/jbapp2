import React, { Fragment, useRef, useState } from 'react'
import { printRp } from '../../helpers'
import myAxios from '../../helpers/Request'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../ExportPdfSales';
import { Dialog, Transition } from '@headlessui/react';

export default function ReportSales(){
	const [open, setOpen] = useState(false)
	const cancelButtonRef = useRef(null)
	const [contentPrint, setContentPrint] = useState({})
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const dateDefault = new Date()
	const MM = ('0'+(dateDefault.getMonth()+1)).slice((dateDefault.getMonth()+1).length-2,(dateDefault.getMonth()+1).length)
	const dd = ('0'+dateDefault.getDate()).slice((dateDefault.getDate()+1).length-2,(dateDefault.getDate()+1).length)
	let date = `${dateDefault.getFullYear()}-${MM}-${dd}`
	const [dateSales, setDateSales] = React.useState(date)
	const [salesTable, setSalesTable] = React.useState([])
	React.useEffect(()=>{
		const start = new Date(dateSales)
		let startDate = `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`
		let dateEnd = new Date(dateSales)
		dateEnd.setDate(dateEnd.getDate()+2)
		let end = `${dateEnd.getFullYear()}-${dateEnd.getMonth()+1}-${dateEnd.getDate()}`
		myAxios.post("/sales/getallbytime",{start:startDate,end})
		.then(res=>{
		if(res.data.status === 'success'){
			let data = []
			res.data.dataSales.forEach(transaksi => {
				transaksi.itemList.forEach( item => {
					let jam = new Date(transaksi.created_date)
					data.push({itemName:item.itemName, total:item.total, shift: transaksi.shift.shiftName, jam:jam.getHours()+':'+(jam.getMinutes()+'0').slice(0,2)})
				})
			})
			setSalesTable(data)
		}
		})
		.catch(err=>console.log(err))
	},[dateSales])

	const printDate = (x) => {
		var d = new Date(x);
		var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
		return datestring
		// 16-5-2015 9:50
	}

	const hitungTotal = (data) => {
		let total = 0
		data.forEach(item => {
			total = total + parseInt(item.total)
		})
		return printRp(total)
	}
	const columnsSales = [
		{name: printDate(dateSales), selector: row => row.jam, width:'10%'},
		{name: '', selector: row => row.shift, width:'15%'},
		{name: '', selector: row => row.itemName},
		{name: hitungTotal(salesTable), selector: row => printRp(row.total), width:'10%'},
	]

    return(
        <>
		<div className="m-4">
			<h2 className="text-2xl font-medium my-3">Report - Penjualan</h2>
			<div className='flex flex-row gap-x-2 my-3 items-center'>
				<Link to="/report/po">
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Purchase Order Report
					</button>
				</Link>
				<input className="border-gray-300 rounded-md text-sm shadow-sm font-medium text-gray-700" onChange={t=>setDateSales(t.target.value)} value={dateSales} type="date"></input>
				<button
					type="button"
					onClick={()=>setOpen(true)}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Export
				</button>
			</div>
            <DataTable columns={columnsSales} data={salesTable}
                pagination
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
					<Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl sm:w-full">
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<ComponentToPrint content={{table:salesTable, date:dateSales, total: hitungTotal(salesTable)}} ref={componentRef} />
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							
						<button
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-500 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => {
								handlePrint();
								setOpen(false)
							}}
						>
							Print!
						</button>
						<button
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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