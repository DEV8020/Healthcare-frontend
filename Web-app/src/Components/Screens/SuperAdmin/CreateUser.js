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
  const [selectedHospitalDataForAddUser, setSelectedHospitalDataForAddUser] = useState();
  const [selectedHospitalIDForAddUser, setSelectedHospitalIDForAddUser] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");


  // selectedHospitalForAddUser

  // const [hospitalsListWithNoAdmin, setHospitalsListtWithNoAdmins] = useState(
  //   null
  // );

//selectedHospitalIDForAddUser


useEffect(() => {
  setSelectedHospitalIDForAddUser(props.selectedHospitalIDForAddUser);
  }
);



// setSelectedHospitalIDForAddUser(props.selectedHospitalIDForAddUser);

  console.log("props.selectedHospitalForAddUser");
  console.log(props.selectedHospitalIDForAddUser);
  // console.log(selectedHospitalDataForAddUser);
  // console.log(selectedHospitalDataForAddUser);
  //selectedHospitalDataForAddUser.hospId

  //setSelectedHospitalDataForAddUser(props.selectedHospitalForAddUser);

  props.setHospitalDetailsView(registerUserType);

  const registerUserTypeChangeHandler = (event) => {
    setRegisterUserType(event.target.value);
  };
  const registerUserHospitalIdChangeHandler = (event) => {
    // setRegisterUserHospitalId(event.target.value);
  };

  const registerUserIdChangeHandler = (event) => {
    console.log(selectedHospitalDataForAddUser);
    setRegisterUserId(event.target.value);
  };

  const registerUserPasswordChangeHandler = (event) => {
    setRegisterUserPassword(event.target.value);
  };

  const RegisterUserHandler = (event) => {
    console.log("RegisterUserHandler calleld");

    event.preventDefault();

    // {registerUser_type: 'Admin',
    // registerUser_id: 'eeee',
    // registerUser_password: '123456',
    // registerUserHospitalId: '55'}

    // {
    //   "name": "Admin1",
    //   "userId":"admin1",
    //   "password":"admin1",
    //   "userType":"Admin"
    // }

    const registerUserData = {
      name: registerUserId,
      userId: registerUserId,
      password: registerUserPassword,
      userType: registerUserType,
      hospitalId : selectedHospitalIDForAddUser
    };

    // SuperAdminAPIHandler.GetHospitalListsDataWithNoAdmins({
    //   hopitalListWithNoAdminsResponseHandler:
    //     hopitalListWithNoAdminsResponseHandler,
    // });

    SuperAdminAPIHandler.AddNewUserData({
      registerUserData: registerUserData,
      addNewUserResponseHandler: addNewUserResponseHandler,
    });
  };

  const hopitalListWithNoAdminsResponseHandler = (hospitalListResponseData) => {
    // isHospitalListRecieved: true,
    // hospitalListData: hospitalsListServiceData.responseData.data,
    // errorMessage: null,
    console.log("hopitalListWithNoAdminsResponseHandler called");
    console.log(hospitalListResponseData);
    if (hospitalListResponseData.isHospitalListRecieved === true) {
      //setHospitalsListtWithNoAdmins(hospitalListResponseData.hospitalListData);
      console.log("hopitalListWithNoAdminsResponseHandler inner loop  called");
      props.hospitalListsWithNoAdminsCallBackHandler(
        hospitalListResponseData.hospitalListData
      );
    }
  };

  const addNewUserResponseHandler = (newUserData) => {
    console.log(newUserData);
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
    setRegisterUserType("");
    setRegisterUserId("");
    setRegisterUserPassword("");
    // setRegisterUserHospitalId("");
    showMessageDisplayScreen(registerUserId + " registered successfully");
  };

  const showMessageDisplayScreen = (emessageToBeDisplayed) => {
    props.setAlertMessage(emessageToBeDisplayed);
    props.setAlertFlag(true);
  };

  const superAdminUserType = [{ option: "Admin" }, { option: "Supervisor" }];

  useEffect(() => {
    if (
      registerUserType === "Admin" &&
      props.hospitalsListWithNoAdmin.length === 0
    ) {
      console.log(
        "SuperAdminAPIHandler GetHospitalListsDataWithNoAdmins API Called"
      );
      SuperAdminAPIHandler.GetHospitalListsDataWithNoAdmins({
        hopitalListWithNoAdminsResponseHandler:
          hopitalListWithNoAdminsResponseHandler,
      });
    }
  });

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
          <MenuSubmitButton value="Register" />
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
