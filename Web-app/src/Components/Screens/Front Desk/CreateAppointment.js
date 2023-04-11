import React, { useState } from "react";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import classes from "./CreateAppointment.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const CreateAppointment = (props) => {
  const [PatientId, setPatientId] = useState("");

  const PatientIdChangeHandler = (event) => {
    setPatientId(event.target.value);
    props.setPatientDetailsView(false);
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

  const showErrorMessageScreen = (propData) => {
    // UtilitiesMethods.showMessageBarAtTheBottom();

    // const showMessageBarAtTheBottom = (propData) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: propData.message,
      isErrorMessage: propData.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
    // };
    // console.log(isError);
    // props.setAlertMessage(errorMessage);
    // props.setAlertFlag(true);
  };

  const addPatientNewEncounterResponseCallBack = (
    patientEncounterResponseData
  ) => {
    console.log("addPatientNewEncounterResponseCallBack");
    console.log(patientEncounterResponseData);

    if (patientEncounterResponseData.errorMessage === null) {
      if (patientEncounterResponseData.isEncounterAdded === true) {
        showErrorMessageScreen({
          message: "Appointment created for Patient ID : " + PatientId,
          isErrorMessage: false,
        });
        setPatientId("");
      }
      if (patientEncounterResponseData.isEncounterAdded === false) {
        showErrorMessageScreen({
          message: "Some error occured. Please try again later.",
          isErrorMessage: false,
        });
      }
    } else if (patientEncounterResponseData.isEncounterAdded === null) {
      showErrorMessageScreen({
        message: patientEncounterResponseData.errorMessage,
        isErrorMessage: true,
      });
    }
  };

  const getPatientDetailsHandler = (data) => {
    console.log("getPatientDetailsHandler  ");
    console.log(PatientId);

    if (UtilitiesMethods.getSpaceTrimmedLenght(PatientId) === 0) {
      showErrorMessageScreen({
        message: "Please enter Patiend Id to view details. It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }
    props.setViewDetalsPatientID(PatientId);
    props.setPatientDetailsView(true);
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
          <AddButton
            value="Details"
            onClick={() => getPatientDetailsHandler(PatientId)}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
