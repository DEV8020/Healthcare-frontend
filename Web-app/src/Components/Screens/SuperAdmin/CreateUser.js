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
    
    event.preventDefault();

    var addUserData = { name: "dhruv", contact: "khaddj", address: "400001"};

    if (props.selectedHospitalDataForAdminCreation.userType === "Supervisor") {
      addUserData = {
        ...addUserData,
        ...props.selectedHospitalDataForAdminCreation,
      };
    }else{
      addUserData = props.selectedHospitalDataForAdminCreation;
    }

    SuperAdminAPIHandler.AddNewUserData({
      registerUserData: addUserData,
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
          <InputField
            type="text"
            label="User ID"
            onChange={registerUserIdChangeHandler}
            //value={registerUserId}
            value={props.selectedHospitalDataForAdminCreation.userId}
          />
          <InputField
            type="text"
            label="Name"
            // onChange={registerUserNameChangeHandler}
            // value={props.selectedHospitalDataForAdminCreation.name}
          />
          <InputField
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler}
            //value={registerUserPassword}
            value={props.selectedHospitalDataForAdminCreation.password}
          />

          <InputField
            type="text"
            label="Hospital ID"
            onChange={registerUserHospitalIdChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.hospitalId}
            //value={selectedHospitalIDForAddUser}
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
            // value={props.selectedHospitalDataForSupervisorCreation.userId}
          />
          <InputField
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler}
            // value={props.selectedHospitalDataForSupervisorCreation.password}
          />

          <InputField
            type="text"
            label="Name"
            onChange={registerUserHospitalIdChangeHandler}
            // value={props.selectedHospitalDataForSupervisorCreation.name}
          />

          <InputField
            type="text"
            label="Contact"
            onChange={registerUserHospitalIdChangeHandler}
            // value={props.selectedHospitalDataForSupervisorCreation.contact}
          />

          <InputField
            type="text"
            label="Address"
            onChange={registerUserHospitalIdChangeHandler}
            // value={props.selectedHospitalDataForSupervisorCreation.address}
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
