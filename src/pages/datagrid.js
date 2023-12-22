
import React, { useEffect } from 'react';
import {DataGrid} from '@mui/x-data-grid';
import { useState } from 'react';

function Mydatagrid(prop) {
 
  const[row,setRow] =useState([])

  useEffect(() => {
    const keys = Object.keys(localStorage);

    const userData = keys.filter((key) => key.startsWith('user_'))
                                            .map((key) => JSON.parse(localStorage.getItem(key)));
                  console.log(userData);
    setRow(userData.map((data, index) => ({ id: index + 1, ...data })));
  }, []);




            

const columns = [
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'uname', headerName: 'Username', width: 150 },
    { field: 'cpass', headerName: 'Password', width: 150 },
];




  return (

    <div style={{ height: 300, width: '100%'}}>
      <DataGrid rows={row} columns={columns} />

    </div>
  )
}

export default Mydatagrid;
