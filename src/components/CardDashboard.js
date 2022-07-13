import React, { useEffect, useState } from 'react'
import {printRp} from '../helpers'

const CardDashboard = ({dataSales}) => {
    const [earnings, setEarnings] = useState(0)
    const [margin, setMargin] = useState(0)
    const [transaction, setTransaction] = useState(0)
    const [itemSold, setItemSold] = useState(0)
    
    useEffect(()=>{
        if(dataSales.dataSales){
            //Earnings counting
            let totalEarnings = 0
            dataSales.dataSales.forEach(e=>{
                e.itemList.forEach(f=>{
                    totalEarnings = totalEarnings + parseInt(f.total)
                })
            })
            setEarnings(totalEarnings)
    
            //SET MARGIN
            let totalMargin = 0
            dataSales.dataSales.forEach(e=>{
                e.itemList.forEach(f=>{
                    let marginItem = (parseInt(f.price) - parseInt(f.costAmount)) * f.qty
                    totalMargin = totalMargin + marginItem
                })
            })
            setMargin(totalMargin)
    
            //SET TRANSACTION
            setTransaction(dataSales.dataSales.length)
    
            //SET ITEM SOLD
            let totalItemSold = 0
            dataSales.dataSales.forEach(e=>{
                e.itemList.forEach(f=>{
                    totalItemSold = totalItemSold + parseInt(f.qty)
                })
            })
            setItemSold(totalItemSold)
        }
        // eslint-disable-next-line
    },[dataSales.trigger])
    
    return(
        <div className='grid grid-cols-4 gap-3 mb-6'>
            <div className="border rounded-xl">
                <h4 className="bg-slate-200 p-2 rounded-t-xl">Earnings</h4>
                <h3 className='p-4'>{printRp(earnings)}</h3>
            </div>
            <div className="border rounded-xl">
                <h4 className="bg-slate-200 p-2 rounded-t-xl">Margin</h4>
                <h3 className='p-4'>{printRp(margin)}</h3>
            </div>
            <div className="border rounded-xl">
                <h4 className="bg-slate-200 p-2 rounded-t-xl">Transaction</h4>
                <h3 className='p-4'>{transaction}</h3>
            </div>
            <div className="border rounded-xl">
                <h4 className="bg-slate-200 p-2 rounded-t-xl">Item Sold</h4>
                <h3 className='p-4'>{itemSold}</h3>
            </div>
        </div>
    )
}

export default CardDashboard