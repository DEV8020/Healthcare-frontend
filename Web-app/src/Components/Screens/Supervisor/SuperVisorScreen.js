import React, { useEffect, useState } from "react";
import NewFollowUpAssign from "./NewFollowUpAssign";
import classes from "./SuperVisorScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import FieldWorkerList from "./FieldWorkerList";
import FieldWorkerDetails from "../FieldWorker/FieldWorkerDetails";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import FieldWorkerRegistration from "./FieldWorkerRegistration";

const SuperVisorScreen = (props) => {
  const [superVisorOption, setSuperVisorOption] = useState("superVisor");
  const [fieldWorkerStatus, setFieldWorkerStatus] = useState(false);
  const [fieldWorkerList, setFieldWorkerList] = useState([]);
  const [fieldWorkerFollowUpsList, setFieldWorkerFollowUpsList] = useState([]);

  const loadFieldWorkerDetailsData = (fieldWorkerData) => {
    console.log("loadFieldWorkerDetailsData");
    console.log(fieldWorkerData);

    SupervisorAPIHandler.GetFieldWorkerFollowUpsAPICall({
      fieldWorkerData: fieldWorkerData,
      getFieldWorkerFollowUpsAPIHandler: getFieldWorkerFollowUpsAPIHandler,
    });
  };

  const getFieldWorkerFollowUpsAPIHandler = (fieldWorkerDetailsData) => {
    console.log("UnassignedFollowUpsData added called response");
    console.log(fieldWorkerDetailsData);
    console.log(fieldWorkerDetailsData.FollowUpsData);

    if (fieldWorkerDetailsData.isFollowUpsDataRecieved === true) {
      setFieldWorkerFollowUpsList(fieldWorkerDetailsData.FollowUpsData);
    } else {
      showMessageAtBottomBar({
        message: fieldWorkerDetailsData.errorMessage,
        isErrorMessage: true,
      });
    }
  };

  const showMessageAtBottomBar = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  const NewFollowUpAssignButtonHandler = () => {
    setSuperVisorOption("NewFollowUpAssign");
    setFieldWorkerStatus(false);
  };
  const FieldWorkerListButtonHandler = () => {
    setSuperVisorOption("FieldWorkerList");
  };

  const FieldWorkerRegistrationButtonHandler = () => {
    setSuperVisorOption("FieldWorkerRegistration");
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
          setAlertFlag={props.setAlertFlag}
          setAlertMessage={props.setAlertMessage}
          showMessageAtBottomBar={showMessageAtBottomBar}
          //assignPendingFollowUpHandler={assignPendingFollowUpHandler}
        />
      )}
      {superVisorOption === "FieldWorkerList" && (
        <FieldWorkerList
          superVisorOption={superVisorOption}
          setSuperVisorOption={setSuperVisorOption}
          setAlertFlag={props.setAlertFlag}
          setAlertMessage={props.setAlertMessage}
          setFieldWorkerStatus={setFieldWorkerStatus}
          fieldWorkerList={fieldWorkerList}
          showMessageAtBottomBar={showMessageAtBottomBar}
          loadFieldWorkerDetailsData={loadFieldWorkerDetailsData}
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
      {fieldWorkerStatus === true && (
        <FieldWorkerDetails
          fieldWorkerFollowUpsList={fieldWorkerFollowUpsList}
          showMessageAtBottomBar={showMessageAtBottomBar}
        />
      )}
    </div>
  );
};

export default SuperVisorScreen;
