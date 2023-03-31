import React, { useState, useEffect } from "react";
import classes from "./CreateUser.module.css";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import InputField from "../UI Elements/MenuForm Elements/InputField";
// import AddButton from "../UI Elements/MenuForm Elements/addButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";

// import createUser from "../../../Services/CreateUser";

const CreateUser = (props) => {
  const [registerUserType, setRegisterUserType] = useState("");
  const [registerUserId, setRegisterUserId] = useState("");
  // const [selectedHospitalDataForAddUser, setSelectedHospitalDataForAddUser] =
    useState();
  const [selectedHospitalIDForAddUser, setSelectedHospitalIDForAddUser] =
    useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");

  // selectedHospitalForAddUser

  // const [hospitalsListWithNoAdmin, setHospitalsListtWithNoAdmins] = useState(
  //   null
  // );

  //selectedHospitalIDForAddUser

  useEffect(() => {
    // console.log("useEffect in createuser.js calling ");
    setSelectedHospitalIDForAddUser(props.selectedHospitalIDForAddUser);
  }, [props.selectedHospitalIDForAddUser]);

  // setSelectedHospitalIDForAddUser(props.selectedHospitalIDForAddUser);

  // console.log("props.selectedHospitalForAddUser");
  // console.log(props.selectedHospitalIDForAddUser);
  

  props.setHospitalDetailsView(registerUserType);

  const registerUserTypeChangeHandler = (event) => {
    setRegisterUserType(event.target.value);
  };
  const registerUserHospitalIdChangeHandler = (event) => {
    // setRegisterUserHospitalId(event.target.value);
  };

  const registerUserIdChangeHandler = (event) => {
    // console.log(selectedHospitalDataForAddUser);
    setRegisterUserId(event.target.value);
  };

  const registerUserPasswordChangeHandler = (event) => {
    setRegisterUserPassword(event.target.value);
  };

  const RegisterUserHandler = (event) => {
    console.log("RegisterUserHandler calleld");

    event.preventDefault();

    const registerUserData = {
      name: registerUserId,
      userId: registerUserId,
      password: registerUserPassword,
      userType: registerUserType,
      hospitalId: selectedHospitalIDForAddUser,
    };

    SuperAdminAPIHandler.AddNewUserData({
      registerUserData: registerUserData,
      addNewUserResponseHandler: addNewUserResponseHandler,
    });
  };

  const hopitalListWithNoAdminsResponseHandler = (hospitalListResponseData) => {
    // isHospitalListRecieved: true,
    // hospitalListData: hospitalsListServiceData.responseData.data,
    // errorMessage: null,
    // console.log("hopitalListWithNoAdminsResponseHandler called");
    // console.log(hospitalListResponseData);
    if (hospitalListResponseData.isHospitalListRecieved === true) {
      //setHospitalsListtWithNoAdmins(hospitalListResponseData.hospitalListData);
      // console.log("hopitalListWithNoAdminsResponseHandler inner loop  called");
      props.hospitalListsWithNoAdminsCallBackHandler(
        hospitalListResponseData.hospitalListData
      );
    }
  };

  const addNewUserResponseHandler = (newUserData) => {
    // console.log("addNewUserResponseHandler called");
    // console.log(newUserData);
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
    showMessageDisplayScreen(registerUserId + " registered successfully");
    setRegisterUserType("");
    setRegisterUserId("");
    setRegisterUserPassword("");
    setSelectedHospitalIDForAddUser("");
    console.log("addNewUserSuccessHandler called 2");
  };

  const showMessageDisplayScreen = (emessageToBeDisplayed) => {
    props.setAlertMessage(emessageToBeDisplayed);
    props.setAlertFlag(true);
  };

  const BackButtonPressedHandler = () => {
    props.setSuperAdminOption("");

  };

  const superAdminUserType = [{ option: "Admin" }, { option: "Supervisor" }];

  useEffect(() => {
    SuperAdminAPIHandler.GetHospitalListsDataWithNoAdmins({
      hopitalListWithNoAdminsResponseHandler:
        hopitalListWithNoAdminsResponseHandler,
    });
  }, [registerUserType]);

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
            value={registerUserId}
          />
          <InputField
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler}
            value={registerUserPassword}
          />
          {registerUserType === "Admin" && (
            <InputField
              type="text"
              label="Hospital ID"
              onChange={registerUserHospitalIdChangeHandler}
              value={selectedHospitalIDForAddUser}
            />
          )}
          <div>
            <MenuSubmitButton value="Register" />
            <MenuSubmitButton value="Cancel" onClick={BackButtonPressedHandler}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
