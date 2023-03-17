import React, { useState } from "react";
import UserTypeSelection from "../UI Elements/Login/Register Elements/UserTypeSelection";
import UsernameInput from "../UI Elements/Login/Register Elements/UserNameInput";
import SubmitButton from "../UI Elements/Login/Register Elements/submitButton";
import AddHospitalService from "../../../Services/AddHospitalService";
import classes from './AddOptions.module.css'

const AddHospital = (props) => {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalSupervisorId, setHospitalSupervisorId] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  
    const hospitalNameChangeHandler=(event)=>{
        setHospitalName(event.target.value);
    };
  const hospitalSupervisorIdChangeHandler = (event) => {
    setHospitalSupervisorId(event.target.value);
  };

  const hospitalIdChangeHandler = (event) => {
    setHospitalId(event.target.value);
  };

  const hospitalAddressChangeHandler = (event) => {
    setHospitalAddress(event.target.value);
  };

  const AddHospitalDataHandler = (event) => {
    event.preventDefault();

    const hospitalData = {
      hospital_name: hospitalName,
      hospital_id: hospitalId,
      hospital_address: hospitalAddress,
      hospital_supervisor_id:hospitalSupervisorId,
    };

    setHospitalName("");
    setHospitalSupervisorId("");
    setHospitalId("");
    setHospitalAddress("");

    //props.onLogin(hospitalData);

    AddHospitalHandler(hospitalData);
  };
  const AddHospitalHandler = async (hospitalData) => {
    console.log(hospitalData);

    try {
     AddHospitalService(hospitalData);
    } catch (exception) {
      console.log(exception);
    }
  };

  const hospitalSupervisorIds = [{ option: "1" }, { option: "2" }];
  return (
    <div>
        
    <div className={classes.center}>
      <h1> Add Hospital Menu</h1>

      <form id="superAdmin-form" onSubmit={AddHospitalDataHandler}>
        
      <UsernameInput
          type="text"
          label="Hospital Name"
          onChange={hospitalNameChangeHandler}
        />
        
        <UsernameInput
          type="text"
          label="Address"
          onChange={hospitalAddressChangeHandler}
        />
        <UserTypeSelection
          options={hospitalSupervisorIds}
          onChange={hospitalSupervisorIdChangeHandler}
          label="--Supervisor Id--"
        />

        <UsernameInput
          type="text"
          label="Registration Id"
          onChange={hospitalIdChangeHandler}
        />
        
        <SubmitButton value="Add Hospital" />
      </form>
    </div>
    </div>
  );
};

export default AddHospital;
