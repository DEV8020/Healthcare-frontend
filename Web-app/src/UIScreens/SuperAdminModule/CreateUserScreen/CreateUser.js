import React, { useState, useEffect } from "react";
import classes from "./CreateUser.module.css";
// import UserTypeSelection from "../../../Components/Screens/UI Elements/Login/Register Elements/UserTypeSelection";
// import InputField from "../UI Elements/MenuForm Elements/InputField";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import MessageComponent from "../../../Components/Screens/MessageComponent/MessageComponent";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import SuperAdminUtilitiesKeys from "../SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UserTypeSelection from "../../../Component/LoginModule/UserTypeSelection/UserTypeSelection";

const CreateUser = (props) => {
  const [registerUserType, setRegisterUserType] = useState("");

  //Constants declared for Admin & Supervisor Options...
  const createUserAdminOption =
    SuperAdminUtilitiesKeys.getCreateUserOptionKeys().createUserAdminOption;
  const createUserSupervisorOption =
    SuperAdminUtilitiesKeys.getCreateUserOptionKeys()
      .createUserSupervisorOption;

  //   console.log("[registerUserType, setRegisterUserType] = useState");
  //   console.log(createUserAdminOption);
  //   console.log(createUserSupervisorOption);

  // console.log(props.selectedHospitalDataForAdminCreation);

  useEffect(() => {
    SuperAdminAPIHandler.GetHospitalListsDataWithNoAdmins({
      hopitalListWithNoAdminsResponseHandler:
        hopitalListWithNoAdminsResponseHandler,
    });
  }, [registerUserType]);

  useEffect(() => {
    props.setHospitalDetailsView(registerUserType);
  }, [registerUserType, props.setHospitalDetailsView]);

  const registerUserTypeChangeHandler = (event) => {
    setHospitalData({ userType: event.target.value });
    setRegisterUserType(event.target.value);
  };

  var setHospitalData = (updateData) => {
    props.HospitalRegistrationDataUpdateCallBackHandler({
      ...props.selectedHospitalDataForAdminCreation,
      ...updateData,
    });
  };

  // const registerUserHospitalIdChangeHandler = (event) => {
  //   showErrroMessage("Please choose hospital id from the list.");
  // };

  // const registerUserIdChangeHandler = (event) => {
  //   setHospitalData({ userId: event.target.value });
  // };

  const CreateUserDataInputFieldChangeHandler = (userEnteredData) => {
    // console.log("CreateUserDataInputFieldChangeHandler");
    // console.log(userEnteredData);

    const hospitalIDKey = UtilitiesKeys.getCreateUserDataKeys().hospitalIDKey;
    if (hospitalIDKey in userEnteredData) {
      showErrroMessage("Please choose hospital id from the list.");
      return;
    }
    setHospitalData(userEnteredData);
  };

  // const registerUserNameChangeHandler = (event) => {
  //   setHospitalData({ name: event.target.value });
  // };

  //registerUserNameChangeHandler

  // const registerUserContactChangeHandler = (event) => {
  //   setHospitalData({ contact: event.target.value });
  // };

  // const registerUserAddressChangeHandler = (event) => {
  //   setHospitalData({ address: event.target.value });
  // };

  // const registerUserPasswordChangeHandler = (event) => {
  //   setHospitalData({ password: event.target.value });
  // };

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
      showErrroMessage(
        "Please enter valid contact number. It must of 10 digits."
      );
      return;
    }

    //Validation for user Pin Code...
    const userPinCodeMappedKey =
      UtilitiesKeys.getCreateUserDataKeys().userAddressPinCodeKey;
    const userAddressPinCode =
      props.selectedHospitalDataForAdminCreation[userPinCodeMappedKey];
    const userPinCodeRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
    );
    //Show Alert Message in case of Invalid PIN CODE...
    if (
      registerUserType === createUserSupervisorOption &&
      userAddressPinCode.length !== userPinCodeRequiredLength
    ) {
      showErrroMessage("Please enter valid Pin Code. It must of 6 digits.");
      return;
    }

    SuperAdminAPIHandler.AddNewUserData({
      registerUserData: props.selectedHospitalDataForAdminCreation,
      addNewUserResponseHandler: addNewUserResponseHandler,
    });
  };

  const showErrroMessage = (message) => {
    MessageComponent.showMessageScreen({
      message: { message: message, isTrueFlag: true },
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
      isErrorMessage: true,
    });
  };

  const hopitalListWithNoAdminsResponseHandler = (hospitalListResponseData) => {
    if (hospitalListResponseData.isHospitalListRecieved === true) {
      props.hospitalListsWithNoAdminsCallBackHandler(
        hospitalListResponseData.hospitalListData
      );
    }
  };

  const addNewUserResponseHandler = (newUserData) => {
    if (newUserData.errorMessage === null) {
      if (newUserData.isNewUserAdded === true) {
        addNewUserSuccessHandler();
      }
      if (newUserData.isNewUserAdded === false) {
        showMessageDisplayScreen("Some error occured.");
      }
    } else if (newUserData.newUserData === null) {
      showMessageDisplayScreen(newUserData.errorMessage);
    }
  };

  const addNewUserSuccessHandler = () => {
    showMessageDisplayScreen(
      props.selectedHospitalDataForAdminCreation.userId +
        " registered successfully"
    );
    setRegisterUserType("");
    props.HospitalRegistrationDataUpdateCallBackHandler({
      name: "",
      userId: "",
      password: "",
      userType: "",
      hospitalId: "",
    });
  };
  //name,contact,address

  const showMessageDisplayScreen = (emessageToBeDisplayed) => {
    props.setAlertMessage(emessageToBeDisplayed);
    props.setAlertFlag(true);
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
            label="--User Type --"
            options={superAdminUserType}
            onChange={registerUserTypeChangeHandler}
          />

          {/* ######################  Adding new fields  ######################*/}

          <>
            <InputTextField
              type="text"
              label={UtilitiesKeys.getCreateUserFormLabelKeys().userIdLabel}
              mappedKey={UtilitiesKeys.getCreateUserDataKeys().userIdKey}
              onChange={CreateUserDataInputFieldChangeHandler}
              value={props.selectedHospitalDataForAdminCreation.userId}
            />

            <InputTextField
              type="text"
              label={UtilitiesKeys.getCreateUserFormLabelKeys().userNameLabel}
              mappedKey={UtilitiesKeys.getCreateUserDataKeys().userNameKey}
              onChange={CreateUserDataInputFieldChangeHandler}
              value={props.selectedHospitalDataForAdminCreation.name}
            />

            <InputTextField
              type="text"
              label={
                UtilitiesKeys.getCreateUserFormLabelKeys().userPasswordLabel
              }
              mappedKey={UtilitiesKeys.getCreateUserDataKeys().userPasswordKey}
              onChange={CreateUserDataInputFieldChangeHandler}
              value={props.selectedHospitalDataForAdminCreation.password}
            />

            {registerUserType === createUserAdminOption && (
              <InputTextField
                type="text"
                label={
                  UtilitiesKeys.getCreateUserFormLabelKeys().hospitalIDLabel
                }
                mappedKey={UtilitiesKeys.getCreateUserDataKeys().hospitalIDKey}
                onChange={CreateUserDataInputFieldChangeHandler}
                value={props.selectedHospitalDataForAdminCreation.hospitalId}
              />
            )}

            {registerUserType === createUserSupervisorOption && (
              <InputNumericTextField
                label={
                  UtilitiesKeys.getCreateUserFormLabelKeys().userContactLabel
                }
                mappedKey={UtilitiesKeys.getCreateUserDataKeys().userContactKey}
                value={props.selectedHospitalDataForAdminCreation.contact}
                onChange={CreateUserDataInputFieldChangeHandler}
                requiredLength={
                  UtilitiesKeys.getInputFieldLengthValidationKeys()
                    .userContactNumberLength
                }
              />
            )}

            {registerUserType === createUserSupervisorOption && (
              <InputTextField
                type="text"
                label={
                  UtilitiesKeys.getCreateUserFormLabelKeys().userAddressLabel
                }
                mappedKey={UtilitiesKeys.getCreateUserDataKeys().userAddressKey}
                onChange={CreateUserDataInputFieldChangeHandler}
                value={props.selectedHospitalDataForAdminCreation.address}
              />
            )}

            {registerUserType === createUserSupervisorOption && (
              <InputNumericTextField
                label={
                  UtilitiesKeys.getCreateUserFormLabelKeys()
                    .userAddressPincodeLabel
                }
                mappedKey={
                  UtilitiesKeys.getCreateUserDataKeys().userAddressPinCodeKey
                }
                onChange={CreateUserDataInputFieldChangeHandler}
                value={props.selectedHospitalDataForAdminCreation.pincode}
                requiredLength={
                  UtilitiesKeys.getInputFieldLengthValidationKeys()
                    .userPinCodeLength
                }
              />
            )}
          </>

          {/* ######################  Adding new fields  ######################*/}

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
