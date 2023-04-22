import React, { useState, useEffect } from "react";
import classes from "./CreateUser.module.css";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import SuperAdminUtilitiesKeys from "../SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UserTypeSelection from "../../../Component/LoginModule/UserTypeSelection/UserTypeSelection";

const CreateUser = (props) => {
  const [refreshHospitalList, setRefreshHospitalList] = useState(false);

  //Constants declared for Admin & Supervisor Options...
  const createUserAdminOption =
    SuperAdminUtilitiesKeys.getCreateUserOptionKeys().createUserAdminOption;
  const createUserSupervisorOption =
    SuperAdminUtilitiesKeys.getCreateUserOptionKeys()
      .createUserSupervisorOption;

  const [registerUserType, setRegisterUserType] = useState(
    createUserAdminOption
  );

  //Method for fetching the list of Hospitals with No Amdins...
  //To register Admin in Super Admin menu...
  useEffect(() => {
    SuperAdminAPIHandler.GetHospitalListsDataWithNoAdmins({
      hopitalListWithNoAdminsResponseHandler:
        hopitalListWithNoAdminsResponseHandler,
    });
  }, [registerUserType, refreshHospitalList]);

  //Method for displaying the Hospital Details view...
  useEffect(() => {
    props.setHospitalDetailsView(registerUserType);
  }, [registerUserType, props.setHospitalDetailsView, refreshHospitalList]);

  const registerUserTypeChangeHandler = (event) => {
    setHospitalData({ userType: event.target.value });
    setRegisterUserType(event.target.value);
  };

  //Update Hospital User registration data...
  var setHospitalData = (updateData) => {
    console.log({
      ...props.selectedHospitalDataForAdminCreation,
      ...updateData,
    });
    props.HospitalRegistrationDataUpdateCallBackHandler({
      ...props.selectedHospitalDataForAdminCreation,
      ...updateData,
    });
  };

  const resetUpdateRefreshUserList = () => {
    setRefreshHospitalList((isRefresh) => {
      return !isRefresh;
    });
  };

  //############# Data change handler methods on Value Change #############

  //Update user data when data changes on Input Field Change Handler Method...
  const CreateUserDataInputFieldChangeHandler = (userEnteredData) => {
    const hospitalIDKey = UtilitiesKeys.getCreateUserDataKeys().hospitalIDKey;
    if (hospitalIDKey in userEnteredData) {
      messageWithData({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          SuperAdminUtilitiesKeys.getSuperAdminErrorMessagesText()
            .chooseHospilatIDFromList,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }
    setHospitalData(userEnteredData);
  };

  //Register User On Regsiter Button Click Event...
  const RegisterUserHandler = (event) => {
    event.preventDefault();

    //Validation for user contact number...
    const userContactNumberMappedKey =
      UtilitiesKeys.getCreateUserDataKeys().userContactKey;
    const userContactNumber =
      props.selectedHospitalDataForAdminCreation[userContactNumberMappedKey];
    const userContactNumberRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    );

    //Show Alert Message in case of Invalid Contact Number...
    if (
      registerUserType === createUserSupervisorOption &&
      userContactNumber.length !== userContactNumberRequiredLength
    ) {
      messageWithData({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .phoneNumberNotValidMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }

    //Validation for user Pin Code...
    const userAddressPinCode =
      props.selectedHospitalDataForAdminCreation[
        UtilitiesKeys.getCreateUserDataKeys().userAddressPinCodeKey
      ];
    const userPinCodeRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
    );
    //Show Alert Message in case of Invalid PIN CODE...
    if (
      registerUserType === createUserSupervisorOption &&
      userAddressPinCode.length !== userPinCodeRequiredLength
    ) {
      messageWithData({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .pinCodeNotValidMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }

    //Hit API On Successfully validated user data for Registration...
    SuperAdminAPIHandler.AddNewUserData({
      registerUserData: props.selectedHospitalDataForAdminCreation,
      addNewUserResponseHandler: addNewUserResponseHandler,
    });
  };

  //Method to show Message on Bottom Bar...
  const messageWithData = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: prop.message,
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop.isErrorMessage,
    });
  };

  //############# API Response Handler Methods #############

  //Hospitals with no amdins where user to be registered...
  const hopitalListWithNoAdminsResponseHandler = (hospitalListResponseData) => {
    if (hospitalListResponseData.isHospitalListRecieved === true) {
      props.hospitalListsWithNoAdminsCallBackHandler(
        hospitalListResponseData.hospitalListData
      );
    }
  };

  //Register new user response handler...
  const addNewUserResponseHandler = (newUserData) => {
    if (newUserData.isNewUserAdded === true) {
      addNewUserSuccessHandler();
    } else {
      messageWithData({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          newUserData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
    }
  };

  //Method for handling after user registered successfully...
  const addNewUserSuccessHandler = () => {
    const message =
      props.selectedHospitalDataForAdminCreation.username +
      " registered successfully";
    messageWithData({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: message,
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
    });
    setRegisterUserType(props.selectedHospitalDataForAdminCreation.userType);
    resetUpdateRefreshUserList();
    props.HospitalRegistrationDataUpdateCallBackHandler(
      SuperAdminUtilitiesKeys.getCreateUserInitialData()
    );
  };

  const BackButtonPressedHandler = () => {
    props.setSuperAdminOption("");
  };

  const superAdminUserType = [
    { option: createUserAdminOption },
    { option: createUserSupervisorOption },
  ];

  return (
    <div>
      <div className={classes.center}>
        <h1> Create User Menu</h1>

        <form id="createUser-form" onSubmit={RegisterUserHandler}>
          <UserTypeSelection
            label={createUserAdminOption}
            options={superAdminUserType}
            onChange={registerUserTypeChangeHandler}
          />

          {/* ######################  Adding new fields  ######################*/}

          <>
            {/* User ID Input Key for User Registration */}
            <InputTextField
              label={
                SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys().userIdLabel
              }
              mappedKey={
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
              }
              onChange={CreateUserDataInputFieldChangeHandler}
              value={
                props.selectedHospitalDataForAdminCreation[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
                ]
              }
            />

            {/* User Name Input Key for User Registration */}
            <InputTextField
              label={
                SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                  .userNameLabel
              }
              mappedKey={
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
              }
              onChange={CreateUserDataInputFieldChangeHandler}
              value={
                props.selectedHospitalDataForAdminCreation[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
                ]
              }
            />

            {/* User Password Input Key for User Registration */}
            <InputTextField
              label={
                SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                  .userPasswordLabel
              }
              mappedKey={
                SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey
              }
              onChange={CreateUserDataInputFieldChangeHandler}
              value={
                props.selectedHospitalDataForAdminCreation[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                    .userPasswordKey
                ]
              }
            />

            {/* Hospital ID Input Key for User Registration */}
            {registerUserType === createUserAdminOption && (
              <InputTextField
                label={
                  SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                    .hospitalIDLabel
                }
                mappedKey={
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().hospitalIDKey
                }
                onChange={CreateUserDataInputFieldChangeHandler}
                value={
                  props.selectedHospitalDataForAdminCreation[
                    SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                      .hospitalIDKey
                  ]
                }
              />
            )}

            {/* User Contact Number Input Key for User Registration */}
            {registerUserType === createUserSupervisorOption && (
              <InputNumericTextField
                label={
                  SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                    .userContactLabel
                }
                mappedKey={
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey
                }
                value={
                  props.selectedHospitalDataForAdminCreation[
                    SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                      .userContactKey
                  ]
                }
                onChange={CreateUserDataInputFieldChangeHandler}
                requiredLength={
                  UtilitiesKeys.getInputFieldLengthValidationKeys()
                    .userContactNumberLength
                }
              />
            )}

            {/* User Address Input Key for User Registration */}
            {registerUserType === createUserSupervisorOption && (
              <InputTextField
                label={
                  SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                    .userAddressLabel
                }
                mappedKey={
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userAddressKey
                }
                onChange={CreateUserDataInputFieldChangeHandler}
                value={
                  props.selectedHospitalDataForAdminCreation[
                    SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                      .userAddressKey
                  ]
                }
              />
            )}

            {/* User Pin Code Input Key for User Registration */}
            {registerUserType === createUserSupervisorOption && (
              <InputNumericTextField
                label={
                  SuperAdminUtilitiesKeys.getCreateUserFormLabelKeys()
                    .userAddressPincodeLabel
                }
                mappedKey={
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                    .userAddressPinCodeKey
                }
                onChange={CreateUserDataInputFieldChangeHandler}
                value={
                  props.selectedHospitalDataForAdminCreation[
                    SuperAdminUtilitiesKeys.getCreateUserDataKeys()
                      .userAddressPinCodeKey
                  ]
                }
                requiredLength={
                  UtilitiesKeys.getInputFieldLengthValidationKeys()
                    .userPinCodeLength
                }
              />
            )}
          </>

          <div>
            <MenuSubmitButton value="Register" />
            <MenuSubmitButton
              value="Cancel"
              onClick={BackButtonPressedHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
