import React, { useState } from "react";
import classes from "./Prescription.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import TextBox from "../UI Elements/MenuForm Elements/TextBox";
import DoctorAPIHandler from "../../../Controllers/DoctorAPIHandler";

const Prescription = (props) => {
  const [PrescriptionData, setPrescriptionData] = useState("");
  const [AdditionalNotes, setAdditionalNotes] = useState("");

  const PrescriptionDataChangeHandler = (event) => {
    updateDoctorPresciptionData({ prescription: event.target.value });
  };

  const AdditionalNotesChangeHandler = (event) => {
    updateDoctorPresciptionData({ additionalNotes: event.target.value });
  };

  const updateDoctorPresciptionData = (prescriptionData) => {
    props.setDoctorPrescriptionData((encounterData) => {
      return { ...encounterData, ...prescriptionData };
    });
  };



  const PrescriptionSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Data to be sent in precription is to be sent to server is");
    console.log(props.doctorPrescriptionData);

    return;
    //Hitting the API call for Create Patient Encounter...
    DoctorAPIHandler.savePatientEncounterData({
      prescriptionData: props.doctorPrescriptionData,
      //  followUpData : props.followUpData,
      savePatientEncounterDataResponseHanlder:
        savePatientEncounterDataResponseHanlder,
    });

    setPrescriptionData("");
    props.setAlertMessage(
      "Prescription successfully added :" + PrescriptionData
    );
    props.setAlertFlag(true);
  };

  //Create Patient Encounter API call response handler...
  const savePatientEncounterDataResponseHanlder = (encounterResponseData) => {
    console.log("savePatientEncounterDataResponseHanlder");
    console.log(encounterResponseData);
    // isEncounterCreated: true,
    //         encounterData: createdEncounterData.responseData.data,
    //         errorMessage: null,
  };

  return (
    <div>
      <div className={classes.center}>
        <h1>Appointment</h1>

        <form onSubmit={PrescriptionSubmitHandler}>
          <TextBox.TextBox2
            type="text"
            label="Prescription"
            value={props.doctorPrescriptionData.prescription}
            onChange={PrescriptionDataChangeHandler}
          />
          <TextBox.TextBox2
            type="text"
            label="Additional Notes"
            value={props.doctorPrescriptionData.additionalNotes}
            onChange={AdditionalNotesChangeHandler}
          />

          <MenuSubmitButton value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Prescription;
