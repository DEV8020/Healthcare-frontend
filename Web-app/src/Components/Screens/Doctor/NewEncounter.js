import React, { useState } from "react";
import NewEncounterService from "../../../Services/NewEncounterService";
import classes from "./NewEncounter.module.css";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import NewEncounterCell from "./NewEncounterCell";
//import NavBar from "../UI Elements/NavBar/NavBar";

const NewEncounter = (props) => {
  const CreateEncounterHandler = () => {
    props.setAlertMessage(" Encounter Created successfully");
    props.setAlertFlag(true);
    props.setCreateEncounter(true);
  };

  // const patientData = {
  //   p_id: "p1",
  //   name: "john",
  //   age: 12,
  //   sex: "m",
  //   contact: 1234567890,
  // };

  return (
    //props, doctorEncounterData

    //   <div className={classes.ul}>
    //   {hospitalUserList.map((hospitalUserData) => (
    //     <div key={hospitalUserData.userID} className={classes.plist}>
    //       <div>User Type : {hospitalUserData.userType}</div>
    //       <div>User Name: {hospitalUserData.name}</div>
    //       <div>Password : {hospitalUserData.password}</div>
    //       <AddButton
    //         value="Update"
    //         onClick={() => changeHospitalUserDataHandler(hospitalUserData)}
    //       />
    //     </div>
    //   ))}
    // </div>


    


    //[{"pendingQueueId":102,"dateTime":"2023-04-09 03:15:37.904920998","flag":null,
    //"patient":{"patientId":1,"name":"mareez","address":"565220","age":22,'
    //"sex":"Nhi btaunga","contact":"4545659565","fieldWorker":null},
    
    
    //"hospital":{"hospId":1,"name":"Dharavi Charitable","address":"141001",
    
    
    //"supId":{"authId":1,"userId":"supervisor","password":"supervisor",
    //"userType":"Supervisor","name":"Supervisor Name New","contact":"8989745467","address":"141001"}}},

    <div className={classes.center}>
      <h1> Create New Encounter</h1>

      {props.doctorEncounterData.length === 0 && (
        <div>
          {" "}
          <h3 style={{textAlign:"center"}}>No encounter to display. Please add some to proceed.</h3>
        </div>
      )}

      <div className={classes.ul}>
        {props.doctorEncounterData.map((encounterData) => (
          <NewEncounterCell encounterUserData={encounterData}/>
        ))}
      </div>
    </div>
  );
};

export default NewEncounter;
