import React, { Fragment, useRef, useState } from 'react'
import { printRp } from '../helpers'
import myAxios from '../helpers/Request'
import DataTable from 'react-data-table-component';
import { Dialog, Transition } from '@headlessui/react'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ExportPdf';

export default function Report(){
	//eslint-disable-next-line
	const [penjualan, setPenjualan] = useState(false)
	const [open, setOpen] = useState(false)
  	const cancelButtonRef = useRef(null)
	const [poList, setPoList] = React.useState([])
	const getPO = () => {
		myAxios.get('/po/getAll')
		.then(res => {
		if(res.data.status === "success"){
			setPoList(res.data.po)
		}
		})
		.catch(err => console.log(err))
	}

	React.useEffect(()=>{
		getPO()
	})

	const printDate = (x) => {
		var d = new Date(x);
		var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
		return datestring
		// 16-5-2015 9:50
	}

	const [contentPrint, setContentPrint] = useState({})
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const columns = [
		// {name: 'PO id', selector: row => row.poId, width:'5%'},
		{name: 'Tgl', selector: row => row.date, width:'15%', format: row => printDate(row.date)},
		{name: 'Sub-Total', selector: row => row.subTotal, width:'10%', format: row => printRp(row.subTotal)},
		{name: 'Total', selector: row => row.total, width:'10%', format: row => printRp(row.total)},
		{name: 'Vendor', selector: row => row.vendor.vendorName},
		{name: 'PDF', selector: row => <p className="cursor-pointer hover:text-slate-400" onClick={()=>{setOpen(true);setContentPrint(row)}}>Export PDF</p>}
	]





    return(
        <>
		<div className="m-4">
			<h2 className="text-2xl font-medium my-3">Report</h2>
			<div className='flex flex-row gap-x-2 my-3 items-center'>
				<button
					type="button"
					// onClick={()=>{setOpen(true);setOnEdit(false);setDataTambah(form)}}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Penjualan
				</button>
				<button
					type="button"
					// onClick={()=>{setOpen(true);setOnEdit(false);setDataTambah(form)}}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Purchase Order
				</button>
			</div>
			{
				penjualan?null:
				<DataTable columns={columns} data={poList}
					pagination
				/>
			}
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
					<ComponentToPrint content={contentPrint} ref={componentRef} />
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