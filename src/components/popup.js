import React, { useState } from 'react';
import './popup.css';


function Popup(prop) {
        const[cancel,setCancel]=useState(); 

const handlecancel=()=>{
    setCancel(false)
}
  const  resize = ()=>{
    prop.setResize(true);
    }

  return (

<div className='popup'>
<p className='ppop'>size is greater than 1024*1024</p>
<button onClick={resize} className='popbtn'>Update Size</button>

<button onClick={handlecancel} className='cancelbtn'>cancel</button>
</div>

  )
}

export default Popup;
