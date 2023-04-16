import React, { useState } from "react";
import InputField from "../../../Components/Screens/UI Elements/MenuForm Elements/InputField";
import classes from "./AddOptions.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const AddDoctor = (props) => {
  const [doctorData, setDoctorData] = useState({
    userId: "",
    password: "",
    name: "",
    licId: "",
    contact: "",
    userId: "",
    docSpecialization: "",
  });

  const registerDoctorResponseHandler = (doctorRegisterResponseData) => {
    if (doctorRegisterResponseData.errorMessage === null) {
      if (doctorRegisterResponseData.isDoctorRegisteredSuccessfully === true) {
        cleanDataAfterDoctorRegistrationHandler(
          doctorRegisterResponseData.registeredDoctorData
        );
      }
      if (doctorRegisterResponseData.isDoctorRegisteredSuccessfully === false) {
        showMessageBarAtTheBottom({
          message: "Some error occured. Please try again later.",
          isErrorMessage: true,
        });
      }
    } else if (doctorRegisterResponseData.registeredDoctorData === null) {
      showMessageBarAtTheBottom({
        message: doctorRegisterResponseData.errorMessage,
        isErrorMessage: true,
      });
    }
  };

  const updateDoctorData = (doctorDataToUpdate) => {
    setDoctorData((doctorData) => {
      return { ...doctorData, ...doctorDataToUpdate };
    });
  };

  const cleanDataAfterDoctorRegistrationHandler = (doctorData) => {
    showMessageBarAtTheBottom({
      message: "Doctor registered successfully.",
      isErrorMessage: false,
    });

    setDoctorData({
      userId: "",
      password: "",
      name: "",
      licId: "",
      phoneNum: "",
      userId: "",
      docSpecialization: "",
    });
    props.refreshUsersListResponseHandler();
    BackButtonPressedHandler();
  };

  const showMessageBarAtTheBottom = (propData) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: propData.message,
      isErrorMessage: propData.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  const doctorNameChangeHandler = (event) => {
    updateDoctorData({ name: event.target.value });
  };

  const doctorUserIdChangeHandler = (event) => {
    updateDoctorData({ userId: event.target.value });
  };

  const doctorContactChangeHandler = (event) => {
    updateDoctorData({ contact: event.target.value });
  };

  const doctorSplChangeHandler = (event) => {
    updateDoctorData({ docSpecialization: event.target.value });
  };

  const doctorPasswordChangeHandler = (event) => {
    updateDoctorData({ password: event.target.value });
  };

  const doctorLIdChangeHandler = (event) => {
    updateDoctorData({ licId: event.target.value });
  };

  const AddDoctorDataHandler = (event) => {
    event.preventDefault();
    AdminAPIHandler.registerDoctor({
      doctorData: doctorData,
      registerDoctorResponseHandler: registerDoctorResponseHandler,
    });
  };

  const BackButtonPressedHandler = () => {
    console.log("BackButtonPressedHandler");
    props.setAdminOption("");
  };

  return (
    <div>
      <div className={classes.center}>
        <h1> Add Doctor Menu</h1>

        <form id="addDoctor-form" onSubmit={AddDoctorDataHandler}>
          <InputField
            type="text"
            label="Doctor Name"
            onChange={doctorNameChangeHandler}
            value={doctorData.name}
          />
          <InputField
            type="text"
            label="Doctor license ID"
            onChange={doctorLIdChangeHandler}
            value={doctorData.licId}
          />
          <InputField
            type="text"
            label="Contact Number"
            onChange={doctorContactChangeHandler}
            value={doctorData.phoneNum}
          />

          <InputField
            type="text"
            label="Doctor Specialization"
            onChange={doctorSplChangeHandler}
            value={doctorData.docSpecialization}
          />
          <InputField
            type="text"
            label="User Id"
            onChange={doctorUserIdChangeHandler}
            value={doctorData.userId}
          />

          <InputField
            type="text"
            label="Password"
            onChange={doctorPasswordChangeHandler}
            value={doctorData.password}
          />
          <div>
            <MenuSubmitButton value="Register" />
            <MenuSubmitButton
              value="Cancel"
              onClick={BackButtonPressedHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
