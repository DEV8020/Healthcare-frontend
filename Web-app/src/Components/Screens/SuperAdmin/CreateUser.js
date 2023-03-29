import React, { useState } from "react";
import classes from "./CreateUser.module.css";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";

// import createUser from "../../../Services/CreateUser";


const CreateUser = (props) => {
  const [registerUserType, setRegisterUserType] = useState("");
  const [registerUserId, setRegisterUserId] = useState("");
  const[registerUserHospitalId,setRegisterUserHospitalId]=useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");

  const registerUserTypeChangeHandler = (event) => {
    setRegisterUserType(event.target.value);
  };
  const registerUserHospitalIdChangeHandler = (event) => {
    setRegisterUserHospitalId(event.target.value);
  };
  

  const registerUserIdChangeHandler = (event) => {
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
      userType : registerUserType
    };


    SuperAdminAPIHandler.AddNewUserData({
      registerUserData : registerUserData,
      addNewUserResponseHandler : addNewUserResponseHandler
    });

    // setRegisterUserType("");
    // setRegisterUserId("");
    // setRegisterUserPassword("");
    // setRegisterUserHospitalId("");

    

    // // CreateUserHandler(registerUserData);
    // props.setAlertMessage(registerUserId + " registered successfully");
    // props.setAlertFlag(true);
  };
  // const CreateUserHandler = async (registerUserData) => {
  //   console.log(registerUserData);

  //   try {
  //     await createUser(registerUserData);
  //   } catch (exception) {
  //     console.log(exception);
  //   }
  // };


//AddNewUserData

// props.addNewUserResponseHandler({
//   isNewUserAdded: null,
//   newUserData : null,
//   errorMessage: addNewUserServiceData.responseError.message,
// });


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
    setRegisterUserHospitalId("");
    showMessageDisplayScreen(registerUserId + " registered successfully");
  };


  const showMessageDisplayScreen = (emessageToBeDisplayed) => {
    props.setAlertMessage(emessageToBeDisplayed);
    props.setAlertFlag(true);
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
            onChange={registerUserIdChangeHandler} value={registerUserId}
          />
          <InputField
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler} value={registerUserPassword}
          />
          {registerUserType === "Admin" &&<InputField
            type="text"
            label="Hospital ID"
            onChange={registerUserHospitalIdChangeHandler} value={registerUserHospitalId}
          />
          }
          <MenuSubmitButton value="Register" />
        </form>
      </div>
      </div>
    );
};

export default CreateUser;
