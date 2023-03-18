import React, { useState } from "react";
import NewEncounterService from "../../../Services/NewEncounterService";
import classes from "./NewEncounter.module.css";
import InputField from "../UI Elements/AdminMenuForm Elements/InputField";
import AddButton from "../UI Elements/AdminMenuForm Elements/addButton";
//import NavBar from "../UI Elements/NavBar/NavBar";

const NewEncounter = (props) => {


   

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
      <div className={classes.plist}>
        <div>Name:{patientData.name}</div>
        <div>Age:{patientData.age}</div>
        <div>Sex:{patientData.sex}</div>
        <div>Contact:{patientData.contact}</div>
      </div>
      <AddButton value="Create Encounter" />
      
    </div>
  );
};

export default NewEncounter;
