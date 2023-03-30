import React, { useState } from "react";

import classes from "./Login.module.css";
import SubmitButton from "../UI Elements/Login/Register Elements/submitButton";
import UsernameInput from "../UI Elements/Login/Register Elements/UserNameInput";
import ForgotPasswordButton from "../UI Elements/Login/Register Elements/ForgotPasswordButton";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";

import LoginController from "../../../Controllers/LoginController";

const Login = (props) => {
  const [userType, setUserType] = useState("Doctor");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userTypeChangeHandler = (event) => {
    setUserType(event.target.value);
  };

  const userIdChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  const userPasswordChangeHandler = (event) => {
    setUserPassword(event.target.value);
  };

  const userLoginResponseHandler = (userLoginData) => {
    //console.log("LoginResponseHandler login api response is ");
    //console.log(userLoginData);

    if (userLoginData.errorMessage === null) {
      if (userLoginData.isLoginFlag === true) {
        props.setAlertMessage(userId + " login successfully");
        setUserAsLoggedIn();
      } 
      if (userLoginData.isLoginFlag === false){
        console.log("userLoginData.isLoginFlag");
        props.setAlertMessage("Invalid Credentials.");
        props.setAlertFlag(true);
      }
    } else if (userLoginData.isLoginFlag === null) {
      props.setAlertMessage(userLoginData.errorMessage);
      props.setAlertFlag(true);
    }
  };

  const setUserAsLoggedIn = () => {
    const userData = {
      userType: userType,
      userId: userId,
      password: userPassword,
    };
    setUserType("");
    setUserId("");
    setUserPassword("");
    props.setAlertFlag(true);
    props.onLogin(userData);
  };

  const LoginHandler = (event) => {
    event.preventDefault();

    const userData = {
      userType: userType,
      userId: userId,
      password: userPassword,
    };

    LoginController.GetUserLoginData({
      userData : userData,
      userLoginResponseHandler : userLoginResponseHandler,
    });

    // setUserType("");
    // setUserId("");
    // setUserPassword("");
    // props.setAlertMessage(userId + " login successfully");
    // props.setAlertFlag(true);
    // props.onLogin(userData);
  };
  const hospitalUerTypeOptions = [
    { option: "Super Admin" },
    { option: "Admin" },
    { option: "Supervisor" },
    { option: "Doctor" },
    { option: "Front Desk" },
  ];
  return (
    <div className={classes.center}>
      <h1> Hospital Login</h1>

      <form id="login-form" onSubmit={LoginHandler}>
        <UserTypeSelection
          label="--User Type --"
          options={hospitalUerTypeOptions}
          onChange={userTypeChangeHandler}
        />

        <UsernameInput
          type="text"
          label="Username"
          onChange={userIdChangeHandler}
        />
        <UsernameInput
          type="password"
          label="Password"
          onChange={userPasswordChangeHandler}
        />

        <ForgotPasswordButton value="Forgot Password?" />
        <SubmitButton value="Login" />
      </form>
    </div>
  );
};

export default Login;
