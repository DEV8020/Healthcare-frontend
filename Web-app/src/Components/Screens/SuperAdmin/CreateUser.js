import React, { useState, useEffect } from "react";
import classes from "./CreateUser.module.css";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import InputField from "../UI Elements/MenuForm Elements/InputField";
// import AddButton from "../UI Elements/MenuForm Elements/addButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";


const CreateUser = (props) => {

  const [registerUserType, setRegisterUserType] = useState("");
  const [registerUserId, setRegisterUserId] = useState("");
  const [selectedHospitalIDForAddUser, setSelectedHospitalIDForAddUser] =
    useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");

  const [hospitalDataForAdminCreation, setHospitalDataForAdminCreation] =
    useState({});

  useEffect(() => {
    setHospitalDataForAdminCreation(props.selectedHospitalDataForAdminCreation);
  }, [props.selectedHospitalDataForAdminCreation]);

 

  useEffect(() => {
    setSelectedHospitalIDForAddUser(props.selectedHospitalIDForAddUser);
  }, [props.selectedHospitalIDForAddUser, setSelectedHospitalIDForAddUser]);

  useEffect(() => {
    // props.HospitalRegistrationDataUpdateCallBackHandler(
    //   hospitalDataForAdminCreation
    // );
  }, [hospitalDataForAdminCreation, props.HospitalRegistrationDataUpdateCallBackHandler, props.hospitalDataForAdminCreation]);

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
    console.log("setHospitalData updateData");
    console.log(updateData);
    console.log(".props.selectedHospitalDataForAdminCreation, updateData");
    console.log(props.selectedHospitalDataForAdminCreation);
    console.log(updateData);
    console.log({...props.selectedHospitalDataForAdminCreation, ...updateData});
    // HospitalRegistrationDataUpdateCallBackHandler(r);
    props.HospitalRegistrationDataUpdateCallBackHandler({...props.selectedHospitalDataForAdminCreation, ...updateData});
    //props.HospitalRegistrationDataUpdateCallBackHandler({...props.hospitalDataForAdminCreation, ...props});
    // props.setHospitalDataForAdminCreation((hospitalData) => {
    //   // console.log("Block run for the setHospitalDataForAdminCreation");
    //   // console.log({ ...hospitalData, ...props });
    //   return { ...hospitalData, ...props };
    // });
  };

  const registerUserHospitalIdChangeHandler = (event) => {
   
  };

  const registerUserIdChangeHandler = (event) => {
    // console.log("event.target.value");
    // console.log(event.target.value);
    setHospitalData({ userId: event.target.value });
  };

  const registerUserPasswordChangeHandler = (event) => {
    setHospitalData({ password: event.target.value });
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
              value={hospitalDataForAdminCreation.hospitalId}
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
