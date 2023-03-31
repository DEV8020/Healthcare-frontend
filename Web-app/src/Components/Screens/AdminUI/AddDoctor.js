
import React, { useState } from "react";

import AddDoctorService from "../../../Services/AddDoctorService";


import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

import classes from "./AddOptions.module.css";

const AddDoctor = (props) => {
  const [doctorName, setDoctorName] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [doctorEmailId, setDoctorEmailId] = useState("");
  const [doctorSpl, setDoctorSpl] = useState("");
  const [doctorContact, setDoctorContact] = useState("");
  const [doctorLId, setDoctorLId] = useState("");
  

  const doctorNameChangeHandler = (event) => {
    setDoctorName(event.target.value);
  };
  const doctorEmailIdChangeHandler = (event) => {
    setDoctorEmailId(event.target.value);
  };

  const doctorContactChangeHandler = (event) => {
    setDoctorContact(event.target.value);
  };
  const doctorSplChangeHandler = (event) => {
    setDoctorSpl(event.target.value);
  };

  const doctorPasswordChangeHandler = (event) => {
    setDoctorPassword(event.target.value);
  };

  const doctorLIdChangeHandler = (event) => {
    setDoctorLId(event.target.value);
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

    const doctorData = {
      doctor_name: doctorName,
      doctor_spl: doctorSpl,
      doctor_password: doctorPassword,
      doctor_email_id: doctorEmailId,
      doctor_contact: doctorContact,
      doctor_LId: doctorLId
    };

    setDoctorName("");
    setDoctorEmailId("");
    setDoctorSpl("");
    setDoctorPassword("");
    setDoctorContact("");
    setDoctorLId("");

    AddDoctorHandler(doctorData);
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
          />
          <InputField
            type="text"
            label="Doctor license ID"
            onChange={doctorLIdChangeHandler}
          />
          <InputField
            type="text"
            label="Contact Number"
            onChange={doctorContactChangeHandler}
          />

          <InputField
            type="text"
            label="Doctor Specialization"
            onChange={doctorSplChangeHandler}
          />
          <InputField
            type="text"
            label="Email ID"
            onChange={doctorEmailIdChangeHandler}
          />

          <InputField
            type="text"
            label="Password"
            onChange={doctorPasswordChangeHandler}
          />

          <AddButton value="Register" />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
