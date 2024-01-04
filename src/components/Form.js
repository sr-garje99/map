import {Box,FormControl,InputLabel,Select,MenuItem,FormHelperText,Button, TextField} from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react';
import { PlaceContext } from './Body';

const Form = () => {

  const[amen,setAmen] = useState("")
  const [place,setPlace] = useContext(PlaceContext);
  const handleChange = (e) =>{
      setAmen(e.target.value);
      
  }
  const handleSubmit = () =>{
    console.log("#form"+amen)
      setPlace(amen)
  }
  return (
    <div>
        <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}
            noValidate
            autoComplete="off"
    >
      <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      
         <InputLabel id="demo-simple-select-helper-label">Places</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={amen}
          label="Places"
            onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"charging_station"}>Charging station</MenuItem>
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"hospital"}>Hospital</MenuItem>
          <MenuItem value={"bank"}>Bank</MenuItem>
          <MenuItem value={"school"}>School</MenuItem>
          <MenuItem value={"police"}>Police Station</MenuItem>
          <MenuItem value={"fuel"}>Petrol Pump</MenuItem>
          <MenuItem value={"cinema"}>Cinema Hall</MenuItem>

        </Select>
  <FormHelperText>Select what are you looking for!!</FormHelperText>
  
          <TextField
          id="standard-search"
          label="where"
          type="search"
          variant="outlined"
          value={place}
          onChange={handleChange}
        />
      </FormControl>
        </div>
      <div>
        <Button variant="contained"onClick={handleSubmit}>Go</Button>
      </div>
      
    </Box>

    </div>
  )
}

export default Form