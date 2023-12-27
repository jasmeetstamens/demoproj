import React from 'react'
import { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';




function View() {
  const[row,setRow] = useState([])


  useEffect(() => {
    const keys = Object.keys(localStorage);

    const userData = keys.filter((key) => key.startsWith('key_'))
                                            .map((key) => JSON.parse(localStorage.getItem(key)));
                 
    setRow(userData.map((data, index) => ({ id: index + 1, ...data })));
  }, []);




            

const columns = [
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'fluid', headerName: 'fluidtype', width: 150 },
    {field: 'water', headerName: 'water', width: 150},
    { field: 'temp', headerName: 'temprature', width: 150 },
    { field: 'zfactor', headerName: 'z-factor', width: 150 },
    { field: 'volume', headerName: 'volume', width: 150 },
    { field: 'density', headerName: 'density', width: 150 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value} 
          alt={`Image ${params.row.id}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ),
    },
];



  return (

  <div style={{ height: '100%', width: '100%', marginTop: 15, marginLeft:5}}>
  <DataGrid rows={row} columns={columns} />
</div> 
)
   

  
}

export default View;
