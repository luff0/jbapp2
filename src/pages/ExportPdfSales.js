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
              <h2 className="text-center font-medium text-xl">Laporan Penjualan</h2>
            <div className="text-xs my-4">
                <p className='my-2'>Tanggal: {printDate(props.content.date)}</p>
                <p className='my-2'>Total: {props.content.total}</p>
            </div>
            <table className="w-full border-collapse border border-slate-300">
                <thead>
                    <tr>
                        <th className="text-left text-xs p-2 border">No.</th>
                        <th className="text-left text-xs p-2 border">Waktu</th>
                        <th className="text-left text-xs p-2 border">Shift</th>
                        <th className="text-left text-xs p-2 border">Item</th>
                        <th className="text-left text-xs p-2 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.content.table.map((e, i) => (
                            <tr key={i} className='text-xs'>
                                <td className='border p-2'>{i+1}</td>
                                <td className='border p-2'>{e.jam}</td>
                                <td className='border p-2'>{e.shift}</td>
                                <td className='border p-2'>{e.itemName}</td>
                                <td className='border p-2'>{printRp(e.total)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      </div>
    );
  });