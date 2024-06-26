import React, { useState } from "react";
import PatientRegistration from "../PatientRegistrationScreen/PatientRegistration";
import classes from "./FrontDeskScreen.module.css";
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";
import Button from "../../../Components/Screens/UI Elements/Button/Button";
import CreateAppointment from "../CreateAppointmentScreen/CreateAppointment";
import PatientDetailsView from "../PatientDetailsScreen/PatientDetailsView";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import PatientSearchList from "../PatientSearchListScreen/PatientSearchList";
import FrontDeskUtilitiesKeys from "../../../Utilities/FrontDeskUtilitiesKeys/FrontDeskUtilitiesKeys";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const FrontDeskScreen = (props) => {
  const [frontDeskOption, setFrontDeskOption] = useState(
    FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsNameKeys()
      .createAppointmentKey
  );
  const [patientDetailsView, setPatientDetailsView] = useState(false);
  const [viewDetalsPatientID, setViewDetalsPatientID] = useState("");
  const [isSearchViewEnabled, setIsSearchViewEnabled] = useState(false);
  const [patientNameToSearch, setPatientNameToSearch] = useState("");
  const [isDetailViewNeedRefresh, setIsDetailViewNeedRefresh] = useState(false);

  const PatientRegistrationButtonHandler = () => {
    setFrontDeskOption(
      FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsNameKeys()
        .patientRegistrationKey
    );
    resetPatientDetailViewFlags();
  };
  const CreateAppointmentButtonHandler = () => {
    setFrontDeskOption(
      FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsNameKeys()
        .createAppointmentKey
    );
    resetPatientDetailViewFlags();
  };

  const searchButtonPressHandler = (patientName) => {

    if (UtilitiesMethods.getSpaceTrimmedLenght(patientName) === 0) {
      showMessageBarAtTheBottom({
        [UtilitiesMethods.getErrorMessageKey()]:
          "Please enter patient id to search. It can't be left blank.",
        [UtilitiesMethods.getIsMessageErrorMessageKey()]:
          true,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().warningKey
      });
      return;
    }

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
    // setFrontDeskOption(
    //   FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsNameKeys()
    //     .patientRegistrationKey
    // );
  };

  //Message to display the Bottom Message Display Bar...
  const showMessageBarAtTheBottom = (propData) => {
    props.showBottomMessageBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        propData[UtilitiesMethods.getErrorMessageKey()],
      [UtilitiesMethods.getIsMessageErrorMessageKey()]:
        propData[UtilitiesMethods.getIsMessageErrorMessageKey()],
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        propData[
            UtilitiesKeys.getErrorMessageDataKeys().messageType
        ],
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
      <NavBar
        value={UtilitiesKeys.getLogOutButtonText()}
        label="FrontDesk"
        onClick={logoutFD}
      />

      <div className={classes.center}>
        <h2> FrontDesk Menu</h2>

        <div className={classes.FD_menu}>
          <Button
            value={
              FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsLabelKeys()
                .patientRegistrationKey
            }
            onClick={PatientRegistrationButtonHandler}
          />

          <Button
            value={
              FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsLabelKeys()
                .createAppointmentKey
            }
            onClick={CreateAppointmentButtonHandler}
          />
        </div>
      </div>

      {frontDeskOption ===
        FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsNameKeys()
          .patientRegistrationKey && (
        <PatientRegistration
          frontDeskOption={frontDeskOption}
          setFrontDeskOption={setFrontDeskOption}
          showMessageBarAtTheBottom={showMessageBarAtTheBottom}
        />
      )}

      {frontDeskOption ===
        FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsNameKeys()
          .createAppointmentKey && (
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
