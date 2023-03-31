import classes from "./FieldWorkerUpdates.module.css"

import React, { useState } from "react";

// import NewEncounterService from "../../../Services/FieldWorkerListService";


import AddButton from "../UI Elements/MenuForm Elements/addButton";

const FieldWorkerUpdates = (props) => {
  const followupList = [
    {
      fl_id: "fl1",
      f_id:"f1",
      status:"Completed",
      updates:"Sugar level was critical please check"


    },
    {
      fl_id: "fl2",
      f_id:"f2",
      status:"Pending",
      updates:"Patient was absent"
    },
    {
      fl_id: "fl3",
      f_id:"f3",
      status:"Completed",
      updates:"Patient is recovering"
    },
  ];
  

  return (
    <div className={classes.center}>
      <h2> Follow Up Status</h2>
      <div className={classes.ul}>
        {followupList.map((followup) => (
          <div key={followup.fl_id} className={classes.plist}>
            <div>ID:{followup.fl_id}</div>
            <div>Status:{followup.status}</div>
            <div>Field Worker Mesaage :{followup.updates}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerUpdates;
