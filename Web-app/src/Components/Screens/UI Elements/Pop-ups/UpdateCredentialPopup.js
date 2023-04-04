import React, { useEffect, useState, useSyncExternalStore } from "react";
import classes from "./popup.module.css";
import SuperAdminUserRelatedAPIHandler from "../../../../Controllers/SuperAdminUserRelatedAPIHandler";
import MessageComponent from "../../MessageComponent/MessageComponent";

const UpdateCredentialPopup = (props) => {
  const [updatedUserId, setUpdatedUserId] = useState("");
  const [updatedUserPassword, setUpdatedUserPassword] = useState("");

  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});
  const [dataNeedToUpdate, setDataNeedToUpdate] = useState(false);

  useEffect(() => {
    setUserDataToBeUpdated(props.userDataToBeUpdated);
  }, []);

  console.log("userDataToBeUpdated UpdateCredentialPopup pop up");
  console.log(userDataToBeUpdated);

  const UpdatedUserIdChangeHandler = (event) => {
    updateUserData({ userId: event.target.value });
  };
  const UpdatedUserPasswordChangeHandler = (event) => {
    updateUserData({ password: event.target.value });
  };
  const UpdatedUserNameChangeHandler = (event) => {
    updateUserData({ name: event.target.value });
  };
  const UpdatedUserContactChangeHandler = (event) => {
    updateUserData({ contact: event.target.value });
  };
  const UpdatedUserAddressChangeHandler = (event) => {
    updateUserData({ address: event.target.value });
  };
  const updateUserData = (userDataToUpdated) => {
    console.log("updateUserData");
    console.log(userDataToUpdated);

    setUserDataToBeUpdated((userData) => {
      console.log("setUserDataToBeUpdated");
      console.log({ ...userData, ...userDataToUpdated });
      return { ...userData, ...userDataToUpdated };
    });
  };

  const UpdateCredentialSubmitHandler = (event) => {
    event.preventDefault();

    SuperAdminUserRelatedAPIHandler.updateUserData({
      userData: userDataToBeUpdated,
      modifyUserDataResponseHandler: modifyUserDataResponseHandler,
    });
    console.log("UpdateCredentialSubmitHandler userDataToBeUpdated");
    console.log(userDataToBeUpdated);
  };

  const modifyUserDataResponseHandler = (modifiedUserData) => {
    console.log("modifiedUserData");
    console.log(modifiedUserData);

    if (modifiedUserData.errorMessage === null) {
      if (modifiedUserData.isUserDataUpdated === true) {
        updateUserDataSuccessHandler(modifiedUserData.userUpdatedData);
      }
      if (modifiedUserData.isUserDataUpdated === false) {
        showErrroMessage("Some error occured.");
      }
    } else if (modifiedUserData.userUpdatedData === null) {
      showErrroMessage(modifiedUserData.errorMessage);
    }
  };

  const updateUserDataSuccessHandler = (userModifiedData) => {
    console.log("updateUserDataSuccessHandler");
    props.onUserDataUpdateHandler(userModifiedData);
  };

  //message , isErrorMessage
  const showErrroMessage = (message) => {
    // MessageComponent
    MessageComponent.showMessageScreen({
      message: { message: message, isTrueFlag: true },
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
      isErrorMessage: true,
    });
  };

  return (
    <div className={classes.popup}>
      <div className={classes.popup_content}>
        <h2> Update User Data </h2>
        <form onSubmit={UpdateCredentialSubmitHandler}>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userDataToBeUpdated.userId}
            onChange={UpdatedUserIdChangeHandler}
          />

          {/*if userDatatoBeUpdated has userName field than this will be shown  */}
          {userDataToBeUpdated.name && (
            <>
              <label htmlFor="userName">Name:</label>
              <input
                type="text"
                id="userName"
                value={userDataToBeUpdated.name}
                onChange={UpdatedUserNameChangeHandler}
              />
            </>
          )}

          {userDataToBeUpdated.contact && (
            <>
              <label htmlFor="userContact">Contact:</label>
              <input
                type="text"
                id="userContact"
                value={userDataToBeUpdated.contact}
                onChange={UpdatedUserContactChangeHandler}
              />
            </>
          )}

          {userDataToBeUpdated.userAddress &&
            userDataToBeUpdated.userType !== "Supervisor" && (
              <>
                <label htmlFor="userAddress">Address:</label>
                <input
                  type="text"
                  id="userAddress"
                  value={userDataToBeUpdated.userAddress}
                  onChange={UpdatedUserAddressChangeHandler}
                />
              </>
            )}

          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={userDataToBeUpdated.password}
            onChange={UpdatedUserPasswordChangeHandler}
          />

          <input type="submit" value="Update" />
          <button className={classes.close_btn} onClick={props.onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCredentialPopup;
