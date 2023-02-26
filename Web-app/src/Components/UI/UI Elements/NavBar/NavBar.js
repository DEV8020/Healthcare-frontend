import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from '../Button/Button';




const NavBar = ({ user, setUser }) => {
  
  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (!user)
    return null

 
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
       
        
        
      </Toolbar>
    </AppBar>
  </Box>
);
}
  


export default NavBar