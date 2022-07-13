import React, {useEffect, useState} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range'
import myAxios from '../helpers/Request'
import {useDispatch} from 'react-redux'
const DatePicker = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  useEffect(()=>{
    let start = `${state[0].startDate.getFullYear()}-${state[0].startDate.getMonth()+1}-${state[0].startDate.getDate()}`
    let dateEnd = JSON.parse(JSON.stringify(state[0]))
    dateEnd = new Date(dateEnd.endDate)
    dateEnd.setDate(dateEnd.getDate()+1)
    let end = `${dateEnd.getFullYear()}-${dateEnd.getMonth()+1}-${dateEnd.getDate()}`
    myAxios.post("/sales/getallbytime",{start,end})
    .then(res=>{
      if(res.data.status === 'success'){
        dispatch({
          type:'SET_DATA_SALES',
          data:{dataSales:res.data.dataSales, trigger:(Math.random() + 1).toString(36).substring(7)}
        })
      }
    })
    .catch(err=>console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state])
  
  return(
    <DateRange
      editableDateInputs={true}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  )
}

export default DatePicker