import React, { useState } from "react";
import classes from "./FieldWorkerList.module.css";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

const FieldWorkerList = (props) => {
  const getFieldWorkerDetailsHandler = (fieldWorkerData) => {
    console.log("getFieldWorkerDetailsHandler is  ");
    console.log(fieldWorkerData);
    props.showMessageAtBottomBar({message : "Selected Field Worker : " + fieldWorkerData.name, isErrorMessage : false});
    props.loadFieldWorkerDetailsData(fieldWorkerData);
    props.setFieldWorkerStatus(true);
  };

  console.log("props.fieldWorkerList in field worker list screen");
  console.log(props.fieldWorkerList);

  return (
    // address : "400001"
    // authId : 52
    // contact : "1111111111"
    // name : "Rajeev"
    // password : "FieldWorker1"
    // supervisor:
    // {authId: 1, userId: 'supervisor1', password: 'supervisor1', userType: 'Supervisor', name: 'supervisor1', …}
    // userId : "FieldWorker1"
    // userType : "FieldWorker"

    <div className={classes.center}>
      <h1> Field Worker List</h1>

      {props.fieldWorkerList.length === 0 && (
        <div>
          {" "}
          <h3 style={{textAlign:"center"}}>No users to display. Please add some to proceed.</h3>
        </div>
      )}


      <div className={classes.ul}>
        {props.fieldWorkerList.map((fieldworkerdata) => (
          <div key={fieldworkerdata.authId} className={classes.plist}>
            <div>ID : {fieldworkerdata.authId}</div>
            <div>userId : {fieldworkerdata.userId}</div>
            <div>Name : {fieldworkerdata.name}</div>
            <div>Contact No. : {fieldworkerdata.contact}</div>

            <AddButton
              value="Details"
              onClick={() => getFieldWorkerDetailsHandler(fieldworkerdata)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerList;
