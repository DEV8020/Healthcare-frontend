import React, { useEffect, useState, useSyncExternalStore } from "react";
import classes from "./popup.module.css";
import SuperAdminUserRelatedAPIHandler from "../../../../Controllers/SuperAdminUserRelatedAPIHandler";
import MessageComponent from "../../MessageComponent/MessageComponent";
import UtilitiesMethods from "../../../../Utilities/UtilitiesMethods";

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

  //########################## Data Handler Methods  ##########################
  //User ID Change Handler...
  const UpdatedUserIdChangeHandler = (event) => {
    updateUserData({ userId: event.target.value });
  };

  //User Password Change Handler...
  const UpdatedUserPasswordChangeHandler = (event) => {
    updateUserData({ password: event.target.value });
  };

  //User Name Change Handler...
  const UpdatedUserNameChangeHandler = (event) => {
    updateUserData({ name: event.target.value });
  };

  //User Contact Change Handler...
  const UpdatedUserContactChangeHandler = (event) => {
    updateUserData({ contact: event.target.value });
  };

  //User Address Change Handler...
  const UpdatedUserAddressChangeHandler = (event) => {
    updateUserData({ address: event.target.value });
  };
  //########################## Data Handler Methods Ends Here  ##########################

  const updateUserData = (userDataToUpdated) => {
    // console.log("updateUserData");
    // console.log(userDataToUpdated);

    setUserDataToBeUpdated((userData) => {
      // console.log("setUserDataToBeUpdated");
      // console.log({ ...userData, ...userDataToUpdated });
      return { ...userData, ...userDataToUpdated };
    });
  };

  const UpdateCredentialSubmitHandler = (event) => {
    event.preventDefault();

    if (
      UtilitiesMethods.getSpaceTrimmedLenght(userDataToBeUpdated.userId) === 0
    ) {
      props.displayMessagesInParentViewHandler({
        message: "Please enter user Id to proceed, It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    if (
      UtilitiesMethods.getSpaceTrimmedLenght(userDataToBeUpdated.name) === 0
    ) {
      props.displayMessagesInParentViewHandler({
        message: "Please enter name to proceed, It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    if (
      UtilitiesMethods.getSpaceTrimmedLenght(userDataToBeUpdated.password) === 0
    ) {
      props.displayMessagesInParentViewHandler({
        message: "Please enter password to proceed, It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    SuperAdminUserRelatedAPIHandler.updateUserData({
      userData: userDataToBeUpdated,
      modifyUserDataResponseHandler: modifyUserDataResponseHandler,
    });
  };

  const modifyUserDataResponseHandler = (modifiedUserData) => {
    if (modifiedUserData.errorMessage === null) {
      if (modifiedUserData.isUserDataUpdated === true) {
        updateUserDataSuccessHandler(modifiedUserData.userUpdatedData);
      }
      if (modifiedUserData.isUserDataUpdated === false) {
        showErrorMessage({
          message: "Some error occured.",
          isErrorMessage: true,
        });
      }
    } else if (modifiedUserData.userUpdatedData === null) {
      showErrorMessage({
        message: modifiedUserData.errorMessage,
        isErrorMessage: true,
      });
    }
  };

  const updateUserDataSuccessHandler = (userModifiedData) => {
    console.log("updateUserDataSuccessHandler");
    props.onUserDataUpdateHandler(userModifiedData);
  };

  //message , isErrorMessage
  const showErrorMessage = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      setAlertMessageElement: props.setAlertMessage,
      setAlertMessageFlag: props.setAlertFlag,
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
          
              <label htmlFor="userName">Name:</label>
              <input
                type="text"
                id="userName"
                value={userDataToBeUpdated.name}
                onChange={UpdatedUserNameChangeHandler}
              />
            
          {userDataToBeUpdated.userType !== "Admin" && (
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


          {userDataToBeUpdated.userType !== "Admin" &&
            userDataToBeUpdated.userType !== "Supervisor" && (
              <>
                <label htmlFor="userAddress">Address:</label>
                <input
                  type="text"
                  id="userAddress"
                  value={userDataToBeUpdated.address}
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
