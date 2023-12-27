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

  return (
    <div>
    
       <h1>Inputs</h1>
      <button className='btn' onClick={handleFluid}>fluidtypes</button><br/>
      <button className='btn' onClick={handleCreate}>create</button><br/>
      <button className='btn' onClick={handleView}>View</button><br/>
      <button className='btn' onClick={handleSave} >save</button><br/>
      
    </div>
  )
}

export default Inputsnavigation;
