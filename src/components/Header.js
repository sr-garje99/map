import { Box, Image,styled } from '@mui/material'
import React from 'react'
import logo from '../tollguruLogo.png'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const Header = () => {
  return (
    <div>
        <Box sx={{height:"5rem",}}>
            <Img src={logo}/>
        </Box>
    </div>
  )
}

export default Header