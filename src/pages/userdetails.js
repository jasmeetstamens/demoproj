import React, { useState } from 'react'
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {TextField} from '@mui/material';
import { Button } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';

function Userdetails() {
        const[data, setData] = useState([])
        const [row, setRow] = useState([])
    const[userdata, setUserdata]=useState('')
const [getdata, setGetdata] = useState(false)
const [getalluser, setGetalluser] =useState(false)

const user =  useParams()
const apiId = localStorage.getItem('apiId')

    let navigate = useNavigate()



    useEffect(()=>{ 
        const fetchdata = async ()=>{
            try{
      const response = await  fetch(`http://122.176.101.76:8082/api/Users/SearchUserWithRoles?searchTerm=${user}`)
      const data = await response.json();
      } catch (error) {
      console.error('Error fetching data:', error);
      } 
        }
        fetchdata();
      },[user])
      

        useEffect(()=>{ 

            const fetchdata = async ()=>{
                try{
          const response = await  fetch(`http://122.176.101.76:8082/api/Users/SearchUserWithRoles?searchTerm=${userdata}`)
          const data = await response.json();
          setData(data);
          } catch (error) {
          console.error('Error fetching data:', error);
          } 
            }
            if(getdata){
                fetchdata(getdata);
            setGetdata(false)
            }
             if(getalluser){
                fetchdata(getalluser)
                setGetalluser(false);
            }
           
          },[getdata,getalluser])
          


    useEffect(() => {      
        if (data && data.length > 0) {         
        setRow(data.map((item, index) => 
        ({id: index+1,code: item.code.toLowerCase(), name: item.name, designation :item.designation })));
        }
      }, [data]);
      
      
      const columns = [
        { field: 'id', headerName: 'id', width: 150 },
        { field: 'code', headerName: 'user', width: 150 },
        { field: 'name', headerName: 'name', width: 150 },
        { field: 'designation', headerName: 'Designation', width: 150 },

      ];
      

const handleUserdata=(e)=>{
    setUserdata(e.target.value); 
} 

const handleGetdata = () =>{
    if(userdata){
        setGetdata(userdata);
        navigate(`/details/${userdata}`)
    }else{
        alert('Enter user')
    }
   
}

const handleAlluser=()=>{
 setGetalluser(true)
    setUserdata("")
   }

   useEffect(()=>{
    if(!userdata){
    navigate(`/details/${apiId}`)
    }
   },[apiId, navigate])

  return (
    <div style={{ height: '100%', width: '100%', marginTop: 15, marginLeft:5}}>

<TextField type='text' label="user" variant="outlined" style={{width: '150px', marginBottom: '10px'}}
 className='text'  onChange={handleUserdata} required></TextField> 
<Button type="submit" variant="contained" color="primary" style={{width:'100px', marginBottom:'10px', marginLeft:'10px'}} onClick={handleGetdata} >Get Data</Button>
<Button type="submit" variant="contained" color="primary" style={{width:'100px', marginBottom:'10px', marginLeft:'10px'}} onClick={handleAlluser}>Get Allusers</Button>

<DataGrid rows={row} columns={columns} hideFooter={true} style={{maxHeight: '70%'}}/>
  </div>
  )
}

export default Userdetails;
