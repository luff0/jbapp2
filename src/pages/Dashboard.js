import React from 'react'
import {BestSeller, CardDashboard, ChartLook, DatePicker} from '../components'
import {useSelector} from 'react-redux'


const Dashboard = () => {
	const dataSales = useSelector(state=>state.DataSalesReducer)

	return(
		<div className="dashboard">
			<div className="col-start-8">
				<CardDashboard dataSales={dataSales}/>
			</div>
			{/* <Container fluid>
				<Row>
					<Col md={8}>
						<section className="card-dashbord">
							<CardDashboard dataSales={dataSales}/>
						</section>
						<section className="cart">
							<ChartLook dataSales={dataSales}/>
						</section>
						<section className="best-seller">
							<h4>Best Seller</h4>
							<BestSeller dataSales={dataSales}/>
						</section>
					</Col>
					<Col md="auto">
						<section className="date-picker">
							<DatePicker/>
						</section>
					</Col>
				</Row>
			</Container> */}
		</div>
	)
}

export default Dashboard