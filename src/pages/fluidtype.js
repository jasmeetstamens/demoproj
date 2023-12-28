import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { selectClasses } from '@mui/material/Select';
import './fluidtype.css'
import { Button, Checkbox, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { useState } from 'react';
import  Resizer  from 'react-image-file-resizer'; 
import Popup from '../components/popup';



function Fluidtype(props) {

  const [fluid, setFluid] = useState("");
  const [water, setWater] = useState('not checked');
  const [temp, setTemp] = useState();
  const [zfactor, setZfactor] = useState(); 
  const [volume, setVolume] = useState();
  const [density, setDensity] = useState();
  const [imageName, setImageName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageurl, setImageurl] = useState("")
  const [num, setNum] = useState([1]);
  const [updatebtn, setUpdatebtn]= useState(false);
  const [cancelbtn, setCancelbtn] = useState(false);
const [showpopup, setShowpopup] = useState(false);

 

  let data = props.savedata;
  let userKey = props.loginusername;


  const handleFluid = (e) => {
    setFluid(e.target.value)

  }

const handleWater = (e)=>{
  setWater(e.target.checked ? 'checked':'not checked')
  console.log(e.target.checked);
}

  const handleTemp = (e) => {
    setTemp(e.target.value)
  }

  const handleZ = (e) => {
    setZfactor(e.target.value)
  }

  const handleVolume = (e) => {
    setVolume(e.target.value)
  }

  const handleDensity = (e) => {
    setDensity(e.target.value)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);



    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {

      if (file.size < 1024 * 1024) {
        setImageName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
          setImageurl(imageData)
        };
        reader.readAsDataURL(file);
      } else {
        setShowpopup(true)
        setImageName('')  
          

      }
    } else {
      alert('support only png, jpg and jpeg format')
      setImageName('')
    };
  }

  const keys = JSON.parse(localStorage.getItem(userKey))



  useEffect(() => {

    if (fluid, water, temp, zfactor, volume, density, imageurl) {

      const key = `key_${keys.uname}_${num}`;

      const store = {
        fluid: fluid,
        water: water,
        temp: temp, 
        zfactor: zfactor,
        volume: volume,
        density: density,
        image: imageurl 
      };


      if (data) {
        localStorage.setItem(key, JSON.stringify(store));
        props.setSavedata(false)
        setNum(num.map((a) => a + 1))
      }


    }
  }, [data])

    const greatersize = selectedImage && selectedImage.size && selectedImage.size>1024*1024;

    const Resize = async() =>{
    if (!imageName) {
      if (selectedImage) {
           if(greatersize){
            if(updatebtn){
            const resizeFile = (file) =>
            new Promise((resolve) => {
              Resizer.imageFileResizer(
                file,
                1023,
                1023,
                'JPEG',
                100,
                0,
                (resizedImage) => {
                  resolve(resizedImage);
                },
                      "base64"
                    );
                })
            try {
    const resizedImage = await resizeFile(selectedImage);
              setSelectedImage(resizedImage)
              setImageName(selectedImage.name);
              setImageurl(resizedImage)
                }
              // setImageName(file.name);
              // console.log(resizedImage);
             catch (err) {
              console.log(err);
            }
          }}else if(cancelbtn){
            setImageurl();
            setImageName('');
            setSelectedImage('');

          }
    }
      };
      
    }
    
      useEffect(()=>{
        if(updatebtn){
          Resize();
          setUpdatebtn(false);
          setShowpopup(false);
        }else if(cancelbtn){
          setShowpopup(false);
          setCancelbtn(false);   
        }
       
      },[updatebtn, cancelbtn])     


    return (

      <div className='main-fluid'>
  <div className='resize'>
          {showpopup?    
          <Popup setUpdatebtn={setUpdatebtn} setCancelbtn={setCancelbtn} setShowpopup={setShowpopup} />
           :
          null
              } 
   </div> 

        <div className='aboveline'>
          <p className='fluid'>FluidType:</p>

          <div className='fluidtype'>
            <Box  >

             <FormControl >

                <InputLabel id="select" style={{ color: 'White' }} >Select</InputLabel>
            {greatersize ?     <Select
                  id="select"
                  style={{ width: 250, height: 40 }}
                  value={fluid}
                  onChange={handleFluid}
                  disabled
                >
             
                  <MenuItem value='Gas'>Gas</MenuItem>
                  <MenuItem value='Oil'>Oil</MenuItem>
                </Select> :     <Select
                  id="select"
                  style={{ width: 250, height: 40 }}
                  value={fluid}
                  onChange={handleFluid}
                >
             
                  <MenuItem value='Gas'>Gas</MenuItem>
                  <MenuItem value='Oil'>Oil</MenuItem>
                </Select> }
           

             

              </FormControl>
          
            </Box>
            <Box sx={{ display: 'flex', marginLeft: 7 }}>
        {greatersize ?   <Checkbox id='checkbox' style={{ color: 'white' }} onChange={handleWater} value={water} checked={water==='checked'} disabled/> :
          <Checkbox id='checkbox' style={{ color: 'white' }} onChange={handleWater} value={water} checked={water==='checked'}/> }
            
              <Typography style={{ marginTop: 10 }}>Water</Typography>

            </Box>
          </div>
        </div>


        {fluid === 'Oil' ? (
          <div> <p style={{ marginTop: 60, marginLeft: 20 }}>Oil:</p>



            <div className='oil'>

              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Temperature</InputLabel>
          {greatersize ?    <Select
                  className='oilselect'
                  value={temp}
                  onChange={handleTemp}
             disabled   >
                  <MenuItem value='23deg' >23 deg</MenuItem>
                  <MenuItem value='25deg'>25 deg</MenuItem>
                  <MenuItem value='0deg'>0 deg</MenuItem>
                  <MenuItem value='55deg'>55 deg</MenuItem>
                  <MenuItem value='73deg'>73 deg</MenuItem>
                  <MenuItem value='100deg'>100 deg</MenuItem>
                </Select> : 
                   <Select
                   className='oilselect'
                   value={temp}
                   onChange={handleTemp}
                 >
                   <MenuItem value='23deg' >23 deg</MenuItem>
                   <MenuItem value='25deg'>25 deg</MenuItem>
                   <MenuItem value='0deg'>0 deg</MenuItem>
                   <MenuItem value='55deg'>55 deg</MenuItem>
                   <MenuItem value='73deg'>73 deg</MenuItem>
                   <MenuItem value='100deg'>100 deg</MenuItem>
                 </Select>
                 }
             

              </FormControl>


              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Z-factor</InputLabel>
              
             {greatersize ?  <Select
                  className='oilselect'
               
                  value={zfactor}
                  onChange={handleZ}
              disabled  >
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                </Select> : 
                 <Select
                 className='oilselect'
              
                 value={zfactor}
                 onChange={handleZ}
               >
                 <MenuItem value='1'>1</MenuItem>
                 <MenuItem value='2'>2</MenuItem>
                 <MenuItem value='3'>3</MenuItem>
                 <MenuItem value='4'>4</MenuItem>
                 <MenuItem value='5'>5</MenuItem>
                 <MenuItem value='6'>6</MenuItem>
               </Select>
               } 
               

              </FormControl>

              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Oil formation volume factor</InputLabel>
            
           {greatersize ?     <Select
                  className='oilselect'
                  value={volume}
                  onChange={handleVolume}
                  disabled
                >
                  <MenuItem value='internal'>internal</MenuItem>
                  <MenuItem value='external'>external</MenuItem>
                  <MenuItem value='null'>null</MenuItem>
                </Select>
          :     <Select
          className='oilselect'
     
          value={volume}
          onChange={handleVolume}
        >
          <MenuItem value='internal'>internal</MenuItem>
          <MenuItem value='external'>external</MenuItem>
          <MenuItem value='null'>null</MenuItem>
        </Select>
    } 
            
              </FormControl>

              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Oil Density</InputLabel>
              {greatersize ? <Select
                  className='oilselect'
                  value={density}
                  onChange={handleDensity}
                  disabled
                >
                  <MenuItem value='100'>100</MenuItem>
                  <MenuItem value='200'>200</MenuItem>
                  <MenuItem value='300'>300</MenuItem>
                  <MenuItem value='400'>400</MenuItem>
                  <MenuItem value='500'>500</MenuItem>
                </Select>
          : <Select
          className='oilselect'
          value={density}
          onChange={handleDensity}
        >
          <MenuItem value='100'>100</MenuItem>
          <MenuItem value='200'>200</MenuItem>
          <MenuItem value='300'>300</MenuItem>
          <MenuItem value='400'>400</MenuItem>
          <MenuItem value='500'>500</MenuItem>
        </Select>
            }
                
              </FormControl>

            </div></div>
        ) : (<div>
          <p style={{ marginTop: 60, marginLeft: 20 }}>Gas:</p>



          <div className='gas'>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Temperature</InputLabel>           
            {greatersize ?  <Select
                className='gasselect'
                value={temp}
                onChange={handleTemp}
                disabled
              >
                <MenuItem value='23deg'>23 deg</MenuItem>
                <MenuItem value='25deg'>25 deg</MenuItem>
                <MenuItem value='0deg'>0 deg</MenuItem>
                <MenuItem value='55deg'>55 deg</MenuItem>
                <MenuItem value='73deg'>73 deg</MenuItem>
                <MenuItem value='100deg'>100 deg</MenuItem>
              </Select>: 
               <Select
               className='gasselect'
               value={temp}
               onChange={handleTemp}
             >
               <MenuItem value='23deg'>23 deg</MenuItem>
               <MenuItem value='25deg'>25 deg</MenuItem>
               <MenuItem value='0deg'>0 deg</MenuItem>
               <MenuItem value='55deg'>55 deg</MenuItem>
               <MenuItem value='73deg'>73 deg</MenuItem>
               <MenuItem value='100deg'>100 deg</MenuItem>
             </Select>}
              

            </FormControl>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Z-factor</InputLabel>
           {greatersize ?   <Select
                className='gasselect'
                value={zfactor}
                onChange={handleZ}
                disabled
              >
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
                <MenuItem value='5'>5</MenuItem>
                <MenuItem value='6'>6</MenuItem>
              </Select>:   <Select
                className='gasselect'
                value={zfactor}
                onChange={handleZ}
              >
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
                <MenuItem value='5'>5</MenuItem>
                <MenuItem value='6'>6</MenuItem>
              </Select>}
            

            </FormControl>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Gas formation volume factor</InputLabel>
             {greatersize ?  <Select
                className='gasselect'
                value={volume}
                onChange={handleVolume}
                disabled
              >
                <MenuItem value='internal'>internal</MenuItem>
                <MenuItem value='external'>external</MenuItem>
                <MenuItem value='null'>null</MenuItem>
              </Select>: 
               <Select
               className='gasselect'
               value={volume}
               onChange={handleVolume}
             >
               <MenuItem value='internal'>internal</MenuItem>
               <MenuItem value='external'>external</MenuItem>
               <MenuItem value='null'>null</MenuItem>
             </Select>}
             

            </FormControl>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Gas Density</InputLabel>
            {greatersize ?   <Select
                className='gasselect'
                value={density}
                onChange={handleDensity}
                disabled
              >
                <MenuItem value='100'>100</MenuItem>
                <MenuItem value='200'>200</MenuItem>
                <MenuItem value='300'>300</MenuItem>
                <MenuItem value='400'>400</MenuItem>
                <MenuItem value='500'>500</MenuItem>
              </Select>:   <Select
                className='gasselect'
                value={density}
                onChange={handleDensity}
              >
                <MenuItem value='100'>100</MenuItem>
                <MenuItem value='200'>200</MenuItem>
                <MenuItem value='300'>300</MenuItem>
                <MenuItem value='400'>400</MenuItem>
                <MenuItem value='500'>500</MenuItem>
              </Select>}

            

            </FormControl>
          </div></div>)}

        <div className='imagediv'>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: 55, marginLeft: 20 }}
            id="image-input"
   
          /><br />

          {greatersize ? 
           <TextField
           label="Image Name"
           value={imageName}
           variant="outlined"
           id='textfield'
           style={{ width: 350, height: 40, marginLeft: 20, marginTop: 10 }}
           disabled
         /> : 
         <TextField
         label="Image Name"
         value={imageName}
         variant="outlined"
         id='textfield'
         style={{ width: 350, height: 40, marginLeft: 20, marginTop: 10 }}
       />}
         


        </div>


      </div>
    );

          }
    export default Fluidtype;

