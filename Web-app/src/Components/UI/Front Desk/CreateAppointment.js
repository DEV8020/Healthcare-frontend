import React, { useState } from "react";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import classes from "./CreateAppointment.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";


const CreateAppointment = (props) => {
  const [PatientId, setPatientId] = useState("");

  const PatientIdChangeHandler = (event) => {
    setPatientId(event.target.value);
  };

  const AddAppointmentHandler = (event) => {
    event.preventDefault();

    console.log(PatientId);
    // props.onCreateAppointment(PatientId);
    setPatientId("");
  };


  return (
    <div>
      
    <div className={classes.center}>
       <h1>Appointment</h1>
      
      <form  onSubmit={AddAppointmentHandler}>
       

        <InputField
          type="text"
          label="PatientId"
          value={PatientId}
          onChange={PatientIdChangeHandler}
        />

       
        <MenuSubmitButton value="Create Appointment" />
       
        
      </form>
    </div>
    </div>
  );
};

export default CreateAppointment;
