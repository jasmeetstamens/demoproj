
import React, { useState} from 'react';
import './emailpopup.css';
import emailjs from 'emailjs-com';




function Emailpopup(prop) {
   
            const[email, setEmail] = useState();
  
          
     const sendEmail = ()=>{

      if (!email) {
        alert('Please enter a valid email address.');
        return;
      }

    var templateParams = {
      to_name: 'Jass',
      from_name: 'j',
      message : 'Check this out!',
      to_email: email,
  };
   
  emailjs.send('service_zlb1cod', 'template_rk1crtc', templateParams, '0n22i0KLQ0h3yJwYm')
      .then(function(response) {
        alert('Email sent successfully!');
        prop.setShowpopup(false);
      }, function(error) {
         console.log('FAILED...', error);
      });


     }     

          //       const emailJsConfig = {
          //         user_id: '_CzvcremTQcGhkVYP',
          //       };
          //     emailjs.init(emailJsConfig);
            
          //   const sendEmail = async (e) => {
          //     try{
          //     const templateParams = {
          //       to_name: 'Jass',
          //       from_name: 'j',
          //       message: 'Hello, this is a test email!',
          //     };
          
          // await  emailjs.send('service_5u9qa2h', 'template_rk1crtc', templateParams)
          //       .then((response) => {
          //         console.log('Email sent successfully:', response);
          //       })
          //     }catch( error){
          //         console.error('Email failed to send:', error);
          //       };
           
          //   };

const handleEmail =(e) =>{
    setEmail(e.target.value);
}


const handlecancel=()=>{
    prop.setCancelbtn(true);
    prop.setShowpopup(false);
 
}

  // const  handlelink =  ()=>{
  //   if(email){
  //     sendEmail();
  //   //  console.log('mail send');
  //   prop.setShowpopup(false);
  //   }else{
  //       console.log('enter correct mail');
  //   }
  // }


  return (

<div className='poppup'>
<input className='mail' placeholder='enter mail here' type='email' onChange={handleEmail}></input>
<button onClick={sendEmail} className='linkbtn'>Send Link</button>

<button onClick={handlecancel} className='cancellbtn'>cancel</button>
</div>

  )
}

export default Emailpopup;
