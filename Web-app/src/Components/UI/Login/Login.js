import React,{useState} from "react";
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

  
    
}


  return (
    <div className={classes.login}>
      <form id = "login-form" onSubmit={LoginHandler}>
      <header>
      <h2>HOSPITAL SYSTEM</h2>
      </header>
   
   <br />
       
        <InputField placeHolder="Email ID" type="email" isRequired={true} onChange={userIdChangeHandler} />
        <br />
        
        
        <InputField placeHolder="Password" type="password" minLength="8" onChange={userPasswordChangeHandler} />

        <br />
        
<label  htmlFor="userType" className={classes.label} >User Type</label>
<select id="userType" className={classes.select} onChange={userTypeChangeHandler}>
<option value="Doctor">Doctor</option>
<option value="Front Desk">Front Desk</option>
</select>
<br />





        <button className = {classes.button} value="Log In" type="submit" form="login-form" >Log in</button>

        <br />
        <br />
      </form>
    </div>
  );
};

export default Login;
