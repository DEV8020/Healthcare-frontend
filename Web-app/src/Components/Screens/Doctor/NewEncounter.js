import React, { useState } from "react";
import NewEncounterService from "../../../Services/NewEncounterService";
import classes from "./NewEncounter.module.css";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
//import NavBar from "../UI Elements/NavBar/NavBar";

const NewEncounter = (props) => {
  


const CreateEncounterHandler=()=>{

  props.setAlertMessage(" Encounter Created successfully");
  props.setAlertFlag(true);
  props.setCreateEncounter(true);
}
   

  const patientData = {
    p_id: "p1",
    name: "john",
    age: 12,
    sex: "m",
    contact: 1234567890,
  };
  return (
    
    <div className={classes.center}>
      <h1> Create New Encounter</h1>
      <div className={classes.ul}>
      <div className={classes.plist}>
        <div>Name:{patientData.name}</div>
        <div>Age:{patientData.age}</div>
        <div>Sex:{patientData.sex}</div>
        <div>Contact:{patientData.contact}</div>
      </div>
      <AddButton value="Create Encounter" onClick={CreateEncounterHandler}/>
      
    </div>
    </div>
    
  );
};

export default NewEncounter;
