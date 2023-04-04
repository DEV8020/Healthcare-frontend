import classes from "./PatientDetailsView.module.css";

import React, { useState } from "react";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

// import NewEncounterService from "../../../Services/FieldWorkerListService";

const PatientDetailsView = (props) => {
  const patientDataByPatientId = {
    p_id: props.viewDetalsPatientID,
    name: "john",
    age: 12,
    sex: "m",
    contact: 1234567890,
  };

  return (
    <div className={classes.center}>
      <h2> Patient Details</h2>
      <div className={classes.ul}>
        <div className={classes.plist}>
          <div>ID:{patientDataByPatientId.p_id}</div>
          <div>Name:{patientDataByPatientId.name}</div>
          <div>Age:{patientDataByPatientId.age}</div>
          <div>Sex:{patientDataByPatientId.sex}</div>
          <div>Contact:{patientDataByPatientId.contact}</div>
        </div>
        <AddButton
          value="Back"
          onClick={() => {
            props.setPatientDetailsView(false);
          }}
        />
      </div>
    </div>
  );
};

export default PatientDetailsView;
