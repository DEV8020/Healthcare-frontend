import React, { useState } from "react";
import classes from "./Login.module.css";
import SubmitButton from "../../../Components/Screens/UI Elements/Login/Register Elements/submitButton";
import ForgotPasswordButton from "../../../Components/Screens/UI Elements/Login/Register Elements/ForgotPasswordButton";
import LoginController from "../../../Controllers/LoginController";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import LoginUtilities from "../LoginUtilities/LoginUtilities";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import UsernameInput from "../../../Component/LoginModule/UserLoginInputTextField/UserNameInput";
import UserTypeSelection from "../../../Component/LoginModule/UserTypeSelection/UserTypeSelection";


const Login = (props) => {

  const [userLoginData, setUserLoginData] = useState(
    LoginUtilities.getLoginInitialData()
  );

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
    loginDataChangeHandler({
      [LoginUtilities.getLoginDataKeys().userRoleKey]: event.target.value,
    });
  };

  const userIdChangeHandler = (event) => {
    loginDataChangeHandler({
      [LoginUtilities.getLoginDataKeys().userNameKey]: event.target.value,
    });
  };

  const userPasswordChangeHandler = (event) => {
    loginDataChangeHandler({
      [LoginUtilities.getLoginDataKeys().userPasswordKey]: event.target.value,
    });
  };

  const loginDataChangeHandler = (modifiedData) => {
    setUserLoginData((userData) => {
      return { ...userData, ...modifiedData };
    });
  };

  const userLoginResponseHandler = (userLoginResponseData) => {
    const userID = userLoginData[LoginUtilities.getLoginDataKeys().userNameKey];

    if (userLoginResponseData.isLoginFlag === true) {
      showMessageAtBottomBar({
        message: userID + " logged in successfully.",
        isErrorMessage: false,
      });
      UtilitiesMethods.processUserLoginData(
        userLoginResponseData.loggedInUserData
      );
      setUserAsLoggedIn();
    } else {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          userLoginResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
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
    const loggedInUserData = userLoginData;
    setUserLoginData(LoginUtilities.getLoginInitialData());
    props.onLogin(loggedInUserData);
  };

  const LoginHandler = (event) => {
    event.preventDefault();
    console.log("LoginHandler called");
    console.log(userLoginData);

    // console.log();

    //Validation for User Type not selected for login...
    if (
      UtilitiesMethods.getSpaceTrimmedLenght(
        userLoginData[LoginUtilities.getLoginDataKeys().userRoleKey]
      ) === 0
    ) {
      //Error message for the User Type not selected...
      props.showBottomMessageBar({
        message:
          LoginUtilities.getLoginModuleValidationMessagesText()
            .userTypeNotSelected,
        isErrorMessage: true,
      });
      return;
    }
    LoginController.GetUserLoginData({
      userData: userLoginData,
      userLoginResponseHandler: userLoginResponseHandler,
    });
  };

  const hospitalUerTypeOptions = [
    { option: LoginUtilities.getLoginUserTypeKeys().superAdminTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().adminTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().supervisorTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().doctorTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().frontDeskTypeKey },
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

        {/* Login Module User ID Input Text Field */}
        <UsernameInput
          type="text"
          label={LoginUtilities.getLoginLabelKeys().userNameKey}
          onChange={userIdChangeHandler}
          value={userLoginData[LoginUtilities.getLoginDataKeys().userNameKey]}
        />

        {/* Login Module User Password Input Text Field */}
        <UsernameInput
          type="password"
          label="Password"
          onChange={userPasswordChangeHandler}
          value={
            userLoginData[LoginUtilities.getLoginDataKeys().userPasswordKey]
          }
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
