import React, { useEffect, useState } from 'react'
import ReactApexCharts from 'react-apexcharts'
import myAxios from '../helpers/Request'


const ChartLook = () => {
  let start = new Date()
  start.setDate(start.getDate() - 11)
  let startChart = `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`
  
  let end  = new Date()
  end.setDate(end.getDate() + 1)
  let endChart = `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`
  useEffect(()=>{
    myAxios.post("/sales/getallbytime",{start:startChart,end:endChart})
    .then(res=>{
      let salesChart = new Array(getXAxisDays().length).fill(0)
      if(res.data.status === 'success'){
        console.log(res.data.dataSales)
        let xDate = new Date(res.data.dataSales[0].created_date).getDate()
        let totalSales = 0
        res.data.dataSales.forEach(sales => {
          let created = new Date(sales.created_date)
          if(created.getDate() !== xDate){
            salesChart[getXAxisDays().findIndex(x => x === xDate)] = totalSales
            xDate = created.getDate()
            totalSales = 0
          }
          sales.itemList.forEach(item => {
            totalSales = totalSales + item.qty
          })
        })
        salesChart[getXAxisDays().findIndex(x => x === xDate)] = totalSales
        setSeries([{
          name: "Penjualan",
          data: salesChart
        }])
      }
    })
    .catch(err=>console.log(err))
    // eslint-disable-next-line
  },[])


  const getXAxisDays = () => {
    const now = new Date();
    let dates = []
    let i = 11
    while (i >= 0) {
      dates.push(new Date(now.getFullYear(), now.getMonth(), now.getDate() - i).getDate());
      i--;
    } 
    return dates
  }
  // const getXAxisWeeks = () => {
  //   const now = new Date();
  //   let weeks = []
  //   let i = 11
  //   while (i >= 0) {
  //     weeks.push(new Date(now.getFullYear(), now.getMonth(), now.getDate() - i).getDate());
  //     i--;
  //   } 
  //   return weeks
  // }
  const getXAxisMonth = () => {
    const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // let name = month[d.getMonth()];
    const now = new Date();
    let month = []
    let i = 11
    while (i >= 0) {
      month.push(monthList[new Date(now.getFullYear(), now.getMonth() - i).getMonth()]);
      i--;
    } 
    // console.log(month)
    return month
  }

  getXAxisMonth()


  //eslint-disable-next-line
  const [series, setSeries] = useState([{
        name: "Penjualan",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148,69, 91, 148]
    }]
  )
  //eslint-disable-next-line
  const [options, setOptions] = useState({
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Selling Trends by Days',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: getXAxisDays(),
      }
    })

  return(
    <div className='mb-6'>
      <ReactApexCharts options={options} series={series} type="line" height={350} />
    </div>
  )
}

export default ChartLook