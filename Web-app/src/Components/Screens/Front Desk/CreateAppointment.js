import React, { useState } from "react";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import classes from "./CreateAppointment.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";

const CreateAppointment = (props) => {
  const [PatientId, setPatientId] = useState("");

  const PatientIdChangeHandler = (event) => {
    setPatientId(event.target.value);
  };

  const AddAppointmentHandler = (event) => {
    event.preventDefault();

    const encounterData = {
      hospitalId: "1",
      patientId: PatientId,
    };

    FrontDeskAPIHandler.AddPatientEncounterAPICall({
      encounterData: encounterData,
      addPatientNewEncounterResponseCallBack:
        addPatientNewEncounterResponseCallBack,
    });
  };

  const showErrorMessageScreen = (errorMessage, isError) => {
    console.log(isError);
    props.setAlertMessage(errorMessage);
    props.setAlertFlag(true);
  };

  const addPatientNewEncounterResponseCallBack = (
    patientEncounterResponseData
  ) => {
    console.log("addPatientNewEncounterResponseCallBack");
    console.log(patientEncounterResponseData);

    if (patientEncounterResponseData.errorMessage === null) {
      if (patientEncounterResponseData.isEncounterAdded === true) {
        showErrorMessageScreen(
          "Appointment created for Patient ID :" + PatientId,
          false
        );
        setPatientId("");
      }
      if (patientEncounterResponseData.isEncounterAdded === false) {
        showErrorMessageScreen(
          "Some error occured. Please try again later.",
          true
        );
      }
    } else if (patientEncounterResponseData.isEncounterAdded === null) {
      showErrorMessageScreen(patientEncounterResponseData.errorMessage, true);
    }
  };

  return (
    <div>
      <div className={classes.center}>
        <h1>Appointment</h1>

        <form onSubmit={AddAppointmentHandler}>
          <InputField
            type="text"
            label="PatientId"
            value={PatientId}
            onChange={PatientIdChangeHandler}
          />

          <MenuSubmitButton value="Create Appointment" />
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
