import React, { useState } from "react";
import classes from "./Prescription.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import TextBox from "../UI Elements/MenuForm Elements/TextBox";


const Prescription = (props) => {
  const [PrescriptionData, setPrescriptionData] = useState("");
  const [AdditionalNotes, setAdditionalNotes] = useState("");

  const PrescriptionDataChangeHandler = (event) => {
    setPrescriptionData(event.target.value);
  };
  const AdditionalNotesChangeHandler = (event) => {
    setAdditionalNotes(event.target.value);
  };

  const PrescriptionSubmitHandler = (event) => {
    event.preventDefault();

    console.log(PrescriptionData);
    // props.onPrescription(PrescriptionData);
    setPrescriptionData("");
    props.setAlertMessage("Prescription successfully added :" + PrescriptionData);
    props.setAlertFlag(true);

  };


  return (
    <div>
      
    <div className={classes.center}>
       <h1>Appointment</h1>
      
      <form  onSubmit={PrescriptionSubmitHandler}>
       

        <TextBox.TextBox2
          type="text"
          label="Prescription"
          value={PrescriptionData}
          onChange={PrescriptionDataChangeHandler}
        />
        <TextBox.TextBox2
          type="text"
          label="Additional Notes"
          value={AdditionalNotes}
          onChange={AdditionalNotesChangeHandler}
        />
       
        <MenuSubmitButton value="Submit" />
       
        
      </form>
    </div>
    </div>
  );
};

export default Prescription;
