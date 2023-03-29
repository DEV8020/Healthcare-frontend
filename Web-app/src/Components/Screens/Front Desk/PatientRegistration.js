import React, { useState } from "react";
import RegisterPatientService from "../../../Services/RegisterPatientService";
import classes from "./PatientRegistration.module.css";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import Bdate from "../UI Elements/Date Element/Bdate";
import TextBox from "../UI Elements/MenuForm Elements/TextBox";
import RadioButton from "../UI Elements/MenuForm Elements/RadioButton";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";


const PatientRegistration = (props) => {
  const [patientName, setPatientName] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientContactNo, setPatientContactNo] = useState("");
  const [patientBdate, setPatientBdate] = useState("");
  const [patientSex, setPatientSex] = useState("");

  const patientNameChangeHandler = (event) => {
    setPatientName(event.target.value);
  };
  const patientAddressChangeHandler = (event) => {
    setPatientAddress(event.target.value);
  };

  const patientContactNoChangeHandler = (event) => {
    setPatientContactNo(event.target.value);
  };

  const patientSexChangeHandler = (event) => {
    setPatientSex(event.target.value);
  };

  const patientBdateChangeHandler = (event) => {
    setPatientBdate(event.target.value);
  };

  const AddPatientDataHandler = (event) => {
    event.preventDefault();

    const patientData = {
      patient_name: patientName,
      patient_address: patientAddress,
      patient_Contact: patientContactNo,
      patient_sex: patientSex,
      patient_age: patientBdate,
    };
    props.setAlertMessage(patientName + "has been registered successfully");
    props.setAlertFlag(true);

    setPatientName("");
    setPatientContactNo("");
    setPatientSex("");
    setPatientAddress("");
    setPatientBdate("");

  

    // RegisterPatientHandler(patientData);
  };
  const RegisterPatientHandler = async (patientData) => {
    console.log(patientData);

    try {
      RegisterPatientService(patientData);
    } catch (exception) {
      console.log(exception);
    }
  
  };
  return (
    <div>
      <div className={classes.center}>
        <h1> Register Patient</h1>

        <form id="addPatient-form" onSubmit={AddPatientDataHandler}>
          <InputField
            type="text"
            label="Patient Name"
            value={patientName}
            onChange={patientNameChangeHandler}
          />
         
         <InputField
            type="text"
            label="Contact Number"
            value={patientContactNo}
            onChange={patientContactNoChangeHandler}
          />

<InputField
            type="text"
            label="Sex"
            value={patientSex}
            onChange={patientSexChangeHandler}
          />

{/* <RadioButton heading="Gender" label1="Male" label2="Female" label3="Other" onChange={patientSexChangeHandler}/> */}

       
           <Bdate
            value={patientBdate}
            onChange={patientBdateChangeHandler}
          /> 
          {/* <InputField
            type="text"
            label="DOB"
            value={patientBdate}
            onChange={patientBdateChangeHandler}
          /> */}
           <TextBox.TextBox
            type="text"
            label="Address"
            value={patientAddress}
            onChange={patientAddressChangeHandler}
          />
          

          <MenuSubmitButton value="Register" />
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;