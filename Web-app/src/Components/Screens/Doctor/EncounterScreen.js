import React,{useState} from "react";
import PatientData from "./PatientData";
import classes from "./EncounterScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import Prescription from "./Prescription";
import ViewHistory from "./ViewHistory";
import FollowUpUpdates from "./FollowUpUpdates";


const EncounterScreen = (props) => {
  
  const [encounterOption,setEncounterOption] = useState("");
  const [doctorEncounterData, setDoctorEncounterData] = useState({prescription : "", additionalNotes : ""});

  const PrescriptionButtonHandler = () => {
    setEncounterOption("Prescription");
  };
  const ViewHistoryButtonHandler = () => {
    setEncounterOption("ViewHistory");
  };
  // const FollowUpUpdatesButtonHandler = () => {
  //   setEncounterOption("FollowUpUpdates");
  // };

  console.log("props.selectedDoctorEncounterData in encounter screen");
console.log(props.selectedDoctorEncounterData);
console.log(props.selectedEncounterID);

// selectedEncounterID={selectedEncounterID}


  const backButtonD = () => {
  props.setCreateEncounter(false);
  };

  return (
    <div>
  <NavBar value="Back" label="Doctor" onClick={backButtonD} />
    
    <div className={classes.center}>
      <h2> Encounter Menu</h2>

      <div className={classes.Encounter_menu}>
        <Button value="Prescription" onClick={PrescriptionButtonHandler} />

        <Button value="View History" onClick={ViewHistoryButtonHandler} />

        {/* <Button value="Follow-up Updates" onClick={FollowUpUpdatesButtonHandler} /> */}

      </div>
    </div>

    {
    encounterOption === "Prescription" && (<Prescription  setEncounterOption={setEncounterOption} setAlertMessage ={props.setAlertMessage}
      setAlertFlag ={props.setAlertFlag} doctorPrescriptionData={doctorEncounterData} setDoctorPrescriptionData={setDoctorEncounterData}/>)
  }
  {
    encounterOption === "ViewHistory" && (<ViewHistory encounterOption={encounterOption} setEncounterOption={setEncounterOption} setAlertMessage ={props.setAlertMessage}
      setAlertFlag ={props.setAlertFlag} selectedEncounterData={props.selectedDoctorEncounterData} />)
  }
  {/* {
    encounterOption === "FollowUpUpdates" && (<FollowUpUpdates encounterOption={encounterOption} setEncounterOption={setEncounterOption} setAlertMessage ={props.setAlertMessage}
      setAlertFlag ={props.setAlertFlag}/>)
  } */}
  

  </div> )
};

export default EncounterScreen;
