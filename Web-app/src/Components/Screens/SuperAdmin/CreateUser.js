import React, { useState, useEffect } from "react";
import classes from "./CreateUser.module.css";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import MessageComponent from "../MessageComponent/MessageComponent";

const CreateUser = (props) => {
  const [registerUserType, setRegisterUserType] = useState("");

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

  const registerUserPasswordChangeHandler = (event) => {
    setHospitalData({ password: event.target.value });
  };

  const RegisterUserHandler = (event) => {
    console.log("RegisterUserHandler calleld");
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

  const showMessageDisplayScreen = (emessageToBeDisplayed) => {
    props.setAlertMessage(emessageToBeDisplayed);
    props.setAlertFlag(true);
  };

  const BackButtonPressedHandler = () => {
    props.setSuperAdminOption("");
  };

  const superAdminUserType = [{ option: "Admin" }, { option: "Supervisor" }];

  return (
    <div>
      <div className={classes.center}>
        <h1> Add Hospital Menu</h1>

        <form id="createUser-form" onSubmit={RegisterUserHandler}>
          <UserTypeSelection
            label="--User Type --"
            options={superAdminUserType}
            onChange={registerUserTypeChangeHandler}
          />

          <InputField
            type="text"
            label="User ID"
            onChange={registerUserIdChangeHandler}
            //value={registerUserId}
            value={props.selectedHospitalDataForAdminCreation.userId}
          />
          <InputField
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler}
            //value={registerUserPassword}
            value={props.selectedHospitalDataForAdminCreation.password}
          />
          {registerUserType === "Admin" && (
            <InputField
              type="text"
              label="Hospital ID"
              onChange={registerUserHospitalIdChangeHandler}
              value={props.selectedHospitalDataForAdminCreation.hospitalId}
              //value={selectedHospitalIDForAddUser}
            />
          )}
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
