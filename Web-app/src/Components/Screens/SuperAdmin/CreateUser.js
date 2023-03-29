import React, { useState } from "react";
import classes from "./CreateUser.module.css";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";


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
    event.preventDefault();

    const registerUserData = {
      registerUser_type: registerUserType,
      registerUser_id: registerUserId,
      registerUser_password: registerUserPassword,
      registerUserHospitalId:registerUserHospitalId
    };

    setRegisterUserType("");
    setRegisterUserId("");
    setRegisterUserPassword("");
    setRegisterUserHospitalId("");

    

    // CreateUserHandler(registerUserData);
    props.setAlertMessage(registerUserId + " registered successfully");
    props.setAlertFlag(true);
  };
  // const CreateUserHandler = async (registerUserData) => {
  //   console.log(registerUserData);

  //   try {
  //     await createUser(registerUserData);
  //   } catch (exception) {
  //     console.log(exception);
  //   }
  // };
  

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
          />
          <InputField
            type="text"
            label="Password"
            onChange={registerUserPasswordChangeHandler}
          />
          {registerUserType === "Admin" &&<InputField
            type="text"
            label="Hospital ID"
            onChange={registerUserHospitalIdChangeHandler}
          />
          }
          <AddButton value="Register" />
        </form>
      </div>
      </div>
    );
};

export default CreateUser;
