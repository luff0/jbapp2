import React, { useEffect, useState } from 'react'
import {printRp} from '../helpers'

const CardDashboard = ({dataSales}) => {
    const [earnings, setEarnings] = useState(0)
    const [margin, setMargin] = useState(0)
    const [transaction, setTransaction] = useState(0)
    const [itemSold, setItemSold] = useState(0)
    
    useEffect(()=>{
        //Earnings counting
        let totalEarnings = 0
        dataSales.forEach(e=>{
            e.itemList.forEach(f=>{
                totalEarnings = totalEarnings + parseInt(f.total)
            })
        })
        setEarnings(totalEarnings)

        //SET MARGIN
        let totalMargin = 0
        dataSales.forEach(e=>{
            e.itemList.forEach(f=>{
                let marginItem = (parseInt(f.price) - parseInt(f.costAmount)) * f.qty
                totalMargin = totalMargin + marginItem
            })
        })
        setMargin(totalMargin)

        //SET TRANSACTION
        setTransaction(dataSales.length)

        //SET ITEM SOLD
        let totalItemSold = 0
        dataSales.forEach(e=>{
            e.itemList.forEach(f=>{
                totalItemSold = totalItemSold + parseInt(f.qty)
            })
        })
        setItemSold(totalItemSold)
    },[dataSales])
    
    return(
        <div className=''>
            <div className="border p-3">
                <h3>{printRp(earnings)}</h3>
            </div>
        </div>
        // <Card.Title>{printRp(earnings)}</Card.Title>
        // <Card.Title>{printRp(margin)}</Card.Title>
        // <Card.Title>{transaction}</Card.Title>
        // <Card.Title>{itemSold}</Card.Title>
    )
}

export default CardDashboard