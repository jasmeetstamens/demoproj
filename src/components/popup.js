import React, { useState } from 'react';
import './popup.css';


function Popup(prop) {

const handlecancel=()=>{
    prop.setCancelbtn(true);
    prop.setShowpopup(false);
}

  const  handleresize = ()=>{
    prop.setUpdatebtn(true)
  }

  return (

<div className='popup'>
<p className='ppop'>size is greater than 1024*1024</p>
<button onClick={handleresize}  className='popbtn'>Update Size</button>

<button onClick={handlecancel} className='cancelbtn'>cancel</button>
</div>

  )
}

export default Popup;
