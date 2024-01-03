
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom'; 
import { DataGrid } from '@mui/x-data-grid';



function Api() {
  
       const [data, setData] = useState([])
      const{page=10, pageSize=10} = useParams() 
  const[row, setRow] = useState([])

 useEffect(()=>{ 

    const fetchdata = async ()=>{
        try{
  const response = await  fetch(`http://122.176.101.76:8082/api/SampleMarkets/GetAllSampleMarketsMobile?pageNumber=${page}&pageSize=${pageSize}`)
  const data = await response.json();
  setData(data.records);
} catch (error) {
  console.error('Error fetching data:', error);
} 
    }
    fetchdata();
 },[page, pageSize])

 useEffect(() => {      
  if (data.length > 0 ) {           
  setRow(data.map((item, index) => ({ id: index+1, ...item })));
  }
}, [data]);


const columns = [
  { field: 'id', headerName: 'id', width: 150 },
  { field: 'productName', headerName: 'productName', width: 150 },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (e) => {
      const imageUrl = `data:image/jpeg;base64, ${e.row.productImageNameBase64}`
      return(
        <img
          src={imageUrl}
          alt={`Image ${e.row.id}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        /> )
    }
  },
];



  return (
    <div style={{ height: '100%', width: '100%', marginTop: 15, marginLeft:5}}>
        
  {data.length===0 ? (<div className='loading' ><h1><CircularProgress /></h1></div>) :(
  <DataGrid rows={row} columns={columns} hideFooter={true} />
)}
       
    </div>
  )
}

export default Api;
