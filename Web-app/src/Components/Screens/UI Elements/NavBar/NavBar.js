import React from "react";
import classes from "./NavBar.module.css";

const APP_NAME = "HealthCentral";
const NavBar = (props) => {
  return (
    <span className={classes.NavBar}>
      <img src={require("../../../../assets/app_logo.jpeg")} />

      {APP_NAME}
      <button
        value={props.value}
        className={classes.back_btn}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </span>
  );
};

export default NavBar;
