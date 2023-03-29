import classes from "./ViewHistory.module.css"

import React, { useState } from "react";

// import NewEncounterService from "../../../Services/FieldWorkerListService";


import AddButton from "../UI Elements/MenuForm Elements/addButton";

const ViewHistory = (props) => {
  const HistoryList = [
    {
      
      d_id:"d1",
      date:"21-03-2023",
      madical_condition:"ABC",
      prescriptionH:"ABC",
      
    },
    {
      d_id: "d2",
      date:"21-03-2023",
      madical_condition:"ABC",
      prescriptionH:"ABC",
    },
    {
  
      d_id:"d3",
      date:"21-03-2023",
      madical_condition:"ABC",
      prescriptionH:"ABC",
    },
    {
  
        d_id:"d4",
        date:"21-03-2023",
        madical_condition:"ABC",
        prescriptionH:"ABC",
      },
  ];
  

  return (
    <div className={classes.center}>
      <h2> Patient History</h2>
      <div className={classes.ul}>
        {HistoryList.map((history) => (
          <div key={history.d_id} className={classes.plist}>
            
            <div>Doctor ID : {history.d_id}</div>
            <div>Date : {history.date}</div>
            <div>Medical Condition : {history.madical_condition}</div>
        <div>Prescription : {history.prescriptionH}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHistory;
