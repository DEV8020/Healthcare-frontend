import React, { useState } from "react";

import classes from "./AddPatient.module.css";

const AddPatient = (props) => {
  const [PatientId, setPatientId] = useState("");

  const PatientIdChangeHandler = (event) => {
    setPatientId(event.target.value);
  };

  const AddAppointmentHandler = (event) => {
    event.preventDefault();

    console.log(PatientId);
    props.onCreateAppointment(PatientId);
    setPatientId("");
  };
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  return (
    <div>
      <h1 className={classes.head}>Front Desk</h1>
       <div className={classes.NavBar}>
        <button value="logout" className={classes.logout_btn} onClick={logout}>
          Log-out
        </button>
      </div>
    <div className={classes.center}>
       <h1>Appointment</h1>
      
      <form  onSubmit={AddAppointmentHandler}>
       

        <UsernameInput
          type="text"
          label="PatientId"
          onChange={PatientIdChangeHandler}
        />

       
                <AddButton value="Add Hospital" />
       
        
      </form>
    </div>
    </div>
  );
};

export default AddPatient;
