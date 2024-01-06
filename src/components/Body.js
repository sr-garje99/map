
import MapBox from './MapBox';
import Form from './Form';
import { Card,Grid,Box } from '@mui/material'
import Header from './Header'
import React, { useEffect,useState,createContext } from 'react'

export const PlaceContext = createContext("");
const Body = () => {
  
  const [place,setPlace] = useState("");
  const [position,setPosition]=useState([20,60]);
  const showPosition =(position)=> {

    setPosition([position.coords.latitude,position.coords.longitude])
  }
  const errorCallback =(error) =>{
    console.log(error);
  }
  const getLocation =()=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,errorCallback,{timeout:2000});
    } else { 
      window.alert( "Geolocation is not supported by this browser.");
    }
  }
  useEffect(getLocation,[]);
  //console.log(position)
  return (
    <div ><PlaceContext.Provider value={[place,setPlace]}>
        <Card sx={{height:"5rem",padding:"1px",margin:"1px",border:"1px"}}>
        <Header/>
        </Card>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {/* <Grid item xs={12} sm={12} md={4} lg ={3} xl={3} >
                    <Card sx={{height:"16rem",padding:"1rem",margin:"0.2rem",border:"1rem"}}>
                        <Form/>
                    </Card>    
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg ={12} xl={12} >
                    <Card sx={{height:"100rem",padding:"1rem",margin:"0.2rem",border:"1rem"}}>
                        <MapBox position={position}/>
                    </Card>
                </Grid>
                
            </Grid>
        </Box>
        </PlaceContext.Provider>
    </div>
  )
}

export default Body