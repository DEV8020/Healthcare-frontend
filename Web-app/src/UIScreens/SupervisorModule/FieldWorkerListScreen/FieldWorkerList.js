import React, { useState, useEffect } from "react";
import classes from "./FieldWorkerList.module.css";
import AddButton from "../../../Components/Screens/UI Elements/Supervisor UI Elements/addButton";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";
import UpdateCredentialPopup from "../../GenericModule/UpdateUserDataScreen/UpdateCredentialPopup";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import SupervisorUtilitiesKeys from "../../../Utilities/SupervisorUtilitiesKeys/SupervisorUtilitiesKeys";

const FieldWorkerList = (props) => {
  const [fieldWorkerList, setFieldWorkerList] = useState([]);
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({}); //setUserDataToBeUpdated(userDataToBeUpdated);
  const getFieldWorkerDetailsHandler = (fieldWorkerData) => {
    props.fieldWorkerDetailsButtonClickedInChildView(fieldWorkerData);
  };

  const [isRefreshFieldWorkerList, setIsRefreshFieldWorkerList] =
    useState(false);

  console.log("props.fieldWorkerList in field worker list screen");
  console.log(props.fieldWorkerList);

  useEffect(() => {
    SupervisorAPIHandler.getAllFieldWorkerListAPI({
      getAllFieldWorkerListAPIHandler: getAllFieldWorkerListAPIHandler,
    });
  }, [isRefreshFieldWorkerList]);

  const getAllFieldWorkerListAPIHandler = (fieldWorkerListData) => {
    if (fieldWorkerListData.isFieldWorkerListRecieved === true) {
      setFieldWorkerList(fieldWorkerListData.fieldWorkerListData);
    }

    console.log("getAllFieldWorkerListAPIHandler added called response");
    console.log(fieldWorkerListData.fieldWorkerListData);
  };

  const onUserDataUpdateHandler = (userData) => {
    setShowUpdateCredentialPopup(false);
    displayMessagesInParentViewHandler({
      message: "User data updated successfully.",
      isErrorMessage: false,
    });

    setIsRefreshFieldWorkerList((isRefresh) => {
      return !isRefresh;
    });

    // console.log("onUserDataUpdateHandler called in field worker list screen");
  };

  //Create USer Class function
  // const onUserDataUpdateHandler = (UpdateUserData) => {
  //   setShowUpdateCredentialPopup(false);
  //   displayMessagesInParentViewHandler({
  //     message: "User data updated successfully.",
  //     isErrorMessage: false,
  //   });
  //   props.updateUserListAfterDataUpdateHandler();
  // };

  const updateFieldWorkerDetailsHandler = (fieldworkerdata) => {
    // console.log(fieldworkerdata);
    // showUpdateCredentialPopup(true);
    changeUserDataHandler(fieldworkerdata);
    props.resetFieldWorkerDisplaySideView();
    //resetFieldWorkerDisplaySideView
  };

  const handleCredentialPopupClose = () => {
    setShowUpdateCredentialPopup(false);
  };

  const getFieldWorkerAssignedPatientsHandler = (fieldWorkerData) => {
    props.fieldWorkerAssignedPatientListHandler(fieldWorkerData);
  };

  const changeUserDataHandler = (userDataToBeUpdated) => {
    setUserDataToBeUpdated(userDataToBeUpdated);
    setShowUpdateCredentialPopup(true);
    console.log("userDataToBeUpdated userDataToBeUpdated userDataToBeUpdated");
    console.log(userDataToBeUpdated);
  };

  const displayMessagesInParentViewHandler = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesMethods.getIsMessageErrorMessageKey()]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageType],
    });
  };

  // UtilitiesKeys
  // UtilitiesMethods

  // const showMessageAtBottomBar = (prop) => {
  //   console.log(prop);
  //   props.showBottomMessageBar({
  //     [UtilitiesMethods.getErrorMessageKey()]:
  //       prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
  //     [UtilitiesMethods.getIsMessageErrorMessageKey()]:
  //       prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
  //   });
  // };

  console.log(fieldWorkerList);

  return (
    <div className={classes.center}>
      <h2> Field Worker List</h2>

      {fieldWorkerList.length === 0 && (
        <div>
          <h3 style={{ textAlign: "center" }}>No Field Worker to display.</h3>
        </div>
      )}

      <div className={classes.ul}>
        {fieldWorkerList.map((fieldworkerdata) => (
          <div key={fieldworkerdata.authId} className={classes.plist}>
            <div>ID : {fieldworkerdata.authId}</div>
            <div>
              {
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                  .userIDKey
              }{" "}
              : {fieldworkerdata.username}
            </div>
            <div>
              {
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                  .nameKey
              }{" "}
              : {fieldworkerdata.name}
            </div>
            <div>Contact No. : {fieldworkerdata.contact}</div>
            <div>Last Sync Date : {fieldworkerdata.lastSyncDate}</div>

            <div
              style={{
                flexDirection: "row",
              }}
            >
              <AddButton
                value="Details"
                onClick={() => getFieldWorkerDetailsHandler(fieldworkerdata)}
              />

              <AddButton
                value="Assigned Patients"
                onClick={() =>
                  getFieldWorkerAssignedPatientsHandler(fieldworkerdata)
                }
              />

              <AddButton
                value="Update"
                onClick={() => updateFieldWorkerDetailsHandler(fieldworkerdata)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* <UpdateCredentialPopup */}
      {showUpdateCredentialPopup && (
        <UpdateCredentialPopup
          onUserDataUpdateHandler={onUserDataUpdateHandler}
          onClose={handleCredentialPopupClose}
          userDataToBeUpdated={userDataToBeUpdated}
          displayMessagesInParentViewHandler={
            displayMessagesInParentViewHandler
          }
        />
      )}
    </div>
  );
};

export default FieldWorkerList;
