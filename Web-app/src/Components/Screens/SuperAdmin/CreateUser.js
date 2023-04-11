import React, { useState, useEffect } from "react";
import classes from "./CreateUser.module.css";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import MessageComponent from "../MessageComponent/MessageComponent";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const CreateUser = (props) => {
  const [registerUserType, setRegisterUserType] = useState("");

  console.log(props.selectedHospitalDataForAdminCreation);

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

  const registerUserHospitalIdChangeHandler = (event) => {
    showErrroMessage("Please choose hospital id from the list.");
  };

  const registerUserIdChangeHandler = (event) => {
    setHospitalData({ userId: event.target.value });
  };

  const CreateUserDataInputFieldChangeHandler = (userEnteredData) => {
    console.log("CreateUserDataInputFieldChangeHandler");
    console.log(userEnteredData);

    const hospitalIDKey = UtilitiesKeys.getCreateUserDataKeys().hospitalIDKey;
    if (hospitalIDKey in userEnteredData) {
      showErrroMessage("Please choose hospital id from the list.");
      return;
    }
    setHospitalData(userEnteredData);
  };

  const registerUserNameChangeHandler = (event) => {
    setHospitalData({ name: event.target.value });
  };

  //registerUserNameChangeHandler

  const registerUserContactChangeHandler = (event) => {
    setHospitalData({ contact: event.target.value });
  };

  const registerUserAddressChangeHandler = (event) => {
    setHospitalData({ address: event.target.value });
  };

  const registerUserPasswordChangeHandler = (event) => {
    setHospitalData({ password: event.target.value });
  };

  const RegisterUserHandler = (event) => {
    event.preventDefault();

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

  const superAdminUserType = [{ option: "Admin" }, { option: "Supervisor" }];

  let formFields;
  switch (registerUserType) {
    case "Admin":
      formFields = (
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
            label={UtilitiesKeys.getCreateUserFormLabelKeys().userPasswordLabel}
            mappedKey={UtilitiesKeys.getCreateUserDataKeys().userPasswordKey}
            onChange={CreateUserDataInputFieldChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.password}
          />

          <InputTextField
            type="text"
            label={UtilitiesKeys.getCreateUserFormLabelKeys().hospitalIDLabel}
            mappedKey={UtilitiesKeys.getCreateUserDataKeys().hospitalIDKey}
            onChange={CreateUserDataInputFieldChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.hospitalId}
          />
        </>
      );
      break;
    case "Supervisor":
      formFields = (
        <>
          <InputField
            type="text"
            label="User ID"
            onChange={registerUserIdChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.userId}
          />
          <InputField
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.password}
          />

          <InputField
            type="text"
            label="Name"
            onChange={registerUserNameChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.name}
          />

          <InputField
            type="text"
            label="Contact"
            value={props.selectedHospitalDataForAdminCreation.contact}
            onChange={registerUserContactChangeHandler}
          />

          <InputField
            type="text"
            label="Address"
            onChange={registerUserAddressChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.address}
          />
        </>
      );
      break;
    default:
      formFields = null;
  }

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
          {formFields}
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
