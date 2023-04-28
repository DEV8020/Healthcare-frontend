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
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";

const Login = (props) => {
  const [userLoginData, setUserLoginData] = useState(
    LoginUtilities.getLoginInitialData()
  );

  //Function to handle forgot password fucntionality...
  const forgotPasswordButtonClickHandler = () => {
    var message =
      LoginUtilities.getLoginModuleValidationMessagesText()
        .forgotPasswordDBAdminMessage;

    if (
      userLoginData[[LoginUtilities.getLoginDataKeys().userRoleKey]] ===
        LoginUtilities.getLoginUserTypeKeys().adminTypeKey ||
      userLoginData[[LoginUtilities.getLoginDataKeys().userRoleKey]] ===
        LoginUtilities.getLoginUserTypeKeys().supervisorTypeKey
    ) {
      message =
        LoginUtilities.getLoginModuleValidationMessagesText()
          .forgotPasswordSuperAdminMessage;
    } else if (
      userLoginData[[LoginUtilities.getLoginDataKeys().userRoleKey]] ===
        LoginUtilities.getLoginUserTypeKeys().frontDeskTypeKey ||
      userLoginData[[LoginUtilities.getLoginDataKeys().userRoleKey]] ===
        LoginUtilities.getLoginUserTypeKeys().doctorTypeKey
    ) {
      message =
        LoginUtilities.getLoginModuleValidationMessagesText()
          .forgotPasswordAdminMessage;
    }

    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: message,
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().infoKey,
    });
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
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          userID + " logged in successfully.",
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().successKey,
      });
      UtilitiesMethods.processUserLoginData(
        userLoginResponseData.loggedInUserData
      );
      setUserAsLoggedIn();
      if (
        userLoginData[LoginUtilities.getLoginDataKeys().userRoleKey] ===
        LoginUtilities.getLoginUserTypeKeys().doctorTypeKey
      ) {
        downloadDoctorFollowUpAttributesList();
      }
    } else {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          userLoginResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
    }
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

    const userValidationData =
      LoginUtilities.checkUserLoginValidations(userLoginData);

    if (
      userValidationData[
        UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
      ] === true
    ) {
      props.showBottomMessageBar(userValidationData);
      return;
    }

    LoginController.GetUserLoginData({
      userData: userLoginData,
      userLoginResponseHandler: userLoginResponseHandler,
    });
  };

  const downloadDoctorFollowUpAttributesList = () => {
    LoginController.GetDoctorFollowUpAttributesData({
      getDoctorFollowUpAttributesResponseHandler:
        getDoctorFollowUpAttributesResponseHandler,
    });
  };

  const getDoctorFollowUpAttributesResponseHandler = (attributeData) => {
    UtilitiesMethods.setAttributesDataForDoctor(attributeData.attributesData);
  };

  const hospitalUerTypeOptions = [
    { option: LoginUtilities.getLoginUserTypeKeys().superAdminTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().adminTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().supervisorTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().doctorTypeKey },
    { option: LoginUtilities.getLoginUserTypeKeys().frontDeskTypeKey },
  ];

  var userRoleType =
    userLoginData[LoginUtilities.getLoginDataKeys().userRoleKey];

  return (
    <>
      <NavBar />

      <div className={classes.center}>
        <h1> {userRoleType} Login</h1>

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

          <SubmitButton value="Login" />
        </form>

        <ForgotPasswordButton
          value="Forgot Password?"
          onClickHandler={forgotPasswordButtonClickHandler}
        />
      </div>
    </>
  );
};

export default Login;
