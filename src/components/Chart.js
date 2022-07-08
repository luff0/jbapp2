import React, { useEffect, useState } from 'react'
import ReactApexCharts from 'react-apexcharts'


const ChartLook = ({dataSales}) => {
  useEffect(()=>{
  },[dataSales])

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
    console.log(month)
    return month
  }

  getXAxisMonth()


  const [series, setSeries] = useState([{
        name: "Penjualan",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148,69, 91, 148]
    }]
  )
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
    <ReactApexCharts options={options} series={series} type="line" height={350} />
  )
}

export default ChartLook