import React, { useState } from "react";
import PatientRegistration from "../PatientRegistrationScreen/PatientRegistration";
import classes from "./FrontDeskScreen.module.css";
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";
import Button from "../../../Components/Screens/UI Elements/Button/Button";
import CreateAppointment from "../CreateAppointmentScreen/CreateAppointment";
import PatientDetailsView from "../PatientDetailsScreen/PatientDetailsView";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import PatientSearchList from "../PatientSearchListScreen/PatientSearchList";

const FrontDeskScreen = (props) => {
  const [frontDeskOption, setFrontDeskOption] = useState("frontDesk");
  const [patientDetailsView, setPatientDetailsView] = useState(false);
  const [viewDetalsPatientID, setViewDetalsPatientID] = useState("");
  const [isSearchViewEnabled, setIsSearchViewEnabled] = useState(false);
  const [patientNameToSearch, setPatientNameToSearch] = useState("");
  const [isDetailViewNeedRefresh, setIsDetailViewNeedRefresh] = useState(false);

  const PatientRegistrationButtonHandler = () => {
    setFrontDeskOption("PatientRegistration");
    resetPatientDetailViewFlags();
  };
  const CreateAppointmentButtonHandler = () => {
    setFrontDeskOption("CreateAppointment");
    resetPatientDetailViewFlags();
  };

  const searchButtonPressHandler = (patientName) => {
    console.log("searchButtonPressHandler");
    console.log(patientName);
    setIsDetailViewNeedRefresh((isRefresh) => {
      return !isRefresh;
    });
    setPatientNameToSearch(patientName);
    setIsSearchViewEnabled(true);
  };

  const resetPatientDetailViewFlags = () => {
    setPatientDetailsView(false);
    setIsSearchViewEnabled(false);
  };

  const patientDetailsButtonPressedHandler = (PatientId) => {
    resetPatientDetailViewFlags();
    setViewDetalsPatientID(PatientId);
    setPatientDetailsView(true);
    console.log("patientDetailsButtonPressedHandler");
  };

  //Message to display the Bottom Message Display Bar...
  const showMessageBarAtTheBottom = (propData) => {
    props.showBottomMessageBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        propData[UtilitiesMethods.getErrorMessageKey()],
      [UtilitiesMethods.getIsMessageErrorMessageKey()]:
        propData[UtilitiesMethods.getIsMessageErrorMessageKey()],
    });
  };

  const logoutFD = () => {
    window.localStorage.removeItem("loggedInUser");
    UtilitiesMethods.cleanUpUserDataOnLogOut();
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
          showMessageBarAtTheBottom={showMessageBarAtTheBottom}
          resetPatientDetailViewFlags={resetPatientDetailViewFlags}
          searchButtonPressHandler={searchButtonPressHandler}
          patientDetailsButtonPressedHandler={
            patientDetailsButtonPressedHandler
          }
        />
      )}
      {patientDetailsView === true && (
        <PatientDetailsView
          showMessageBarAtTheBottom={showMessageBarAtTheBottom}
          setPatientDetailsView={setPatientDetailsView}
          viewDetalsPatientID={viewDetalsPatientID}
        />
      )}

      {isSearchViewEnabled === true && (
        <PatientSearchList
          isSearchViewEnabled={isSearchViewEnabled}
          patientNameToSearch={patientNameToSearch}
        />
      )}
    </div>
  );
};

export default FrontDeskScreen;
