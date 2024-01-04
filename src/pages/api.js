
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom'; 
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'semantic-ui-react';
import {ButtonGroup} from '@mui/material';



function Api() {
  
       const [data, setData] = useState([])
      const{page, pageSize} = useParams() 
  const[row, setRow] = useState([])
  const [counter, setCounter] = useState(parseInt(page) || 1);
  const [count, setCount] = useState(parseInt(pageSize) || 1);
  const navigate = useNavigate() 


 useEffect(()=>{ 

    const fetchdata = async ()=>{
        try{
  const response = await  fetch(`http://122.176.101.76:8082/api/SampleMarkets/GetAllSampleMarketsMobile?pageNumber=${counter}&pageSize=${count}`)
  const data = await response.json();
  setData(data.records );
} catch (error) {
  console.error('Error fetching data:', error);
} 
    }
    fetchdata();
 },[counter, count])

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

useEffect(()=>{
navigate(`/api/${counter}/${count}`)
},[counter, count])


  return (
    <div style={{ height: '100%', width: '100%', marginTop: 15, marginLeft:5}}>
        
  {data.length===0 ? (<div className='loading' ><h1><CircularProgress /></h1></div>) :(
    <>
  <DataGrid rows={row} columns={columns} hideFooter={true} />


<ButtonGroup size="small" aria-label="small outlined button group"> 
  <Button 
     onClick={()=>{ setCounter((counter) => counter + 1)}}> + </Button>

   <Button >Page {Math.max(counter, 1)}</Button>
   <Button
     onClick={() => {
       setCounter((counter) => Math.max(counter - 1, 1));
     }}
   >
     -
   </Button>

 </ButtonGroup>



 <ButtonGroup size="small" aria-label="small outlined button group" style={{marginLeft: '10px'}}> 
  <Button  
     onClick={() => {setCount((count) => count + 1)}}> + </Button>

   <Button>PageSize {count}</Button>
   <Button
     onClick={() => {
       setCount((count) => count - 1);
     }}
   >
     -
   </Button>
   
 </ButtonGroup>


</>
)}
       
    </div>
  )
}

export default Api;
