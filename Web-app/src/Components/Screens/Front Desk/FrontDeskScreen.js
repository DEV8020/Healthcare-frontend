import React, { useState } from "react";
import PatientRegistration from "./PatientRegistration";
import classes from "./FrontDeskScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import CreateAppointment from "./CreateAppointment";

const FrontDeskScreen = (props) => {
  const [frontDeskOption, setFrontDeskOption] = useState("frontDesk");

  const PatientRegistrationButtonHandler = () => {
    setFrontDeskOption("PatientRegistration");
  };
  const CreateAppointmentButtonHandler = () => {
    setFrontDeskOption("CreateAppointment");
  };

  const logoutFD = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  return (
    <div>
      <NavBar value="Log-out" label="FrontDesk" onClick={logoutFD} />

      <div className={classes.center}>
        <h2> FrontDesk Menu</h2>

        <div className={classes.FD_menu}>
          <Button
            value="Patient Registration"
            onClick={PatientRegistrationButtonHandler}
          />

          <Button
            value="Create Appointment"
            onClick={CreateAppointmentButtonHandler}
          />
        </div>
      </div>

      {frontDeskOption === "PatientRegistration" && (
        <PatientRegistration
        frontDeskOption={frontDeskOption}
        setFrontDeskOption={setFrontDeskOption}
        setAlertMessage ={props.setAlertMessage}
        setAlertFlag ={props.setAlertFlag}
      />
      )}
      {frontDeskOption === "CreateAppointment" && (
        <CreateAppointment
        frontDeskOption={frontDeskOption}
        setFrontDeskOption={setFrontDeskOption} 
        setAlertMessage ={props.setAlertMessage}
        setAlertFlag ={props.setAlertFlag}
      />
        
      )}
    </div>
  );
};

export default FrontDeskScreen;
