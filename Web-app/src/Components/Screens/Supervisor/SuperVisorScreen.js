import React, { useEffect, useState } from "react";
import NewFollowUpAssign from "./NewFollowUpAssign";
import classes from "./SuperVisorScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import FieldWorkerList from "./FieldWorkerList";
import FieldWorkerDetails from "../FieldWorker/FieldWorkerDetails";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const SuperVisorScreen = (props) => {
  const [superVisorOption, setSuperVisorOption] = useState("superVisor");
  const [fieldWorkerStatus, setFieldWorkerStatus] = useState(false);
  const [fieldWorkerList, setFieldWorkerList] = useState([]);
  const [selectedFieldWorkerDetailsData, setSelectedFieldWorkerDetailsData] =
    useState([]);
  const [unassignedFollowUpsList, setUnassignedFollowUpsList] = useState([]);

  useEffect(() => {
    //Hard Coded supervisor ID...
    SupervisorAPIHandler.getAllFieldWorkerListAPI({
      supervisorID: "supervisorID",
      getAllFieldWorkerListAPIHandler: getAllFieldWorkerListAPIHandler,
    });
  }, []);

  const getAllFieldWorkerListAPIHandler = (fieldWorkerListData) => {
    setFieldWorkerList(fieldWorkerListData.fieldWorkerListData);
    console.log("getAllFieldWorkerListAPIHandler added called response");
    console.log(fieldWorkerListData.fieldWorkerListData);
  };

  //Method to get the Unassigned Follows Ups for a supervisor...
  useEffect(() => {
    //Hard Coded supervisor ID...
    SupervisorAPIHandler.GetSupervisorUnassignedFollowUpsAPICall({
      supervisorID: "supervisorID",
      getUnassignedFollowUpsAPIHandler: getUnassignedFollowUpsAPIHandler,
    });
  }, [superVisorOption]);

  const loadFieldWorkerDetailsData = (fieldWorkerData) => {
    console.log("loadFieldWorkerDetailsData");
    console.log(fieldWorkerData);

    SupervisorAPIHandler.GetFieldWorkerDetailsAPICall({
      fieldWorkerData: fieldWorkerData,
      getFieldWorkerDetailsAPIHandler: getFieldWorkerDetailsAPIHandler,
    });
  };


  
  const getUnassignedFollowUpsAPIHandler = (fieldWorkerDetailsData) => {
    // setFieldWorkerList(fieldWorkerListData.fieldWorkerListData);
    console.log("getAllFieldWorkerListAPIHandler added called response");
    console.log(fieldWorkerDetailsData.fieldWorkerListData);
  };

  const getFieldWorkerDetailsAPIHandler = (fieldWorkerDetailsData) => {
    setFieldWorkerList(fieldWorkerDetailsData.fieldWorkerListData);
    console.log("UnassignedFollowUpsData added called response");
    console.log(fieldWorkerDetailsData.fieldWorkerListData);
  };

  // const assignPendingFollowUpHandler = (prop) => {
  //   console.log("assignPendingFollowUpHandler called");
  //   console.log(prop);
  // };

  // const getUnassignedFollowUpsAPIHandler = (fieldWorkerDetailsData) => {
  //   // setFieldWorkerList(fieldWorkerListData.fieldWorkerListData);
  //   console.log("getAllFieldWorkerListAPIHandler added called response");
  //   console.log(fieldWorkerDetailsData.fieldWorkerListData);
  // };

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

  const logoutSV = () => {
    window.localStorage.removeItem("loggedInUser");
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
      {fieldWorkerStatus === true && <FieldWorkerDetails />}
    </div>
  );
};

export default SuperVisorScreen;
