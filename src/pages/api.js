
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';



function Api() {
       const [data, setData] = useState([])

//  useEffect(()=>{ 
  
//     const fetchdata = async ()=>{
//         try{
//   const response = await  fetch('http://122.176.101.76:8082/api/SampleMarkets/GetAllSampleMarketsMobile?pageNumber=1&pageSize=8')
//   const data = await response.json();
//   setData(data);
// } catch (error) {
//   console.error('Error fetching data:', error);
// } 
//     }
//     fetchdata();
//  },[])


  return (
    <div>
  {data.length===0 ? <div className='loading' ><h1><CircularProgress /></h1></div> :<ul>
              {data.map((e) => (
             <li key={e.id}>{e.id}</li>
              ))}
            </ul>}
    </div>
  )
}

export default Api;
