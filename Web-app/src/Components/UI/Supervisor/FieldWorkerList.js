import React, { useState } from "react";

// import NewEncounterService from "../../../Services/FieldWorkerListService";
import classes from "./FieldWorkerList.module.css";
import FieldWorkerDetails from "../FieldWorker/FieldWorkerDetails";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

const FieldWorkerList = (props) => {
  const fieldworkerList = [
    {
      f_id: "f1",
      name: "max",
      age: 20,
      sex: "m",
      contact: 1234567890,
    },
    {
      f_id: "f2",
      name: "jay",
      age: 23,
      sex: "f",
      contact: 1234567890,
    },
    {
      f_id: "f3",
      name: "jason",
      age: 23,
      sex: "m",
      contact: 1234567890,
    },
  ];
  const AssignFollowUpHandler = (data) => {
    props.setAlertMessage(" Selected Field Worker :" + data);
    props.setAlertFlag(true);
    
    props.setFieldWorkerStatus(true);
  };

  return (
    <div className={classes.center}>
      <h1> Field Worker List</h1>
      <div className={classes.ul}>
        {fieldworkerList.map((fieldworkerdata) => (
          <div key={fieldworkerdata.f_id} className={classes.plist}>
            <div>ID:{fieldworkerdata.f_id}</div>
            <div>Name:{fieldworkerdata.name}</div>

            <AddButton
              value="Details"
              onClick={() => AssignFollowUpHandler(fieldworkerdata.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerList;
