
import './App.css';
import Fluidtype from './pages/fluidtype';
import Inputsnavigation from './components/inputsnavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './pages/create';
import View from './pages/view';
import { useState } from 'react';
import Signup from './pages/signup';
import Login from './pages/login';
import Api from './pages/api';
import Userdetails from './pages/userdetails';




function App() {
  const [savedata, setSavedata] = useState(false);
  const [login, setLogin]  = useState(false);
  const [loginusername, setLoginusername] = useState('');

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (  


  login || isLoggedIn ? 
      ( <div className="App">  
         <BrowserRouter> 
         
        <div className='left' >
          <Inputsnavigation
            setSavedata={setSavedata} />
        </div>
        <div className='right'>
        <Routes>
          <Route path='/view/:user?' element={<View />} />
          <Route path='/create/:user?' element={<Create />} />
          <Route path='/fluidtype/:user?' element={<Fluidtype savedata={savedata} setSavedata={setSavedata} loginusername={loginusername}/>} />
          <Route path='/details/:user?' element={<Userdetails/>}/>
        </Routes>
        </div>
        </BrowserRouter>
         </div>
        ) : 

        (
          <div className="or">  
          <BrowserRouter> 
             <Routes>
             <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login setLogin={setLogin} setLoginusername={setLoginusername}/>} />
          <Route path='/api/:page?/:pageSize?' element={<Api/>}/>
     
             </Routes>
          </BrowserRouter>
          </div>
        )

      

      
  );
}

export default App;
