import React, { useEffect, Fragment, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
// import { printRp } from '../helpers'
// import myAxios from '../helpers/Request';
import {useSelector} from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { printRp } from '../helpers';

const CreatePO = () => {
	const [poList, setPoList] = React.useState([])
	const [filterText, setFilterText] = React.useState('');
	const [open, setOpen] = useState(false)
 	const cancelButtonRef = useRef(null)
	let dataLibrary = useSelector(state => state.ProductListReducer)

	const [filteredItems, setFilteredItems] = React.useState([])
	useEffect(()=>{
		setFilteredItems(dataLibrary.slice(0,10))
	},[dataLibrary])

	// const printDate = (x) => {
	// 	var d = new Date(x);
	// 	var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();
	// 	return datestring
	// }

	useEffect(()=>{
		let filterData = dataLibrary.filter(
			item => item.itemName && item.itemName.toLowerCase().includes(filterText.toLowerCase()),
		);
		filterData = filterData.concat(dataLibrary.slice(0,10))
		setFilteredItems(filterData.slice(0,10))
		//eslint-disable-next-line
	},[filterText])


	const selectedRow = (row) => {
		let d = row.selectedRows.map(e => {
			e.qty = 0
			return e
		})
		setPoList(d)
	}

	const columns2 = [
		{name: 'Produk', selector: row => row.itemName},
	]

	return(
		<div className="m-4">
			<h2 className="text-2xl font-medium my-3">Purchase Order</h2>
			<div className='flex flex-row gap-x-2 my-3 items-center'>
				<button
					type="button"
					onClick={()=>setOpen(true)}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Tambah Produk
				</button>
			</div>
			<table className="w-full">
					<thead>
						<tr>
							<th className="text-left text-xs py-2">Produk</th>
							<th className="text-left text-xs py-2">Cost Amount</th>
							<th className="text-left text-xs py-2">Qty</th>
							<th className="text-left text-xs py-2">Total</th>
						</tr>
					</thead>
					<tbody>
						{
							poList.map((e,i) => (
								<tr key={i} className='text-xs'>
									<td className='py-2 w-1/4'>{e.itemName}</td>
									<td className='py-2 w-1/6'>
										<div className="mt-1 relative rounded-md shadow-sm">
											<input value={e.costAmount} onChange={(e)=>setFilterText(e.target.value)} type="number" name="price" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-3 sm:text-sm border-gray-300 rounded-md"></input>
										</div>
									</td>
									<td className='py-2 w-1/12'>
										<div className="mt-1 relative rounded-md shadow-sm">
											<input value={e.qty} onChange={(e)=>setFilterText(e.target.value)} type="number" name="price" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-3 sm:text-sm border-gray-300 rounded-md"></input>
										</div>
									</td>
									<td className='py-2'>{printRp(e.total)}</td>
								</tr>
							))
						}
					</tbody>
				</table>
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
                  <div className="sm:flex w sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="mt-2">
						<div className="mt-1 relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<span className="text-gray-500 sm:text-sm">
									Search
								</span>
							</div>
							<input onChange={(e)=>setFilterText(e.target.value)} type="text" name="price" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 pr-12 sm:text-sm border-gray-300 rounded-md"></input>
						</div>
						<DataTable columns={columns2} data={filteredItems}
							selectableRows
							onSelectedRowsChange = {selectedRow}
							highlightOnHover
						/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
		</div>
	)
}

export default CreatePO