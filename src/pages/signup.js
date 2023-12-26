import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField,Button} from '@mui/material';
import './signup.css';


function Signup() {

    const [name, setName]= useState("")
  const [uname, setUname] = useState("")
  const [pass, setPass]=useState("")
  const [cpass, setCpass] = useState("") 
  const [data, setData]= useState("")

  
    
  let navigate = useNavigate();

    const handleChangeName = (e)=>{
      setName(e.target.value);
    }

    const handleChangeUname = (e)=>{
        setUname(e.target.value );
    }    
  
    const handleChangePass = (e)=>{
            setPass(e.target.value);
    }
    const handleCpass =(e)=>{
        setCpass(e.target.value)
    }
     


    const handleSignUp = (e) => {
      const userKey = `user_${uname}`; 
      const allusers  = localStorage.getItem(userKey)
      if(uname.includes('@')||uname.includes('_')){  
        if (pass.length<6 && pass.includes('#')){
          alert("for strong password min. length must be 6")
      }else if(pass!==cpass){
      alert("Password not matched");
      }else if(allusers){
        alert("username already exists, enter another username");
        }else{
        
            const usedata=(newdata)=>{
              setData(newdata)
            }
        
            const userData = {
              name: name,
              uname: uname,
              cpass: cpass,
            };
        // localStorage.setItem(`name_${uname}`, name)
        // localStorage.setItem(`uname_${uname}`, uname)
        // localStorage.setItem(`cpass_${uname}`, cpass)
// console.log(userData);f
     localStorage.setItem(userKey, JSON.stringify(userData));
    
        navigate('/Login');     
        

      } }
      else{
        alert('include @ or _ in username')
      } 
  }

 const handleLogin=()=>{
  navigate('/login')
 }



  return ( 

      <div className='main' >

<form onSubmit={handleSignUp}  className='signupform'>
      <h1 >SignUp Here!</h1>

    <TextField type='text' label="Name" variant="outlined" className='text' onChange={handleChangeName} required></TextField> <br/>
    <TextField label="Username" variant="outlined" className='text' onChange={handleChangeUname} required></TextField><br/>
    <TextField type='text' label="password" inputProps={{ maxLength: 12 }} variant="outlined" className='text' onChange={handleChangePass} required></TextField><br/>
    <TextField type='password' label="confirm password" variant="outlined" className='text' onChange={handleCpass} required></TextField><br/>
    <Button type="submit" variant="contained" color="primary" className='btnn' >Confirm</Button><br/>
    <Button variant="contained" color="primary" className='btnn' onClick={handleLogin}> Login page</Button>

    </form>
    </div>



  

  )
  }

export default Signup;

