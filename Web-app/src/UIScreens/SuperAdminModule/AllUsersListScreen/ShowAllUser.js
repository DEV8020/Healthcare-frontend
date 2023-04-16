import classes from "./ShowAllUser.module.css";
import React, { useEffect, useState } from "react";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import SuperAdminUtilitiesKeys from "../SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UpdateCredentialPopup from "../../GenericModule/UpdateUserDataScreen/UpdateCredentialPopup";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";


const ShowAllUser = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [allRegisteredUsersList, setAllRegisteredUsersList] = useState([]);
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});

  useEffect(() => {
    setAllRegisteredUsersList(props.registeredUsersList);
  }, [props.registeredUsersList]);

  const displayMessagesInParentViewHandler = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  const changeUserDataHandler = (userDataToBeUpdated) => {
    setUserDataToBeUpdated(userDataToBeUpdated);
    setShowUpdateCredentialPopup(true);
  };

  const onUserDataUpdateHandler = (UpdateUserData) => {
    setShowUpdateCredentialPopup(false);
    displayMessagesInParentViewHandler({
      message: "User data updated successfully.",
      isErrorMessage: false,
    });
    props.updateUserListAfterDataUpdateHandler();
  };

  const handleCredentialPopupClose = () => {
    setShowUpdateCredentialPopup(false);
  };

  // const updateDataToUpdateHandler = (updatedData) => {
  //   console.log("updateDataToUpdateHandler called");
  //   console.log(updatedData);
  //   props.registeredUserUpdateHandleCallBack(updatedData);
  // };

  return (
    <div className={classes.center}>
      <h2> User List</h2>

      {allRegisteredUsersList.length === 0 && (
        <div>
          <h3 style={{ textAlign: "center" }}>
            No users to display. Please add some.
          </h3>
        </div>
      )}

      <div className={classes.ul}>
        {allRegisteredUsersList.map((userData) => (
          <div key={userData.authId} className={classes.plist}>
            {/* Div to display User ID Key... */}
            <div>
              User ID :{" "}
              {
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
                ]
              }
            </div>

            {/* Div to display User Name Key... */}
            <div>
              User Name:{" "}
              {
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
                ]
              }
            </div>

            {/* Div to display User Role Key... */}
            <div>
              User Type :{" "}
              {SuperAdminUtilitiesKeys.getUserType(
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userRoleKey
                ]
              )}
            </div>

            {/* <div>
              Password :{" "}
              {
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                    .userPasswordKey
                ]
              }
            </div> */}
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
          // d_id={UpdateCredentialUserId}
          userDataToBeUpdated={userDataToBeUpdated}
          displayMessagesInParentViewHandler={
            displayMessagesInParentViewHandler
          }
          // updateDataToUpdateHandler={updateDataToUpdateHandler}
        />
      )}
    </div>
  );
};

export default ShowAllUser;
