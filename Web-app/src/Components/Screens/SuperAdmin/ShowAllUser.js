import classes from "./ShowAllUser.module.css";

import React, { useEffect, useState } from "react";
import UpdateCredentialPopup from "../UI Elements/Pop-ups/UpdateCredentialPopup";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MessageComponent from "../MessageComponent/MessageComponent";

const ShowAllUser = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [UpdateCredentialUserId, setUpdateCredentialUserId] = useState("");

  const [allRegisteredUsersList, setAllRegisteredUsersList] = useState([]);
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});

  useEffect(() => {
    setAllRegisteredUsersList(props.registeredUsersList);
  }, [props.registeredUsersList]);


  const changeUserDataHandler = (userDataToBeUpdated) => {
    console.log(userDataToBeUpdated);
    console.log("changeUserDataHandler called");
    setUserDataToBeUpdated(userDataToBeUpdated);
    setShowUpdateCredentialPopup(true);
  };

  const onUserDataUpdateHandler = (UpdateUserData) => {
    setShowUpdateCredentialPopup(false);
    console.log("handleCredentialPopupUpdate called with data");
    console.log(UpdateUserData);
    showErrroMessage("User data updated successfully.");
  };

  //message , isErrorMessage
  const showErrroMessage = (message) => {
    MessageComponent.showMessageScreen({
      message: { message: message, isTrueFlag: true },
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
      isErrorMessage: true,
    });
  };

  const handleCredentialPopupClose = () => {
    setShowUpdateCredentialPopup(false);
  };

  const updateDataToUpdateHandler = (updatedData) => {
    console.log("updateDataToUpdateHandler called");
    console.log(updatedData);
    props.registeredUserUpdateHandleCallBack(updatedData);
  };


  return (
    <div className={classes.center}>
      <h2> User List</h2>
      <div className={classes.ul}>
        {allRegisteredUsersList.map((userData) => (
          <div key={userData.authId} className={classes.plist}>
            <div>User Type : {userData.userType}</div>
            <div>User Name: {userData.name}</div>
            <div>Password : {userData.password}</div>
            <AddButton
              value="Update"
              onClick={() => changeUserDataHandler(userData)}
            />
          </div>
        ))}
      </div>
      {showUpdateCredentialPopup && (
        <UpdateCredentialPopup
          onUserDataUpdateHandler={onUserDataUpdateHandler}
          onClose={handleCredentialPopupClose}
          d_id={UpdateCredentialUserId}
          userDataToBeUpdated={userDataToBeUpdated}
          updateDataToUpdateHandler={updateDataToUpdateHandler}
        />
      )}
    </div>
  );
};

export default ShowAllUser;
