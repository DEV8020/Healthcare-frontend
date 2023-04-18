import React, { useState } from "react";
import NewFollowUpAssign from "../NewFollowUpAssignmentScreen/NewFollowUpAssign";
import classes from "./SuperVisorScreen.module.css";
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";
import Button from "../../../Components/Screens/UI Elements/Button/Button";
import FieldWorkerList from "../FieldWorkerListScreen/FieldWorkerList";
import FieldWorkerDetails from "../FieldWorkerDetailScreen/FieldWorkerDetails";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import FieldWorkerRegistration from "../FieldWorkerRegistrationScreen/FieldWorkerRegistration";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const SuperVisorScreen = (props) => {
  const [superVisorOption, setSuperVisorOption] = useState("superVisor");
  const [fieldWorkerStatus, setFieldWorkerStatus] = useState(false);
  const [fieldWorkerList, setFieldWorkerList] = useState([]);
  const [fieldWorkerFollowUpsList, setFieldWorkerFollowUpsList] = useState([]);
  const [isShowAssignedPatientList, setIsShowAssignedPatientList] =
    useState(false);
  const [fieldWorkerAssignedPatientsList, setFieldWorkerAssignedPatientsList] =
    useState([]);


  const loadFieldWorkerDetailsData = (fieldWorkerData) => {
    // console.log("loadFieldWorkerDetailsData");
    // console.log(fieldWorkerData);

    resetFieldWorkerDataList();

    SupervisorAPIHandler.GetFieldWorkerFollowUpsAPICall({
      fieldWorkerData: fieldWorkerData,
      getFieldWorkerFollowUpsAPIHandler: getFieldWorkerFollowUpsAPIHandler,
    });
  };

  const getFieldWorkerFollowUpsAPIHandler = (fieldWorkerDetailsData) => {
    // console.log("UnassignedFollowUpsData added called response");
    // console.log(fieldWorkerDetailsData);
    // console.log(fieldWorkerDetailsData.FollowUpsData);

    if (fieldWorkerDetailsData.isFollowUpsDataRecieved === false) {
      showMessageAtBottomBar({
        message: fieldWorkerDetailsData.errorMessage,
        isErrorMessage: true,
      });
    }
    setFieldWorkerFollowUpsList(fieldWorkerDetailsData.FollowUpsData);
  };

  const showMessageAtBottomBar = (prop) => {
    console.log(prop);
    props.showBottomMessageBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
        [UtilitiesMethods.getIsMessageErrorMessageKey()]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
    });
  };

  const fieldWorkerDetailsButtonClickedInChildView = (fieldWorkerData) => {
    console.log("fieldWorkerDetailsButtonClickedInChildView");
    console.log(fieldWorkerData);
    resetFieldWorkerDataList();

    showMessageAtBottomBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        "Selected Field Worker : " + fieldWorkerData.name,
        [UtilitiesMethods.getIsMessageErrorMessageKey()]: false,
    });
    setFieldWorkerStatus(true);
    loadFieldWorkerDetailsData(fieldWorkerData);
  };


  const fieldWorkerAssignedPatientListHandler = (fieldWorkerData) => {
    console.log("fieldWorkerAssignedPatientListHandler");
    console.log(fieldWorkerData);

    showMessageAtBottomBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        "Selected Field Worker : " + fieldWorkerData.name,
        [UtilitiesMethods.getIsMessageErrorMessageKey()]: false,
    });
    resetFieldWorkerDisplaySideView();
    setIsShowAssignedPatientList(true);
    loadFieldWorkerAssignedPatientData(fieldWorkerData);
  };




  
  const loadFieldWorkerAssignedPatientData = (fieldWorkerData) => {
    console.log("loadFieldWorkerDetailsData");
    console.log(fieldWorkerData);
    resetFieldWorkerDataList();

    SupervisorAPIHandler.GetFieldWorkerAssignedPatientsListAPICall({
      fieldWorkerData: fieldWorkerData,
      getAssignedPatientsAPIHandler: getAssignedPatientsAPIHandler,
    });
  };

  const getAssignedPatientsAPIHandler = (fieldWorkerAssignedPatientsData) => {
    console.log("fieldWorkerAssignedPatientsData");
    console.log(fieldWorkerAssignedPatientsData);
    if (fieldWorkerAssignedPatientsData.isPatientsListRecieved === false) {
      showMessageAtBottomBar({
        message: fieldWorkerAssignedPatientsData.errorMessage,
        isErrorMessage: true,
      });
    } 
    setFieldWorkerAssignedPatientsList(fieldWorkerAssignedPatientsData.assignedPatientsListData);
  };




  const NewFollowUpAssignButtonHandler = () => {
    setSuperVisorOption("NewFollowUpAssign");
    resetFieldWorkerDisplaySideView();
  };
  const FieldWorkerListButtonHandler = () => {
    setSuperVisorOption("FieldWorkerList");
  };

  const FieldWorkerRegistrationButtonHandler = () => {
    setSuperVisorOption("FieldWorkerRegistration");
    resetFieldWorkerDisplaySideView();
  };

  const resetFieldWorkerDataList = () => {
     setFieldWorkerAssignedPatientsList([]);
    setFieldWorkerFollowUpsList([]);
  }

  const resetFieldWorkerDisplaySideView = () => {
    resetFieldWorkerDataList();
    setFieldWorkerStatus(false);
    setIsShowAssignedPatientList(false);
  };

  const logoutSV = () => {
    window.localStorage.removeItem("loggedInUser");
    UtilitiesMethods.cleanUpUserDataOnLogOut();
    props.setUser(null);
  };
  if (!props.user) return null;

  return (
    <div>
      <NavBar value="Log-out" label="SuperVisor" onClick={logoutSV} />

      <div className={classes.center}>
        <h2> SuperVisor Menu</h2>

        <div className={classes.SV_menu}>
          <Button
            value="Assign Follow ups"
            onClick={NewFollowUpAssignButtonHandler}
          />

          <Button
            value="Field Worker List"
            onClick={FieldWorkerListButtonHandler}
          />

          <Button
            value="Field Worker Registration"
            onClick={FieldWorkerRegistrationButtonHandler}
          />
        </div>
      </div>

      {superVisorOption === "NewFollowUpAssign" && (
        <NewFollowUpAssign
          superVisorOption={superVisorOption}
          setSuperVisorOption={setSuperVisorOption}
          showMessageAtBottomBar={showMessageAtBottomBar}
        />
      )}
      {superVisorOption === "FieldWorkerList" && (
        <FieldWorkerList
          fieldWorkerList={fieldWorkerList}
          fieldWorkerDetailsButtonClickedInChildView={
            fieldWorkerDetailsButtonClickedInChildView
          }
          fieldWorkerAssignedPatientListHandler={fieldWorkerAssignedPatientListHandler}
        />
      )}
      {superVisorOption === "FieldWorkerRegistration" && (
        <FieldWorkerRegistration
          superVisorOption={superVisorOption}
          setSuperVisorOption={setSuperVisorOption}
          setAlertFlag={props.setAlertFlag}
          setAlertMessage={props.setAlertMessage}
        />
      )}
      {(fieldWorkerStatus === true || isShowAssignedPatientList === true) && (
        <FieldWorkerDetails
          fieldWorkerFollowUpsList={fieldWorkerFollowUpsList}
          showMessageAtBottomBar={showMessageAtBottomBar}
          fieldWorkerAssignedPatientsList={fieldWorkerAssignedPatientsList}
          isFieldWorkerDetailViewSelected={fieldWorkerStatus}
        />
      )}
    </div>
  );
};

export default SuperVisorScreen;
