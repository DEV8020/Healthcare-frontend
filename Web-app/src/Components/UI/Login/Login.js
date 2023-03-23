import React, { useState } from "react";
import AddPatient from "../Front Desk/CreateAppointment";

import classes from "./Login.module.css";
import SubmitButton from "../UI Elements/Login/Register Elements/submitButton";
import UsernameInput from "../UI Elements/Login/Register Elements/UserNameInput";
import ForgotPasswordButton from "../UI Elements/Login/Register Elements/ForgotPasswordButton";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";

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

  const LoginHandler = (event) => {
    event.preventDefault();

    const userData = {
      user_type: userType,
      user_id: userId,
      user_password: userPassword,
    };

    setUserType("");
    setUserId("");
    setUserPassword("");
    props.setAlertMessage(userId + " login successfully");
    props.setAlertFlag(true);
    props.onLogin(userData);
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
