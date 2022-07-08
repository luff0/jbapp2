import React, { useEffect, useState } from 'react'
import { printRp } from '../helpers'
import DataTable from 'react-data-table-component';

const BestSeller = ({dataSales}) => {
  const [dataBS, setDataBS] = useState([])
  const [xDataBS, setXDataBS] = useState([])

  const setXDBSfun = () => {
    let data = []
    dataSales.forEach(e=>{
      e.itemList.forEach(f=>{
        data.push(f)
      })
    })
    setXDataBS(data)
  }

  useEffect(()=>{
    let data = []
    xDataBS.forEach(e =>{
      if(data.length === 0){
        data.push(e)
      }else{
        let finder = [false,-1]
        data.forEach((f,i)=>{
          if (Object.values(data[i]).indexOf(e.itemName) > -1) {
            finder[0] = true
            finder[1] = i
          }
        })
        if(finder[0]){
          data[finder[1]].qty = data[finder[1]].qty + e.qty
        }else{
          data.push(e)
        }
      }
    })
    data = data.map(e => {
      let margin = parseInt(e.total) - (parseInt(e.costAmount * e.qty))
      return {...e, ...{margin:margin}}
    })
    data.sort((a,b)=> b.qty - a.qty)
    setDataBS(data.slice(0,10))
    console.log(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[xDataBS])
  
  useEffect(()=>{
    setXDBSfun()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataSales])

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