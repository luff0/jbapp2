import React, { useEffect } from 'react'
import {CardDashboard, DatePicker, ChartLook, BestSeller} from '../components'
import {useSelector} from 'react-redux'
import myAxios from '../helpers/Request'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
	const navigate = useNavigate()
	useEffect(()=>{
		myAxios.get('/users/cookie')
		.then(res => {
			if(!res.data.cookie){
			  navigate('/login')
			}
		})
		.catch(err => console.log(err))
	})
	const dataSales = useSelector(state=>state.DataSalesReducer)

	return(
		<div className="grid grid-cols-3 gap-4 m-4">
			<div className="col-span-2">
				<CardDashboard dataSales={dataSales}/>
				<ChartLook dataSales={dataSales}/>
				<div>
					<h4>Best Seller</h4>
					<BestSeller dataSales={dataSales}/>
				</div>
			</div>
			<div>
				<DatePicker/>
			</div>
		</div>
	)
}

export default Dashboard