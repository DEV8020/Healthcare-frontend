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
  // const UpdatedUserIdChangeHandler = (userData) => {

  //   console.log("*********************** userData *****************");
  //   updateUserData(userData);

  //   // updateUserData({
  //   //   [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey]:
  //   //     event.target.value,
  //   // });
  // };

  //User ID Change Handler...
  const UpdatedUserDataChangeHandler = (userData) => {
    console.log("*********************** userData *****************");
    updateUserData(userData);

    // updateUserData({
    //   [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey]:
    //     event.target.value,
    // });
  };

  //User Password Change Handler...
  const UpdatedUserPasswordChangeHandler = (event) => {
    console.log("UpdatedUserPasswordChangeHandler called");
    updateUserData({
      [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]:
        event.target.value,
    });
  };

  //User Name Change Handler...
  // const UpdatedUserNameChangeHandler = (event) => {
  //   // updateUserData({
  //   //   [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey]:
  //   //     event.target.value,
  //   // });
  // };

  //User Contact Change Handler...
  const UpdatedUserContactChangeHandler = (event) => {
    updateUserData({
      [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey]:
        event.target.value,
    });
  };

  //User Address Change Handler...
  const UpdatedUserAddressChangeHandler = (event) => {
    updateUserData({
      [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userAddressKey]:
        event.target.value,
    });
  };

  //User License ID (Specially Doctor) Handler...
  const UpdatedUserLicenseIdChangeHandler = (event) => {
    updateUserData({ licId: event.target.value });
  };

  //User Specialisation (Specially Doctor) Handler...
  const UpdatedUserSpecialisationChangeHandler = (event) => {
    updateUserData({ docSpecialization: event.target.value });
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
      UtilitiesMethods.getSpaceTrimmedLenght(
        userDataToBeUpdated[
          SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
        ]
      ) === 0
    ) {
      props.displayMessagesInParentViewHandler({
        message: "Please enter user Id to proceed, It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    if (
      UtilitiesMethods.getSpaceTrimmedLenght(
        userDataToBeUpdated[
          SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
        ]
      ) === 0
    ) {
      props.displayMessagesInParentViewHandler({
        message: "Please enter name to proceed, It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    if (
      UtilitiesMethods.getSpaceTrimmedLenght(
        userDataToBeUpdated[
          SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
        ]
      ) === 0
    ) {
      props.displayMessagesInParentViewHandler({
        message: "Please enter name to proceed, It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    // if (
    //   UtilitiesMethods.getSpaceTrimmedLenght(userDataToBeUpdated[SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]) === 0
    // ) {
    //   props.displayMessagesInParentViewHandler({
    //     message: "Please enter password to proceed, It can't be left blank.",
    //     isErrorMessage: true,
    //   });
    //   return;
    // }

    if (
      selectedUserType === "Supervisor" &&
      UtilitiesMethods.getSpaceTrimmedLenght(
        userDataToBeUpdated[
          SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey
        ]
      ) === 0
    ) {
      props.displayMessagesInParentViewHandler({
        message:
          "Please enter contact number to proceed, It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    if (selectedUserType === "Doctor" || selectedUserType === "Front Desk") {
      console.log("userDataToBeUpdated in doctor option");
      console.log(userDataToBeUpdated);

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
        });
      }
    } else if (modifiedUserData.userUpdatedData === null) {
      showErrorMessage({
        message: modifiedUserData.errorMessage,
        isErrorMessage: true,
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
        });
      }
    } else if (modifiedUserData.userUpdatedData === null) {
      showErrorMessage({
        message: modifiedUserData.errorMessage,
        isErrorMessage: true,
      });
    }
  };

  const updateAdminSubUsersDataSuccessHandler = (userModifiedData) => {
    console.log("updateUserDataSuccessHandler");
    props.updateUserSuccessHandler(userModifiedData);
    //props.onUserDataUpdateHandler(userModifiedData);
  };

  const updateUserDataSuccessHandler = (userModifiedData) => {
    console.log("updateUserDataSuccessHandler");
    props.onUserDataUpdateHandler(userModifiedData);
  };

  //message , isErrorMessage
  const showErrorMessage = (prop) => {
    props.displayMessagesInParentViewHandler({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
    });

    // UtilitiesMethods.showMessageBarAtTheBottom({
    //   message: prop.message,
    //   isErrorMessage: prop.isErrorMessage,
    //   alertMessageElement: props.setAlertMessage,
    //   alertMessageFlag: props.setAlertFlag,
    // });
  };

  // messageWithData({
  //   [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
  //     UtilitiesKeys.getGeneralValidationMessagesText()
  //       .phoneNumberNotValidMessage,
  //   [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  // });

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

          {/* User ID Input Key for User Registration */}
          {/* <InputTextField
              label={SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys().userIdLabel}
              mappedKey={
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
              }
              onChange={CreateUserDataInputFieldChangeHandler}
              value={
                props.selectedHospitalDataForAdminCreation[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
                ]
              }
            /> */}

          {/* User Name Input Key for User Registration */}
          {/* <InputTextField
              label={SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys().userNameLabel}
              mappedKey={
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
              }
              onChange={CreateUserDataInputFieldChangeHandler}
              value={
                props.selectedHospitalDataForAdminCreation[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
                ]
              }
            /> */}

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
                <label htmlFor="userContact">Contact:</label>
                <input
                  type="text"
                  id="userContact"
                  value={
                    userDataToBeUpdated[
                      SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                        .userContactKey
                    ]
                  }
                  onChange={UpdatedUserContactChangeHandler}
                />
              </>
            )}

          {selectedUserType !== "Admin" &&
            selectedUserType !== "Supervisor" &&
            selectedUserType !== "Doctor" &&
            selectedUserType !== "Front Desk" && (
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
            )}

          {selectedUserType === "Doctor" && (
            <>
              <label htmlFor="licenseId">Doctor License ID:</label>
              <input
                type="text"
                id="licenseId"
                value={userDataToBeUpdated.licId}
                onChange={UpdatedUserLicenseIdChangeHandler}
              />
            </>
          )}

          {selectedUserType === "Doctor" && (
            <>
              <label htmlFor="specialisation">Doctor Specialization:</label>
              <input
                type="text"
                id="specialisation"
                value={userDataToBeUpdated.docSpecialization}
                onChange={UpdatedUserSpecialisationChangeHandler}
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
          />

          <div>
            <MenuSubmitButton value="Update" />
            <MenuSubmitButton value="Cancel" onClick={props.onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCredentialPopup;
