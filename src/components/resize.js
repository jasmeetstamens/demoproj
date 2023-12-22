import React from 'react'


function Resize(){
    const [imagesize, setImagesize] = useState()
      
      return(
          selectedImage ? (()=>{setImagesize(1024*1024)}) : (alert('select image first'))
      )
    }
    
    
    
    

export default Resize;
