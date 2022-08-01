import React from 'react'
import { printRp } from '../helpers';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const printDate = (x) => {
		var d = new Date(x);
		var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
		return datestring
		// 16-5-2015 9:50
	}
    return (
      <div ref={ref}>
          <div className='m-10'>
            <div className="text-xs my-4">
                <p className='my-2'>Tanggal: {printDate(props.content.date)}</p>
                <p className='my-2'>Suplier: {props.content.vendor.vendorName}</p>
            </div>
            <table className="w-full border-collapse border border-slate-300">
                <thead>
                    <tr>
                        <th className="text-left text-xs p-2 border">No.</th>
                        <th className="text-left text-xs p-2 border">Produk</th>
                        <th className="text-left text-xs p-2 border">Cost Amount</th>
                        <th className="text-left text-xs p-2 border">Qty</th>
                        <th className="text-left text-xs p-2 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.content.productList.map((e, i) => (
                            <tr key={i} className='text-xs'>
                                <td className='border p-2'>{i+1}</td>
                                <td className='border p-2'>{e.itemName}</td>
                                <td className='border p-2'>{printRp(e.costAmount)}</td>
                                <td className='border p-2'>{e.qty}</td>
                                <td className='border p-2'>{printRp(e.total)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='flex flex-row text-xs my-5'>
                <div className='mr-10'>
                    <p className='my-2'>Pajak</p>
                    <p className='my-2'>Pengiriman</p>
                    <p className='my-2'>Lainnya</p>
                    <p className='my-2'>Sub-Total</p>
                    <p className='my-2'>Total</p>

                </div>
                <div className='mx-10'>
                    <p className='my-2'>{printRp(props.content.tax)}</p>
                    <p className='my-2'>{printRp(props.content.shipping)}</p>
                    <p className='my-2'>{printRp(props.content.other)}</p>
                    <p className='my-2'>{printRp(props.content.subTotal)}</p>
                    <p className='my-2'>{printRp(props.content.total)}</p>
                </div>
            </div>
        </div>
      </div>
    );
  });