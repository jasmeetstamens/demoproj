
import './App.css';
import Fluidtype from './pages/fluidtype';
import Inputsnavigation from './components/inputsnavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './pages/create';
import View from './pages/view';
import { useState } from 'react';
import Signup from './pages/signup';
import Login from './pages/login';



function App() {
  const [savedata, setSavedata] = useState(false);
  const [login, setLogin]  = useState(false);
  const [loginusername, setLoginusername] = useState('');

  return (  


  login ? 
      ( <div className="App">  
         <BrowserRouter> 
         
        <div className='left' >
          <Inputsnavigation
            setSavedata={setSavedata} />
        </div>
        <div className='right'>
        <Routes>
          <Route path='/view' element={<View />} />
          <Route path='/create' element={<Create />} />
          <Route path='/fluidtype' element={<Fluidtype savedata={savedata} setSavedata={setSavedata} loginusername={loginusername}/>} />
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
          
             </Routes>
          </BrowserRouter>
          </div>
        )

      

      
  );
}

export default App;
