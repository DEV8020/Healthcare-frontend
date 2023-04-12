import React, { useState } from "react";
import RegisterPatientService from "../../../Services/RegisterPatientService";
import classes from "./PatientRegistration.module.css";
import InputField from "../../../Components/Screens/UI Elements/MenuForm Elements/InputField";
// import AddButton from "../UI Elements/MenuForm Elements/addButton";
import Bdate from "../../../Components/Screens/UI Elements/Date Element/Bdate";
import TextBox from "../../../Components/Screens/UI Elements/MenuForm Elements/TextBox";
// import RadioButton from "../UI Elements/MenuForm Elements/RadioButton";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";

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
      name: patientName,
      address: patientAddress,
      contact: patientContactNo,
      sex: patientSex,
      age: "22",
      // age: patientBdate,
    };

    FrontDeskAPIHandler.RegisterNewPatientAPICall({
      patientData: patientData,
      registerNewPatientResponseCallBack: registerNewPatientResponseCallBack,
    });
  };

  const showErrorMessageScreen = (errorMessage, isError) => {
    console.log(isError);
    props.setAlertMessage(errorMessage);
    props.setAlertFlag(true);
  };

  const registerNewPatientResponseCallBack = (newPatientResponseData) => {
    console.log("registerNewPatientResponseHandler response is ");
    console.log(newPatientResponseData);

    if (newPatientResponseData.errorMessage === null) {
      if (newPatientResponseData.isNewPatientAdded === true) {
        showErrorMessageScreen(
          patientName + " has been registered successfully.",
          false
        );
        resetPatientDataAfterRegister();
      }
      if (newPatientResponseData.isNewPatientAdded === false) {
        showErrorMessageScreen(
          "Some error occured. Please try again later.",
          true
        );
      }
    } else if (newPatientResponseData.isNewPatientAdded === null) {
      showErrorMessageScreen(newPatientResponseData.errorMessage, true);
    }
  };

  const resetPatientDataAfterRegister = () => {
    setPatientName("");
    setPatientContactNo("");
    setPatientSex("");
    setPatientAddress("");
    setPatientBdate("");
  };


const cancelButtonHandler = () => {
  props.setFrontDeskOption("frontDesk");
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

          <Bdate value={patientBdate} onChange={patientBdateChangeHandler} />
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
<div>
          <MenuSubmitButton value="Register" />
          <MenuSubmitButton value="Cancel" onClick={cancelButtonHandler}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
