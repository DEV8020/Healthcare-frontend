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

  console.log("props.selectedHospitalDataForAdminCreation in reateuser.js");
  console.log(props.selectedHospitalDataForAdminCreation);

  console.log("supervisor data in reateuser.js");
  console.log(props.supervisorDataForAdminCreation);


  var setSupervisorData = (updateSupervisorData) => {
    props.SuperVisorDataUpdateCallBackHandler({
     ...props.supervisorDataForAdminCreation,
     ...updateSupervisorData
    });
  };



  //***************** Text Inputs Text Change Handler Methods... *****************//

  //Method for handling the hospital id change handler event...
  const registerUserHospitalIdChangeHandler = (event) => {
    showErrroMessage("Please choose hospital id from the list.");
  };

  //Method for handling the user id change handler event...
  const registerUserIdChangeHandler = (event) => {
    setHospitalData({ userId: event.target.value });
  };

  //Method for handling the user password change handler event...
  const registerUserPasswordChangeHandler = (event) => {
    setHospitalData({ password: event.target.value });
  };

  //Method for handling the user name change handler event...
  const registerUserNameChangeHandler = (event) => {
    setHospitalData({ name: event.target.value });
  };

  //Method for handling the user contact change handler event...
  const registerUserContactChangeHandler = (event) => {
    setSupervisorData({ contact: event.target.value });
  };

  //Method for handling the user address change handler event...
  const registerUserAddressChangeHandler = (event) => {
    setSupervisorData({ address: event.target.value });
  };

  //***************** Text Inputs Text Change Handler Methods Ends Here... *****************//



  const RegisterUserHandler = (event) => {
    event.preventDefault();

    var addUserData = { name: "dhruv", contact: "khaddj", address: "400001" };

    if (props.selectedHospitalDataForAdminCreation.userType === "Supervisor") {
      addUserData = {
        ...addUserData,
        ...props.selectedHospitalDataForAdminCreation,
      };
    } else {
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


    props.SuperVisorDataUpdateCallBackHandler({
      contact: "",
      address: "",
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
            onChange={registerUserNameChangeHandler}
            value={props.selectedHospitalDataForAdminCreation.name}
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
            onChange={registerUserContactChangeHandler}
            value={props.supervisorDataForAdminCreation.contact}
          />

          <InputField
            type="text"
            label="Address"
            onChange={registerUserAddressChangeHandler}
            value={props.supervisorDataForAdminCreation.address}
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
