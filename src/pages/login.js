import React, { useEffect, useState } from 'react'
import { TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Emailpopup from '../components/emailpopup';



function Login(props) { 
   const [uname, setUname] = useState("")
   const [cpass, setPass]= useState("")
  const[forgot, setForgot] = useState(false)
const [showpopup, setShowpopup] =useState(false)
const[cancelbtn, setCancelbtn] =useState(false)



   const userKey = `user_${uname}`; 

   let navigate = useNavigate();

   const handleName = (e) =>{
      setUname(e.target.value)
   }
   const handlePass = (e) =>{
    setPass(e.target.value)
   }

   const handleLogin= () =>{
    const stored = JSON.parse(localStorage.getItem(userKey));
      if(cpass=== stored.cpass && uname === stored.uname)
       { 
        localStorage.setItem('isLoggedIn', 'true');
        props.setLogin(true);
      navigate("/view")
        props.setLoginusername(userKey);
       }
       else
       {
        alert("username or password wrong")
       }          
   }

   useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      props.setLogin(true);
    }
  }, []);

const handleSignup =()=>{
  navigate("/")
}

const handleforgot =()=>{
  setForgot(true);
}

useEffect(()=>{
  if(forgot){
    setShowpopup(true);
    setForgot(false);
  }else if(cancelbtn){
    setShowpopup(false);
    setCancelbtn(false);   
    setForgot(false);
  }
}, [forgot,])

  

  return (
<>
    <div className='emailpop'>
    {showpopup?    
    <Emailpopup setShowpopup={setShowpopup} setForgot={setForgot} setCancelbtn={setCancelbtn} />
     :
    null
        } 
</div> 
    
{showpopup ? (
   <div className="login-form" >

   <h1>Login Here</h1>
 <TextField label="Username" className='text' variant="outlined" fullWidth onChange={handleName} disabled/>
 <TextField label="Password" className='text' type="password" variant="outlined" fullWidth onChange={handlePass} disabled/>
<p onClick={handleforgot} style={{margin: 0,padding: 0, cursor: 'pointer', color:'blue'}} disabled>Forgot password?</p>
 <Button variant="contained" className='btn'  color="primary" onClick={handleLogin} disabled>Login</Button>
 <Button variant="contained" className='btn' color="primary" onClick={handleSignup}  disabled>SignUp First</Button>

</div> 
) : (
  <div className="login-form">

  <h1>Login Here</h1>
<TextField label="Username" className='text' variant="outlined" fullWidth onChange={handleName}/>
<TextField label="Password" className='text' type="password" variant="outlined" fullWidth onChange={handlePass}/>
<p onClick={handleforgot} style={{margin: 0,padding: 0, cursor: 'pointer', color:'blue'}}>Forgot password?</p>
<Button variant="contained" className='btn'  color="primary" onClick={handleLogin}>Login</Button>
<Button variant="contained" className='btn' color="primary" onClick={handleSignup}>SignUp First</Button>

</div> 
) }
   
</>
  )
}

export default Login;





