import React, { useState } from "react";
import InputField from "../UI Elements/Input Field/InputField";
import Button from "../UI Elements/Button/Button";
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
    <div className={classes.center}>
       <h1>Appointment</h1>
      <form  onSubmit={AddAppointmentHandler}>
       

    <div className={classes.txt_field}>
          <input type="text" required  onChange={PatientIdChangeHandler} />
          <span></span>
          <label>Patient ID</label>
        </div>

       
        <input type="submit" value="Create Appointment" />
        <input type="submit" value="Logout" onClick={logout}/>
        
      </form>
    </div>
  );
};

export default AddPatient;
