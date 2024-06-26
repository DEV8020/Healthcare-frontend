import React, { useEffect, useState } from "react";
import classes from "./popup.module.css";
import SuperAdminUserRelatedAPIHandler from "../../../Controllers/SuperAdminUserRelatedAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import SuperAdminUtilitiesKeys from "../../SuperAdminModule/SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import { Menu } from "@mui/material";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import AdminUtilities from "../../../Utilities/AdminUtilities/AdminUtilities";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";
import SupervisorUtilitiesKeys from "../../../Utilities/SupervisorUtilitiesKeys/SupervisorUtilitiesKeys";

const UpdateCredentialPopup = (props) => {
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});

  useEffect(() => {
    setUserDataToBeUpdated({
      ...props.userDataToBeUpdated,
      ...{
        [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]: "",
      },
    });

    console.log("userDataToBeUpdated");
    console.log(userDataToBeUpdated);
  }, []);

  console.log("userDataToBeUpdated UpdateCredentialPopup pop up");
  console.log(userDataToBeUpdated);

  const selectedUserType = SuperAdminUtilitiesKeys.getUserType(
    props.userDataToBeUpdated[
      SuperAdminUtilitiesKeys.getCreateUserDataKeys().userRoleKey
    ]
  );

  console.log(
    "userDataToBeUpdated UpdateCredentialPopup pop up user type is :"
  );
  console.log(selectedUserType);

  //########################## Data Handler Methods  ##########################

  //User ID Change Handler...
  const UpdatedUserDataChangeHandler = (userData) => {
    console.log("*********************** userData *****************");
    updateUserData(userData);
  };

  //User Password Change Handler...
  // const UpdatedUserPasswordChangeHandler = (event) => {
  //   console.log("UpdatedUserPasswordChangeHandler called");
  //   updateUserData({
  //     [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]:
  //       event.target.value,
  //   });
  // };

  // //User Contact Change Handler...
  // const UpdatedUserContactChangeHandler = (event) => {
  //   updateUserData({
  //     [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey]:
  //       event.target.value,
  //   });
  // };

  //User Address Change Handler...
  const UpdatedUserAddressChangeHandler = (event) => {
    updateUserData({
      [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userAddressKey]:
        event.target.value,
    });
  };
  //########################## Data Handler Methods Ends Here  ##########################

  const updateUserData = (userDataToUpdated) => {
    setUserDataToBeUpdated((userData) => {
      return { ...userData, ...userDataToUpdated };
    });
  };

  const UpdateCredentialSubmitHandler = (event) => {
    event.preventDefault();

    // console.log("*******************UpdateCredentialSubmitHandler called");

    // const userContactNumberRequiredLength = parseInt(
    //   UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    // );

    if (selectedUserType === "Supervisor" || selectedUserType === "Admin") {
      const superVisorValidationData =
        SuperAdminUtilitiesKeys.checkSupervisorValidationData(
          userDataToBeUpdated,
          selectedUserType === "Admin"
        );

      if (
        superVisorValidationData[
          UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
        ] === true
      ) {
        props.displayMessagesInParentViewHandler(superVisorValidationData);
        return;
      }
    }

    // console.log("selectedUserType");
    //     console.log(selectedUserType);
    if (selectedUserType === "FieldWorker") {
      // http://localhost:9191/supervisor/updateFieldWorker

      const fieldWorkerValidationData =
        SupervisorUtilitiesKeys.checkFieldWorkerValidationData(
          userDataToBeUpdated,
          true
        );

      if (
        fieldWorkerValidationData[
          UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
        ] === true
      ) {
        props.displayMessagesInParentViewHandler(fieldWorkerValidationData);
        return;
      }

      SupervisorAPIHandler.updateFieldWorkerRegistrationData({
        userData: userDataToBeUpdated,
        modifyFieldWorkerDataResponseHandler:
          modifyFieldWorkerDataResponseHandler,
      });

      return;
    }

    if (selectedUserType === "Doctor" || selectedUserType === "Front Desk") {
      console.log("userDataToBeUpdated in doctor option");
      console.log(userDataToBeUpdated);

      if (selectedUserType === "Front Desk") {
        const validationData = AdminUtilities.checkAddUserDataValidations(
          userDataToBeUpdated,
          true
        );

        if (
          selectedUserType === "Front Desk" &&
          validationData[
            UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
          ] === true
        ) {
          props.displayMessagesInParentViewHandler(validationData);
          return;
        }
      } else {
        const validationDoctorData =
          AdminUtilities.checkAddDoctorDataValidations(
            userDataToBeUpdated,
            true
          );
        if (
          selectedUserType === "Doctor" &&
          validationDoctorData[
            UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
          ] === true
        ) {
          props.displayMessagesInParentViewHandler(validationDoctorData);
          return;
        }
      }

      AdminAPIHandler.updateUserRegistrationData({
        userData: userDataToBeUpdated,
        modifyAdminUserDataResponseHandler: modifyAdminUserDataResponseHandler,
      });

      return;
    }

    SuperAdminUserRelatedAPIHandler.updateUserData({
      userData: userDataToBeUpdated,
      modifyUserDataResponseHandler: modifyUserDataResponseHandler,
    });
  };

  const modifyAdminUserDataResponseHandler = (modifiedUserData) => {
    console.log("modifyAdminUserDataResponseHandler response data is :");
    console.log(modifiedUserData);
    if (modifiedUserData.errorMessage === null) {
      if (modifiedUserData.isUserDataUpdated === true) {
        updateAdminSubUsersDataSuccessHandler(modifiedUserData.userUpdatedData);
      }
      if (modifiedUserData.isUserDataUpdated === false) {
        showErrorMessage({
          message: "Some error occured.",
          isErrorMessage: true,
          messageType: UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
        });
      }
    } else if (modifiedUserData.userUpdatedData === null) {
      showErrorMessage({
        message: modifiedUserData.errorMessage,
        isErrorMessage: true,
        messageType: UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
    }
  };

  const modifyFieldWorkerDataResponseHandler = (modifiedUserData) => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(modifiedUserData);
    if (modifiedUserData.errorMessage === null) {
      if (modifiedUserData.isUserDataUpdated === true) {
        updateUserDataSuccessHandler(modifiedUserData.userUpdatedData);
      }
      if (modifiedUserData.isUserDataUpdated === false) {
        showErrorMessage({
          message: "Some error occured.",
          isErrorMessage: true,
          messageType: UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
        });
      }
    } else if (modifiedUserData.userUpdatedData === null) {
      showErrorMessage({
        message: modifiedUserData.errorMessage,
        isErrorMessage: true,
        messageType: UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
    }
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
          messageType: UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
        });
      }
    } else if (modifiedUserData.userUpdatedData === null) {
      showErrorMessage({
        message: modifiedUserData.errorMessage,
        isErrorMessage: true,
        messageType: UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
    }
  };

  const updateAdminSubUsersDataSuccessHandler = (userModifiedData) => {
    console.log("updateUserDataSuccessHandler");
    props.updateUserSuccessHandler(userModifiedData);
  };

  const updateUserDataSuccessHandler = (userModifiedData) => {
    console.log("updateUserDataSuccessHandler");
    props.onUserDataUpdateHandler(userModifiedData);
  };

  const showErrorMessage = (prop) => {
    props.displayMessagesInParentViewHandler({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageType],
    });
  };

  console.log("**************************");
  console.log(userDataToBeUpdated);
  console.log(selectedUserType);

  return (
    <div className={classes.popup}>
      <div className={classes.popup_content}>
        <h2> Update User Data </h2>
        <form onSubmit={UpdateCredentialSubmitHandler}>
          {/* User ID Input Key for User Registration */}
          <InputTextField
            label={
              SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys().userIdLabel
            }
            mappedKey={
              SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
            }
            onChange={UpdatedUserDataChangeHandler}
            value={
              userDataToBeUpdated[
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
              ]
            }
          />

          {/* User Name Input Key for User Registration */}
          <InputTextField
            label={
              SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys().userNameLabel
            }
            mappedKey={
              SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
            }
            onChange={UpdatedUserDataChangeHandler}
            value={
              userDataToBeUpdated[
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
              ]
            }
          />

          {selectedUserType !== UtilitiesKeys.getUserTypeKeys().adminKey &&
            selectedUserType !==
              UtilitiesKeys.getUserTypeKeys().frontDeskKey && (
              <>
                <InputNumericTextField
                  label={
                    SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                      .userContactLabel
                  }
                  mappedKey={
                    SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                      .userContactKey
                  }
                  value={
                    userDataToBeUpdated[
                      SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                        .userContactKey
                    ]
                  }
                  onChange={UpdatedUserDataChangeHandler}
                  requiredLength={
                    UtilitiesKeys.getInputFieldLengthValidationKeys()
                      .userContactNumberLength
                  }
                />
              </>
            )}

          {/* {selectedUserType !== "Admin" &&
            selectedUserType !== "Supervisor" &&
            selectedUserType !== "Doctor" &&
            selectedUserType !== "Front Desk" && selectedUserType !== "FieldWorker" && (
              <>
                <label htmlFor="userAddress">Address:</label>
                <input
                  type="text"
                  id="userAddress"
                  // value={userDataToBeUpdated.address}
                  value={
                    userDataToBeUpdated[
                      SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                        .userAddressKey
                    ]
                  }
                  onChange={UpdatedUserAddressChangeHandler}
                />
              </>
            )} */}

          {selectedUserType === "Doctor" && (
            <>
              <InputTextField
                label={
                  AdminUtilities.getCreateUserLabelKeys().doctorLicenseIDKey
                }
                mappedKey={
                  AdminUtilities.getCreateUserDataKeys().doctorLicenseIDKey
                }
                onChange={UpdatedUserDataChangeHandler}
                value={
                  userDataToBeUpdated[
                    AdminUtilities.getCreateUserDataKeys().doctorLicenseIDKey
                  ]
                }
              />
            </>
          )}

          {selectedUserType === "Doctor" && (
            <>
              <InputTextField
                label={
                  AdminUtilities.getCreateUserLabelKeys()
                    .doctorSpecializationKey
                }
                mappedKey={
                  AdminUtilities.getCreateUserDataKeys().doctorSpecializationKey
                }
                onChange={UpdatedUserDataChangeHandler}
                value={
                  userDataToBeUpdated[
                    AdminUtilities.getCreateUserDataKeys()
                      .doctorSpecializationKey
                  ]
                }
              />
            </>
          )}

          {/* User Password Input Key for User Registration */}
          <InputTextField
            label={
              SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                .userPasswordLabel
            }
            mappedKey={
              SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey
            }
            onChange={UpdatedUserDataChangeHandler}
            value={
              userDataToBeUpdated[
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey
              ]
            }
            isRequired={false}
          />

          <div
            style={{
              paddingRight: 70,

              position: "absolute",
              bottom: 20,
              left: 60,
              width: "90%",
              textAlign: "flex",
              justifyContent: "right",
              marginInline: 40,

              flexDirection: "row",
            }}
          >
            <MenuSubmitButton value="Update" />
            <MenuSubmitButton value="Cancel" onClick={props.onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCredentialPopup;
