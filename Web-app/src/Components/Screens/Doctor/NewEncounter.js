import React, { useState } from "react";
// import NewEncounterService from "../../../Services/NewEncounterService";
import classes from "./NewEncounter.module.css";
// import InputField from "../UI Elements/MenuForm Elements/InputField";
// import AddButton from "../UI Elements/MenuForm Elements/addButton";
import NewEncounterCell from "./NewEncounterCell";
import DoctorAPIHandler from "../../../Controllers/DoctorAPIHandler";
//import NavBar from "../UI Elements/NavBar/NavBar";

const NewEncounter = (props) => {
  console.log("daddadaddada");
  console.log(props.doctorEncounterData);



  console.log("encounter ID in NewEncounter.js");
  console.log(props.selectedEncounterID);

  // selectedEncounterID={selectedEncounterID}

  const CreateEncounterHandler = (encounterData) => {
    DoctorAPIHandler.addPatientEncounterData({
      patientData: encounterData,
      addPatientEncounterResponseHandler: addPatientEncounterResponseHandler,
    });
  };


  const addPatientEncounterResponseHandler = (addPatientEncounterData) => {
    if (addPatientEncounterData.isEncounterCreated === false) {
      props.setAlertMessage(addPatientEncounterData.errorMessage);
      return;
    }
    // props.refreshEncounterIDHandler(addPatientEncounterData.encounterData);
    props.setAlertMessage("Encounter Created successfully");
    props.encounterCreateDataHandler(addPatientEncounterData.encounterData);
    props.setAlertFlag(true);
    props.setCreateEncounter(true);
  };

  return (
    <div className={classes.center}>
      <h1> Create New Encounter</h1>

      {props.doctorEncounterData.length === 0 && (
        <div>
          {" "}
          <h3 style={{ textAlign: "center" }}>
            No encounter to display. Please add some to proceed.
          </h3>
        </div>
      )}

      <div className={classes.ul}>
        {props.doctorEncounterData.map((encounterData) => (
          <NewEncounterCell
            encounterUserData={encounterData}
            CreateEncounterHandler={CreateEncounterHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default NewEncounter;
