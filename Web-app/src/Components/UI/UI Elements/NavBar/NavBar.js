import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from '../Button/Button';




const NavBar = (props) => {
  
  return (
    <span className={classes.NavBar}>
    {props.label}<button value="logout" className={classes.back_btn} onClick={BackButtonHandler}>
        back
      </button>
    </span>
);
}
  


export default NavBar