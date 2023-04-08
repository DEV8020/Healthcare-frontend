import React, { useState, useEffect } from "react";
// import PatientData from "./PatientData";
import classes from "./DoctorScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import NewEncounter from "./NewEncounter";
import EncounterScreen from "./EncounterScreen";
import FieldWorkerUpdates from "./FieldWorkerUpdates";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import DoctorAPIHandler from "../../../Controllers/DoctorAPIHandler";

const DoctorScreen = (props) => {
  const [doctorOption, setDoctorOption] = useState("");
  const [createEncounter, setCreateEncounter] = useState(false);
  const [isFollowUpListNeedToRefresh, setIsFollowUpListNeedToRefresh] =
    useState(false);
  const [isDoctorEncounterToRefresh, setIsDoctorEncounterToRefresh] =
    useState(false);
    const [doctorEncounterData, setDoctorEncounterData] =
    useState([]);
    const [selectedDoctorEncounterData, setSelectedDoctorEncounterData] =
    useState({});

  // const [doctorOption, setDoctorOption] = useState("");

  const showMessageHandler = (prop) => {
    showMessageBarAtTheBottom(prop);
  };

  //Use Effect Block to load Follow Ups List for the Doctor...
  useEffect(() => {
    DoctorAPIHandler.getDoctorEncounterUpdates({
      doctorEncounterUpdatesData: doctorEncounterUpdatesData,
    });
  }, [isDoctorEncounterToRefresh]);

  // isEncounterDataRecieved: true,
  // encounterData: encounterData.responseData.data,
  // errorMessage: null,


  //Call Back Method for recieving Doctor Encounter data...
  const doctorEncounterUpdatesData = (doctorEncounterData) => {
    console.log("doctorEncounterData called");
    console.log(doctorEncounterData);
    // setDoctorEncounterData([{}]);
    if (doctorEncounterData.isEncounterDataRecieved === false) {
      showMessageHandler({
        message: doctorEncounterData.errorMessage,
        isErrorMessage: true,
      });
      return;
    }
    // console.log("setDoctorEncounterData(doctorEncounterData.encounterData);");
    // console.log(doctorEncounterData.encounterData);
    setDoctorEncounterData(doctorEncounterData.encounterData);
  };

  const showMessageBarAtTheBottom = (propData) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: propData.message,
      isErrorMessage: propData.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  const logoutD = () => {
    window.localStorage.removeItem("loggedInUser");
    UtilitiesMethods.cleanUpUserDataOnLogOut();
    props.setUser(null);
  };
  if (!props.user) return null;

  const NewEncounterButtonHandler = () => {
    setDoctorOption("NewEncounter");
    refreshDoctorEncounterListHanlder();
  };
  const FieldWorkerUpdateButtonHandler = () => {
    setDoctorOption("FWupdates");
    refreshFollowUpListHanlder();
  };

const encounterCreateDataHandler = (encounterData) => {
console.log("encounterCreateDataHandler called in doctor screen js");
  console.log(encounterData);
  setSelectedDoctorEncounterData(encounterData);
};




  //Method to change the Refresh Variable and Load the follow up list...
  const refreshFollowUpListHanlder = () => {
    // console.log("refreshFollowUpListHanlder called");
    setIsFollowUpListNeedToRefresh((isRefresh) => {
      return !isRefresh;
    });
  };

   //Method to change the Refresh Variable and Load the Encounter Data...
  const refreshDoctorEncounterListHanlder = () => {
    // console.log("refreshFollowUpListHanlder called");
    setIsDoctorEncounterToRefresh((isRefresh) => {
      return !isRefresh;
    });
  };

  return (
    <div>
      {createEncounter === true && (
        <EncounterScreen
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          setCreateEncounter={setCreateEncounter}
          selectedDoctorEncounterData={selectedDoctorEncounterData}
        />
      )}
      {createEncounter === false && (
        <div>
          <NavBar value="Log-out" label="Doctor" onClick={logoutD} />
          <div className={classes.center}>
            <h2> Doctor Menu</h2>

            <div className={classes.Doctor_menu}>
              <Button
                value="New Encounter"
                onClick={NewEncounterButtonHandler}
              />

              <Button
                value="Field-Worker Updates"
                onClick={FieldWorkerUpdateButtonHandler}
              />
            </div>
          </div>

          {doctorOption === "NewEncounter" && (
            <NewEncounter
              doctorOption={doctorOption}
              setDoctorOption={setDoctorOption}
              setAlertMessage={props.setAlertMessage}
              setAlertFlag={props.setAlertFlag}
              setCreateEncounter={setCreateEncounter}
              doctorEncounterData = {doctorEncounterData}
              encounterCreateDataHandler={encounterCreateDataHandler}
            />
          )}
          {doctorOption === "FWupdates" && (
            <FieldWorkerUpdates
              doctorOption={doctorOption}
              setDoctorOption={setDoctorOption}
              setAlertMessage={props.setAlertMessage}
              setAlertFlag={props.setAlertFlag}
              isFollowUpListNeedToRefresh={isFollowUpListNeedToRefresh}
              showMessageHandler={showMessageHandler}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorScreen;
