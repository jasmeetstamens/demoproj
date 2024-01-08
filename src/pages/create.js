import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Create() {

  const user = useParams()
let navigate = useNavigate()
const apiId = localStorage.getItem('apiId')

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
 navigate(`/create/${apiId}`)
},[apiId, navigate])

  return (
    <div className='maincreate'>
 <h1>create</h1> 
    </div>
  )
}

export default Create;
