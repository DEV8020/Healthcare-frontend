import React, { useState } from "react";

import classes from "./Login.module.css";
import SubmitButton from "../../../Components/Screens/UI Elements/Login/Register Elements/submitButton";
import UsernameInput from "../../../Components/Screens/UI Elements/Login/Register Elements/UserNameInput";
import ForgotPasswordButton from "../../../Components/Screens/UI Elements/Login/Register Elements/ForgotPasswordButton";
import UserTypeSelection from "../../../Components/Screens/UI Elements/Login/Register Elements/UserTypeSelection";

import LoginController from "../../../Controllers/LoginController";
import MessageComponent from "../../../Components/Screens/MessageComponent/MessageComponent";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const Login = (props) => {
  const [userType, setUserType] = useState("Doctor");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //Function to handle forgot password fucntionality...
  const forgotPasswordButtonClickHandler = () => {
    //MessageComponent showMessageScreen method to display appropriate message...
    // MessageComponent.showMessageScreen({
    //   message: {
    //     message: "Please contact admin to recover your password.",
    //     isTrueFlag: true,
    //   },
    //   alertMessageElement: props.setAlertMessage,
    //   alertMessageFlag: props.setAlertFlag,
    //   isErrorMessage: true,
    // });
  };

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
    if (userLoginData.isLoginFlag === true) {
      showMessageAtBottomBar({ message: "", isErrorMessage: false });
      UtilitiesMethods.processUserLoginData(userLoginData.loggedInUserData);
    } else {
      showMessageAtBottomBar({
        message: userLoginData.errorMessage,
        isErrorMessage: true,
      });
    }
    if (userLoginData.errorMessage === null) {
      if (userLoginData.isLoginFlag === true) {
        props.setAlertMessage(userId + " login successfully");
        setUserAsLoggedIn();
      }
      if (userLoginData.isLoginFlag === false) {
        MessageComponent.showMessageScreen({
          message: { message: "Invalid Credentials.", isTrueFlag: true },
          alertMessageElement: props.setAlertMessage,
          alertMessageFlag: props.setAlertFlag,
          isErrorMessage: true,
        });
      }
    } else if (userLoginData.isLoginFlag === null) {
      MessageComponent.showMessageScreen({ message: { message: "" } });
    }
  };

  const showMessageAtBottomBar = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
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
      userData: userData,
      userLoginResponseHandler: userLoginResponseHandler,
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

        <ForgotPasswordButton
          value="Forgot Password?"
          onClickHandler={forgotPasswordButtonClickHandler}
        />
        <SubmitButton value="Login" />
      </form>
    </div>
  );
};

export default Login;
