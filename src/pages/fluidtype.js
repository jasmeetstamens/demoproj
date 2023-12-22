import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './fluidtype.css'
import { Button, Checkbox, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { useState } from 'react';
import  Resizer  from 'react-image-file-resizer';




function Fluidtype(props) {

  const [fluid, setFluid] = useState("");
  const [temp, setTemp] = useState();
  const [zfactor, setZfactor] = useState();
  const [volume, setVolume] = useState();
  const [density, setDensity] = useState();
  const [imageName, setImageName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageurl, setImageurl] = useState("")

  const [num, setNum] = useState([1]);


  let data = props.savedata;
  let userKey = props.loginusername;


  const handleFluid = (e) => {
    setFluid(e.target.value)

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

        alert('max. size reached! update size')
        setImageName('')  
          





      }
    } else {
      alert('support only png, jpg and jpeg format')
      setImageName('')
    };
  }

  const keys = JSON.parse(localStorage.getItem(userKey))



  useEffect(() => {

    if (fluid, temp, zfactor, volume, density, imageurl) {

      const key = `key_${keys.uname}_${num}`;

      const store = {

        fluid: fluid,
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


  const Resize = async () => {
 
    if (!imageName) {
      if (selectedImage) {
           if(selectedImage.size> 1024*1024){
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
          }
        }
      };
    }

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
           
                           
    

  



    return (

      <div className='main-fluid'>
        <div className='aboveline'>
          <p className='fluid'>FluidType:</p>

          <div className='fluidtype'>
            <Box  >
              <FormControl >
                <InputLabel id="select" style={{ color: 'White' }}>Select</InputLabel>
                <Select
                  id="select"
                  style={{ width: 250, height: 40 }}
                  value={fluid}
                  onChange={handleFluid}
                >
                  <MenuItem value='Gas'>Gas</MenuItem>
                  <MenuItem value='Oil'>Oil</MenuItem>
                </Select>

              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', marginLeft: 7 }}>
              <Checkbox id='checkbox' style={{ color: 'white' }} />
              <Typography style={{ marginTop: 10 }}>Water</Typography>

            </Box>
          </div>
        </div>


        {fluid === 'Oil' ? (
          <div> <p style={{ marginTop: 60, marginLeft: 20 }}>Oil:</p>



            <div className='oil'>

              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Temperature</InputLabel>
                <Select
                  style={{ width: 350, height: 40 }}
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

              </FormControl>


              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Z-factor</InputLabel>
                <Select
                  className='oilselect'
                  style={{ width: 350, height: 40 }}
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

              </FormControl>

              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Oil formation volume factor</InputLabel>
                <Select
                  className='oilselect'
                  style={{ width: 350, height: 40 }}
                  value={volume}
                  onChange={handleVolume}
                >
                  <MenuItem value='internal'>internal</MenuItem>
                  <MenuItem value='external'>external</MenuItem>
                  <MenuItem value='null'>null</MenuItem>
                </Select>

              </FormControl>

              <FormControl >
                <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Oil Density</InputLabel>
                <Select
                  style={{ width: 350, height: 40 }}
                  className='oilsselect'
                  value={density}
                  onChange={handleDensity}
                >
                  <MenuItem value='100'>100</MenuItem>
                  <MenuItem value='200'>200</MenuItem>
                  <MenuItem value='300'>300</MenuItem>
                  <MenuItem value='400'>400</MenuItem>
                  <MenuItem value='500'>500</MenuItem>
                </Select>

              </FormControl>

            </div></div>
        ) : (<div>
          <p style={{ marginTop: 60, marginLeft: 20 }}>Gas:</p>



          <div className='gas'>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Temperature</InputLabel>
              <Select
                style={{ width: 350, height: 40 }}
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
              </Select>

            </FormControl>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Z-factor</InputLabel>
              <Select
                className='gasselect'
                style={{ width: 350, height: 40 }}
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

            </FormControl>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Gas formation volume factor</InputLabel>
              <Select
                className='gasselect'
                style={{ width: 350, height: 40 }}
                value={volume}
                onChange={handleVolume}
              >
                <MenuItem value='internal'>internal</MenuItem>
                <MenuItem value='external'>external</MenuItem>
                <MenuItem value='null'>null</MenuItem>
              </Select>

            </FormControl>

            <FormControl >
              <InputLabel className="inputlabelselect" style={{ color: 'White' }}>Gas Density</InputLabel>
              <Select
                style={{ width: 350, height: 40 }}
                className='gasselect'
                value={density}
                onChange={handleDensity}
              >
                <MenuItem value='100'>100</MenuItem>
                <MenuItem value='200'>200</MenuItem>
                <MenuItem value='300'>300</MenuItem>
                <MenuItem value='400'>400</MenuItem>
                <MenuItem value='500'>500</MenuItem>
              </Select>

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
          <TextField
            label="Image Name"
            value={imageName}
            variant="outlined"
            id='textfield'
            style={{ width: 350, height: 40, marginLeft: 20, marginTop: 10 }}
          />



          <div className='resizeimage'>
            {!imageName ?
              (<><Button variant="contained" color="primary" onClick={Resize}>
                update size
              </Button>

              </>) : null
            }
 </div>



        </div>


      </div>
    );

          }
    export default Fluidtype;

