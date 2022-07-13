import React, { useEffect, useState } from 'react'
import { printRp } from '../helpers'
import DataTable from 'react-data-table-component';

const BestSeller = ({dataSales}) => {
  const [dataBS, setDataBS] = useState([])

  useEffect(()=>{
    let data = []
    try {
      dataSales.dataSales.forEach(e =>{
        e.itemList.forEach((item)=>{
          if(data.length === 0){
            data.push(item)
          }else{
            let finder = [false,-1]
            data.forEach((f,i)=>{
              if (Object.values(data[i]).indexOf(item.itemName) > -1) {
                finder[0] = true
                finder[1] = i
              }
            })
            if(finder[0]){
              data[finder[1]].qty = data[finder[1]].qty + item.qty
            }else{
              data.push(item)
            }
          }
        })
      })
      data = data.map(d => {
        d.margin = (parseInt(d.price) * parseInt(d.qty)) - (parseInt(d.costAmount) * parseInt(d.qty))
        d.total = parseInt(d.price) * parseInt(d.qty)
        return d
      })
      data.sort((a,b)=> b.qty - a.qty)
      setDataBS(data.slice(0,10))
    }
    catch(err) {

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataSales.trigger])

  const columns = [
    {name:'Produk', selector: r => r.itemName},
    {name:'Terjual', selector: r => r.qty},
    {name:'Total', selector: r => r.total, format: r => printRp(r.total)},
    {name:'Margin', selector: r => r.margin, format: r => printRp(r.margin)},
  ]
  
  return(
    <DataTable columns={columns} data={dataBS}
      highlightOnHover
    />
  )
}

export default BestSeller