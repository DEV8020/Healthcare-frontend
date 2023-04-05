import React, { useState } from "react";

import AddDoctorService from "../../../Services/AddDoctorService";

import InputField from "../UI Elements/MenuForm Elements/InputField";
// import AddButton from "../UI Elements/MenuForm Elements/addButton";

import classes from "./AddOptions.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const AddDoctor = (props) => {
  // const [doctorName, setDoctorName] = useState("");
  // const [doctorPassword, setDoctorPassword] = useState("");
  // const [doctorEmailId, setDoctorEmailId] = useState("");
  // const [doctorSpl, setDoctorSpl] = useState("");
  // const [doctorContact, setDoctorContact] = useState("");
  // const [doctorLId, setDoctorLId] = useState("");

  const [doctorData, setDoctorData] = useState({
    userId: "",
    password: "",
    name: "",
    licId: "",
    phoneNum: "",
    userId: "",
    docSpecialization: "",
  });

  //   Add doctor
  // EndPoint: http://localhost:9191/addDoctor/{HospitalId}
  // Data:
  // {
  //    "userId": “doctor1”,
  //    "password": “doctor1”,
  //    "name": "Rajesh",
  //    "licId": "HSHSH",
  //    "phoneNum": "9090909090",
  //    "docSpecialization": "Ortho"
  // }

  //   SuperAdminUserRelatedAPIHandler.updateUserData({
  //     userData: userDataToBeUpdated,
  //     modifyUserDataResponseHandler: modifyUserDataResponseHandler,
  //   });
  // };


  // isDoctorRegisteredSuccessfully: true,
  // registeredDoctorData: registeredDoctorData.responseData.data,
  // errorMessage: null,

  const registerDoctorResponseHandler = (doctorRegisterResponseData) => {
    console.log("doctorRegisterResponseData");
    console.log(doctorRegisterResponseData);
    // return;
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
    console.log("updateDoctorData called");
    console.log({ ...doctorData, ...doctorDataToUpdate });
    setDoctorData((doctorData) => {
      return { ...doctorData, ...doctorDataToUpdate };
    });
  };

  const cleanDataAfterDoctorRegistrationHandler = (doctorData) => {
    // console.log();
    // console.log();
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

BackButtonPressedHandler();

  };

  const showMessageBarAtTheBottom = (propData) => {
    //({message : message, isErrorMessage : isErrorMessage}) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: propData.message,
      isErrorMessage: propData.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  // setAlertMessage={props.setAlertMessage}
  // setAlertFlag={props.setAlertFlag}

  const doctorNameChangeHandler = (event) => {
    updateDoctorData({ name: event.target.value });
  };

  const doctorUserIdChangeHandler = (event) => {
    updateDoctorData({ userId: event.target.value });
  };

  const doctorContactChangeHandler = (event) => {
    updateDoctorData({ phoneNum: event.target.value });
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

  const AddDoctorHandler = async (doctorData) => {
    console.log(doctorData);

    try {
      AddDoctorService(doctorData);
    } catch (exception) {
      console.log(exception);
    }
  };

  const AddDoctorDataHandler = (event) => {
    event.preventDefault();

    // const doctorData = {
    //   doctor_name: doctorName,
    //   doctor_spl: doctorSpl,
    //   doctor_password: doctorPassword,
    //   doctor_email_id: doctorEmailId,
    //   doctor_contact: doctorContact,
    //   doctor_LId: doctorLId,
    // };

    // setDoctorName("");
    // setDoctorEmailId("");
    // setDoctorSpl("");
    // setDoctorPassword("");
    // setDoctorContact("");
    // setDoctorLId("");

    // AddDoctorHandler(doctorData);

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
