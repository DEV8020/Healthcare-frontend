import React,{useState} from "react";
import PatientData from "./PatientData";
import classes from "./DoctorScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import NewEncounter from "./NewEncounter";

const DoctorScreen = (props) => {
  const logoutD = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  const [doctorOption,setDoctorOption] = useState("doctor");

  const AddHospitalButtonHandler = () => {
    setDoctorOption("NewEncounter");
  };
  const AddDoctorButtonHandler = () => {
    setDoctorOption("FWupdates");
  };

  return (
    <div>
    <NavBar value="Log-out" label="Doctor" onClick={logoutD}/>
    
    <div className={classes.center}>
      <h2> Doctor Menu</h2>

      <div className={classes.Doctor_menu}>
        <Button value="New Encounter" onClick={AddHospitalButtonHandler} />

        <Button value="Field-Worker Updates" onClick={AddDoctorButtonHandler} />

      </div>
    </div>

    {
    doctorOption === "NewEncounter" && (<NewEncounter doctorOption={doctorOption} setDoctorOption={setDoctorOption} setAlertMessage ={props.setAlertMessage}
      setAlertFlag ={props.setAlertFlag}/>)
  }
  {
    doctorOption === "FWupdates" && (<FWUpdates doctorOption={doctorOption} setDoctorOption={setDoctorOption} setAlertMessage ={props.setAlertMessage}
      setAlertFlag ={props.setAlertFlag}/>)
  }
  

  </div> )
};

export default DoctorScreen;
