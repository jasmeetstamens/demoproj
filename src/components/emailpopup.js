
import React, { useState} from 'react';
import './emailpopup.css';
import emailjs from 'emailjs-com';




function Emailpopup(prop) {
   
            const[email, setEmail] = useState();
  
          
     const sendEmail = ()=>{

      var data = {
        service_id: 'service_5u9qa2h',
        template_id: 'template_rk1crtc',
        user_id: '_CzvcremTQcGhkVYP',
        template_params: {
          to_name: 'Jass',
                from_name: 'j',
                message: 'Hello, this is a test email!',
        }
    };

      fetch('https://api.emailjs.com/api/v1.0/email/send',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            alert('Your mail is sent!');
        })
        .catch(error => {
            alert(error);
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
