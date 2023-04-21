import React, { useState, useEffect } from "react";
import classes from "./DoctorScreen.module.css";
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";
import Button from "../../../Components/Screens/UI Elements/Button/Button";
import NewEncounter from "../EncounterModule/EncounterScreen/NewEncounter";
import EncounterScreen from "../EncounterModule/EncounterScreen/EncounterScreen";
import FieldWorkerUpdates from "../EncounterModule/FieldWorkerUpdatesScreen/FieldWorkerUpdates";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import DoctorAPIHandler from "../../../Controllers/DoctorAPIHandler";
import DoctorUtilitiesKeys from "../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const DoctorScreen = (props) => {
  const [doctorOption, setDoctorOption] = useState(DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys().newEncounterKey);
  const [createEncounter, setCreateEncounter] = useState(false);
  const [isFollowUpListNeedToRefresh, setIsFollowUpListNeedToRefresh] =
    useState(false);
  const [isDoctorEncounterToRefresh, setIsDoctorEncounterToRefresh] =
    useState(false);
  const [doctorEncounterData, setDoctorEncounterData] = useState([]);
  const [selectedDoctorEncounterData, setSelectedDoctorEncounterData] =
    useState({});

  const [selectedEncounterID, setSelectedEncounterID] = useState("");
  

  const showMessageHandler = (prop) => {
    showMessageBarAtTheBottom(prop);
  };

  //Use Effect Block to load Follow Ups List for the Doctor...
  useEffect(() => {
    DoctorAPIHandler.getDoctorEncounterUpdates({
      doctorEncounterUpdatesData: doctorEncounterUpdatesData,
    });
  }, [isDoctorEncounterToRefresh]);


  //Call Back Method for recieving Doctor Encounter data...
  const doctorEncounterUpdatesData = (doctorEncounterData) => {
    console.log("doctorEncounterData called");
    console.log(doctorEncounterData);
    // setDoctorEncounterData([{}]);
    if (doctorEncounterData.isEncounterDataRecieved === false) {
      setDoctorEncounterData([]);
      showMessageHandler({
        message: doctorEncounterData.errorMessage,
        isErrorMessage: true,
      });
      return;
    }
    setDoctorEncounterData(doctorEncounterData.encounterData);
  };

  const showMessageBarAtTheBottom = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
    });
  }


  const logoutD = () => {
    window.localStorage.removeItem("loggedInUser");
    UtilitiesMethods.cleanUpUserDataOnLogOut();
    props.setUser(null);
  };
  if (!props.user) return null;

  const NewEncounterButtonHandler = () => {
    setDoctorOption(DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys().newEncounterKey);
    refreshDoctorEncounterListHanlder();
  };
  const FieldWorkerUpdateButtonHandler = () => {
    setDoctorOption(DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys().patientUpdateKey);
    refreshFollowUpListHanlder();
  };

  const encounterCreateDataHandler = (encounterData) => {
    console.log("encounterCreateDataHandler called in doctor screen js");
    console.log(encounterData);
    setSelectedDoctorEncounterData(encounterData);
    setSelectedEncounterID(encounterData.encounterId);
    console.log(selectedEncounterID);
  };

  //Method to change the Refresh Variable and Load the follow up list...
  const refreshFollowUpListHanlder = () => {
    setIsFollowUpListNeedToRefresh((isRefresh) => {
      return !isRefresh;
    });
  };

  //Method to change the Refresh Variable and Load the Encounter Data...
  const refreshDoctorEncounterListHanlder = () => {
    setIsDoctorEncounterToRefresh((isRefresh) => {
      return !isRefresh;
    });
  };

  return (
    <div>
      {createEncounter === true && (
        <EncounterScreen
          showMessageBarAtTheBottom={showMessageBarAtTheBottom}
          setCreateEncounter={setCreateEncounter}
          selectedDoctorEncounterData={selectedDoctorEncounterData}
          selectedEncounterID={selectedEncounterID}
          refreshDoctorEncounterListHanlder={refreshDoctorEncounterListHanlder}
        />
      )}
      {createEncounter === false && (
        <div>
          <NavBar
            value={UtilitiesKeys.getLogOutButtonText()}
            label="Doctor"
            onClick={logoutD}
          />
          <div className={classes.center}>
            <h2> Doctor Menu</h2>

            <div className={classes.Doctor_menu}>
              <Button
                value={
                  DoctorUtilitiesKeys.getDoctorMenuOptionsLabelKeys()
                    .newEncounterKey
                }
                onClick={NewEncounterButtonHandler}
              />

              <Button
                value={
                  DoctorUtilitiesKeys.getDoctorMenuOptionsLabelKeys()
                    .patientUpdateKey
                }
                onClick={FieldWorkerUpdateButtonHandler}
              />
            </div>
          </div>

          {doctorOption ===
            DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys()
              .newEncounterKey && (
            <NewEncounter
              setCreateEncounter={setCreateEncounter}
              doctorEncounterData={doctorEncounterData}
              encounterCreateDataHandler={encounterCreateDataHandler}
              selectedEncounterID={selectedEncounterID}
              showMessageAtBottomBar={showMessageHandler}
            />
          )}
          {doctorOption ===
            DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys()
              .patientUpdateKey && (
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
