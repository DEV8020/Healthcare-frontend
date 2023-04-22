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
  const UpdatedUserPasswordChangeHandler = (event) => {
    console.log("UpdatedUserPasswordChangeHandler called");
    updateUserData({
      [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]:
        event.target.value,
    });
  };


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
    setUserDataToBeUpdated((userData) => {
      return { ...userData, ...userDataToUpdated };
    });
  };






  const UpdateCredentialSubmitHandler = (event) => {
    event.preventDefault();

    const userContactNumberRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    );

    if (
      selectedUserType === "Supervisor" &&
      UtilitiesMethods.getSpaceTrimmedLenght(
        userDataToBeUpdated[
          SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey
        ]
      ) !== userContactNumberRequiredLength
    ) {
      props.displayMessagesInParentViewHandler({
        message:
        UtilitiesKeys.getGeneralValidationMessagesText().phoneNumberNotValidMessage,
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
    });
  };

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
                  SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys().userContactLabel
                }
                mappedKey={
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey
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
            isRequired={false}
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
