import React, { useState } from "react";
import AddHospitalService from "../../../Services/AddHospitalService";
import classes from './AddOptions.module.css'
import InputField from "../UI Elements/AdminMenuForm Elements/InputField";
import AddButton from "../UI Elements/AdminMenuForm Elements/addButton";
import NavBar from "../UI Elements/NavBar/NavBar";

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

  // const BackButtonHandler = () => {
  //   props.setAdminOption("admin");
  // };
  
  // const hospitalSupervisorIds = [{ option: "1" }, { option: "2" }];
  return (
    <div>
      
      {/* <span className={classes.NavBar}>
      Admin<button value="logout" className={classes.back_btn} onClick={BackButtonHandler}>
          back
        </button>
      </span> */}
      {/* <NavBar value="back" label="Admin" onClick={BackButtonHandler}/> */}

    <div className={classes.center}>
      <h1> Add Hospital Menu</h1>

      <form id="addHospital-form" onSubmit={AddHospitalDataHandler}>
        
      <InputField
          type="text"
          label="Hospital Name"
          onChange={hospitalNameChangeHandler}
        />
        
        <InputField
          type="text"
          label="Address"
          onChange={hospitalAddressChangeHandler}
        />
        <InputField
          type="text"
          label="Supervisor ID"
          onChange={hospitalSupervisorIdChangeHandler}
        />
        

        <InputField
          type="text"
          label="Registration Id"
          onChange={hospitalIdChangeHandler}
        />
        
        <AddButton value="Register" />
      </form>
    </div>
    </div>
  );
};

export default AddHospital;
