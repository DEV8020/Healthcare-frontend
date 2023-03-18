import React from 'react'
import classes from "./NavBar.module.css"




const NavBar = (props) => {
  
  return (
    <span className={classes.NavBar}>
    {props.label}<button value={props.value} className={classes.back_btn} onClick={props.onClick}>
    {props.value}
      </button>
    </span>
);
}
  


export default NavBar