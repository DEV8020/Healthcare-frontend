import classes from "./ShowAllUser.module.css";
import React, { useEffect, useState } from "react";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import SuperAdminUtilitiesKeys from "../SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UpdateCredentialPopup from "../../GenericModule/UpdateUserDataScreen/UpdateCredentialPopup";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const ShowAllUser = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [allRegisteredUsersList, setAllRegisteredUsersList] = useState([]);
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});

  useEffect(() => {
    setAllRegisteredUsersList(props.registeredUsersList);
  }, [props.registeredUsersList]);

  const displayMessagesInParentViewHandler = (prop) => {
    // UtilitiesMethods.showMessageBarAtTheBottom({
    //   message: prop.message,
    //   isErrorMessage: prop.isErrorMessage,
    //   alertMessageElement: props.setAlertMessage,
    //   alertMessageFlag: props.setAlertFlag,
    // });
    messageWithData(
      prop
      // {
      // [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
      //   prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      // [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
      //   prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
      // }
    );
  };

  // UtilitiesKeys

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

  //Method to show Message on Bottom Bar...
  const messageWithData = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageType],
    });
  };

  // const updateDataToUpdateHandler = (updatedData) => {
  //   console.log("updateDataToUpdateHandler called");
  //   console.log(updatedData);
  //   props.registeredUserUpdateHandleCallBack(updatedData);
  // };

  return (
    <div className={classes.center_SA}>
      <h2>User List</h2>

      {allRegisteredUsersList.length === 0 && (
        <div>
          <h3 style={{ textAlign: "center" }}>
            No users to display. Please add some.
          </h3>
        </div>
      )}

      <div className={classes.ul_SA}>
        {allRegisteredUsersList.map((userData) => (
          <div key={userData.authId} className={classes.plist_SA}>
            {/* Div to display User ID Key... */}
            <div>
              {SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys().userIdLabel}{" "}
              :{" "}
              {
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
                ]
              }
            </div>

            {/* Div to display User Name Key... */}
            <div>
              {
                SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                  .userNameLabel
              }{" "}
              :{" "}
              {
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
                ]
              }
            </div>

            {/* Div to display User Role Key... */}
            <div>
              {
                SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                  .userTypeLabel
              }{" "}
              :{" "}
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
          userDataToBeUpdated={userDataToBeUpdated}
          displayMessagesInParentViewHandler={
            displayMessagesInParentViewHandler
          }
        />
      )}
    </div>
  );
};

export default ShowAllUser;
