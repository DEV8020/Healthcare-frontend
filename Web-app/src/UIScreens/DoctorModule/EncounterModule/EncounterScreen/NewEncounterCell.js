import { useState } from "react";
// import AddButton from "../UI Elements/MenuForm Elements/addButton";
import classes from "./NewEncounterCell.module.css";
import AddButton from "../../../../Components/Screens/UI Elements/MenuForm Elements/addButton";

const NewEncounterCell = (props) => {
  const [encounterData, setEncounterData] = useState({});

  //setEncounterData(props.encounterUserData);

//   console.log(encounterData);
//   console.log(props.encounterUserData);

  const CreateEncounterHandler = () => {
    console.log("CreateEncounterHandler");
    console.log(props.encounterUserData);
    props.CreateEncounterHandler(props.encounterUserData);
  };

  return (
    <div key={props.encounterUserData.pendingQueueId}>
      <div className={classes.plist} > 
        <div>Patient ID : {props.encounterUserData.patient.patientId}</div>
        <div>Name : {props.encounterUserData.patient.name}</div>
        <div>Age : {props.encounterUserData.patient.age}</div>
        <div>Sex : {props.encounterUserData.patient.sex}</div>
        {/* <div>Contact : {props.encounterUserData.patient.contact}</div> */}
      </div>
      <AddButton
        key={props.encounterUserData.patient.patientId}
        value="Create Appointment"
        onClick={CreateEncounterHandler}
      />
    </div>
  );
};

export default NewEncounterCell;
