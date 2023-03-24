import classes from "./FieldWorkerDetails.module.css"

import React, { useState } from "react";

// import NewEncounterService from "../../../Services/FieldWorkerListService";


import AddButton from "../UI Elements/MenuForm Elements/addButton";

const FieldWorkerDetails = (props) => {
  const followupList = [
    {
      fl_id: "f1",
      p_id:"p1",
      status:"Completed"


    },
    {
      fl_id: "f2",
      p_id:"p2",
      status:"Pending"
    },
    {
      fl_id: "f3",
      p_id:"p3",
      status:"Completed"
    },
  ];
  

  return (
    <div className={classes.center}>
      <h2> Follow Up Status</h2>
      <div className={classes.ul}>
        {followupList.map((followup) => (
          <div key={followup.fl_id} className={classes.plist}>
            <div>ID:{followup.fl_id}</div>
            <div>Patient ID:{followup.p_id}</div>
            <div>Status:{followup.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerDetails;
