import React from 'react';
import './inputsnavigation.css';
import '../pages/fluidtype';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';


function Inputsnavigation(props) {


  let navigate = useNavigate();



  const handleCreate =()=>{
      navigate('/create')
  }

  const handleFluid =()=>{
    navigate('/fluidtype')
}

const handleView =()=>{
  navigate('/view')
}


const handleSave = (e)=>{
  // e.preventdefault();
 props.setSavedata(true);
 alert('info saved')
  
}

const handleUserdetail = (e) =>{
  navigate('/details')
}

  return (
    <div className='mainnav'>
    
       <h1>Inputs</h1>
      <button className='btni' onClick={handleFluid}>fluidtypes</button><br/>
      <button className='btni' onClick={handleCreate}>create</button><br/>
      <button className='btni' onClick={handleView}>View</button><br/>
      <button className='btni' onClick={handleSave} >save</button><br/>
      <button className='btni' onClick={handleUserdetail}>UserDetails</button><br/>
      
    </div>
  )
}

export default Inputsnavigation;
