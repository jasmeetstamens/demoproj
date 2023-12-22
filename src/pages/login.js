import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';


function Login(props) { 
   const [uname, setUname] = useState("")
   const [cpass, setPass]= useState("")


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
        props.setLogin(true);
      navigate("/view")
        props.setLoginusername(userKey);
       }
       else
       {
        alert("username or password wrong")
       }
          
   }

const handleSignup =()=>{
  navigate("/")
}

const handledatagrid = ()=>{
  navigate('/datagrid')
}
  
  return (
    <div className="login-form">
      <h1>Login Here</h1>
    <TextField label="Username" variant="outlined" fullWidth onChange={handleName}/>
    <TextField label="Password" type="password" variant="outlined" fullWidth onChange={handlePass}/>
    <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
    <Button variant="contained" color="primary" onClick={handleSignup}>SignUp First</Button>
    <Button variant="contained" color="primary" onClick={handledatagrid}>Username/Passwords</Button>
</div>
  )
}

export default Login;





