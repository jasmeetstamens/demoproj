
import React, { useState } from 'react';
import './emailpopup.css';


function Emailpopup(prop) {
            const[link, setLink] =useState();
            const[email, setEmail] = useState();



            

const handleEmail =(e) =>{
    setEmail(e.target.value);
}


const handlecancel=()=>{
    prop.setCancelbtn(true);
    prop.setShowpopup(false);
 
}

  const  handlelink = ()=>{
    if(email){
        console.log('link send'); 
    prop.setShowpopup(false);
    }else{
        console.log('enter correct mail');
    }
  }


  return (

<div className='poppup'>
{/* <input className='uname' placeholder='enter uname here' type='text' ></input> */}
<input className='mail' placeholder='enter mail here' type='email' onChange={handleEmail} ></input>
<button onClick={handlelink}  className='linkbtn'>Send Link</button>

<button onClick={handlecancel} className='cancellbtn'>cancel</button>
</div>

  )
}

export default Emailpopup;
