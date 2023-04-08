import React, { useState } from "react";
import PatientRegistration from "./PatientRegistration";
import classes from "./FrontDeskScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import CreateAppointment from "./CreateAppointment";
import PatientDetailsView from "../Patient/PatientDetailsView";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const FrontDeskScreen = (props) => {
  const [frontDeskOption, setFrontDeskOption] = useState("frontDesk");
  const [patientDetailsView, setPatientDetailsView] = useState(false);
  const [viewDetalsPatientID, setViewDetalsPatientID] = useState("");


  const PatientRegistrationButtonHandler = () => {
    setFrontDeskOption("PatientRegistration");
  };
  const CreateAppointmentButtonHandler = () => {
    setFrontDeskOption("CreateAppointment");
  };

  const showMessageBarAtTheBottom = (propData) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: propData.message,
      isErrorMessage: propData.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
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
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
        />
      )}
      {frontDeskOption === "CreateAppointment" && (
        <CreateAppointment
          frontDeskOption={frontDeskOption}
          setFrontDeskOption={setFrontDeskOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          setPatientDetailsView={setPatientDetailsView}
          setViewDetalsPatientID={setViewDetalsPatientID}
        />
      )}
      {patientDetailsView === true && (
        <PatientDetailsView
          showMessageBarAtTheBottom={showMessageBarAtTheBottom}
          setPatientDetailsView={setPatientDetailsView}
          viewDetalsPatientID={viewDetalsPatientID}
        />
      )}
    </div>
  );
};

export default FrontDeskScreen;
