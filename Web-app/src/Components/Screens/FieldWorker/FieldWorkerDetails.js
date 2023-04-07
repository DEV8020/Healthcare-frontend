import classes from "./FieldWorkerDetails.module.css";

import React, { useState } from "react";

// import NewEncounterService from "../../../Services/FieldWorkerListService";

import AddButton from "../UI Elements/MenuForm Elements/addButton";

const FieldWorkerDetails = (props) => {
  // const followupList = [
  //   {
  //     fl_id: "f1",
  //     p_id:"p1",
  //     status:"Completed"

  //   },
  //   {
  //     fl_id: "f2",
  //     p_id:"p2",
  //     status:"Pending"
  //   },
  //   {
  //     fl_id: "f3",
  //     p_id:"p3",
  //     status:"Completed"
  //   },
  // ];

  //  date : "01-05-2023"
  // encounter : {encounterId: 252, flag: false, doctor: {…}, medicalHistory: null, patient: {…}}
  // flag : false
  // followUpId : 205
  // hospital : {hospId: 1, name: 'HospitalNewNewNew', address: '400001', supId: {…}}
  // lastSyncDate : null
  // patient: {patientId: 102, name: 'darshan 5', address: '400001', age: 53, sex: 'male', …}
  // remarks : null
  console.log("Field Worker details page");
  console.log(props.fieldWorkerFollowUpsList);

  return (
    <div className={classes.center}>
      <h2> Follow Up Status</h2>

      {props.fieldWorkerFollowUpsList.length === 0 && (
        <div>
          <h4 style={{textAlign:"center"}}>No Follow Ups assigned to the selected field worker.</h4>
        </div>
      )}

      <div className={classes.ul}>
        {props.fieldWorkerFollowUpsList.map((followUpData) => (
          <div key={followUpData.followUpId} className={classes.plist}>
            <div>ID : {followUpData.followUpId}</div>
            <div>Patient ID : {followUpData.patient.patientId}</div>
            <div>Status : {followUpData.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerDetails;
