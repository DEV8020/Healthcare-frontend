import React, { useState } from "react";
import AddPatient from "../Front Desk/AddPatient";
import Button from "../UI Elements/Button/Button";
import InputField from "../UI Elements/Input Field/InputField";
import classes from "./Login.module.css";

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

    props.onLogin(userData);
  };

  return (
    <div className={classes.center}>
      <h1> Hospital Login</h1>

      <form id="login-form" onSubmit={LoginHandler}>
        <select
          id="userType"
          className={classes.select}
          onChange={userTypeChangeHandler}
        >
          <option value="" className={classes.option}>
            --User Type--
          </option>
          <option value="Doctor" className={classes.option}>
            Doctor
          </option>
          <option value="Front Desk" className={classes.option}>
            Front Desk
          </option>
        </select>

        <div className={classes.txt_field}>
          <input type="text" required />
          <span></span>
          <label>Username</label>
        </div>

        <div className={classes.txt_field}>
          <input type="password" required />
          <span></span>
          <label>Password</label>
        </div>

        <div className={classes.pass}>Forgot Password?</div>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
