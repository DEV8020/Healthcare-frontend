import React from "react";
import PatientData from "./PatientData";
import classes from "./PatientList.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";

const PatientList = (props) => {
  const logoutD = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  if (props.patientList === []) return null;

  return (
    <div id="patientlist">
      {/* <h1 className={classes.head}>Patient Appointment List </h1>

      <div className={classes.NavBar}>
        <button value="logout" className={classes.logout_btn} onClick={logoutD}>
          Log-out
        </button>
      </div> */}
      <NavBar value="Log-out" label="Doctor" onClick={logoutD}/>

      <div className={classes.ul}>
        {props.patientList.map((patientData) => (
            <PatientData
              patientData={patientData}
              key={patientData.p_id}
              
            />
          ))}
      </div>
    </div>
  );
};

export default PatientList;
