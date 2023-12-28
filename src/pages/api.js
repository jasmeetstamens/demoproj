
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';



function Api() {
       const [data, setData] = useState([])

 useEffect(()=>{ 
    const fetchdata = async ()=>{
        try{
  const response = await  fetch('http://122.176.101.76:8082/api/SampleMarkets/GetAllSampleMarketsMobile?pageNumber=1&pageSize=8')
    const data = response.json()
    setData(data)
}catch(error){
    console.log(error);
}
    }

    fetchdata();
   return ()=>{}
 },[data])


  return (
    <div>
  {data.length===0 ? <div className='loading' ><h1><CircularProgress /></h1></div> : <> <h1>data: </h1><ul>
              {data.map((e) => (
             <li key={e.id}>{e.id}-{e.productName}</li>
              ))}
            </ul></>}
    </div>
  )
}

export default Api;
