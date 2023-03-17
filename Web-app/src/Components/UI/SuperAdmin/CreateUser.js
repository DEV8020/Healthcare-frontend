import React, { useState } from "react";
import classes from "./CreateUser.module.css";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import UsernameInput from "../UI Elements/Login/Register Elements/UserNameInput";
import SubmitButton from "../UI Elements/Login/Register Elements/submitButton";
import createUser from "../../../Services/CreateUser";

const CreateUser = (props) => {
  const [registerUserType, setRegisterUserType] = useState("");
  const [registerUserId, setRegisterUserId] = useState("");
  const [registerUserPassword, setRegisterUserPassword] = useState("");

  const registerUserTypeChangeHandler = (event) => {
    setRegisterUserType(event.target.value);
  };

  const registerUserIdChangeHandler = (event) => {
    setRegisterUserId(event.target.value);
  };

  const registerUserPasswordChangeHandler = (event) => {
    setRegisterUserPassword(event.target.value);
  };

  const RegisterUserHandler = (event) => {
    event.preventDefault();

    const registerUserData = {
      registerUser_type: registerUserType,
      registerUser_id: registerUserId,
      registerUser_password: registerUserPassword,
    };

    setRegisterUserType("");
    setRegisterUserId("");
    setRegisterUserPassword("");

    //props.onLogin(registerUserData);

    CreateUserHandler(registerUserData);
  };
  const CreateUserHandler = async (registerUserData) => {
    console.log(registerUserData);

    try {
      await createUser(registerUserData);
    } catch (exception) {
      console.log(exception);
    }
  };
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  const superAdminUserType = [{ option: "Admin" }, { option: "Supervisor" }];
  return (
    <div>
      <h1 className={classes.head}>Super Admin</h1>
      <div className={classes.NavBar}>
        <button value="logout" className={classes.logout_btn} onClick={logout}>
          log-out
        </button>
      </div>
      <div className={classes.center}>
        <h1> Super Admin Menu</h1>

        <form id="superAdmin-form" onSubmit={RegisterUserHandler}>
          <UserTypeSelection
            options={superAdminUserType}
            onChange={registerUserTypeChangeHandler}
            label="--Use Type--"
          />

          <UsernameInput
            type="text"
            label="Username"
            onChange={registerUserIdChangeHandler}
          />
          <UsernameInput
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler}
          />
          <SubmitButton value="Register User" />
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
