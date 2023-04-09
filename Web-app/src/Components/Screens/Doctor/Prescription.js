import React, { useState } from "react";
import classes from "./Prescription.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import TextBox from "../UI Elements/MenuForm Elements/TextBox";

const Prescription = (props) => {
  const [PrescriptionData, setPrescriptionData] = useState("");
  const [AdditionalNotes, setAdditionalNotes] = useState("");

  //doctorPrescriptionData={doctorEncounterData}
  //setDoctorPrescriptionData={setDoctorEncounterData}
  console.log("props.doctorPrescriptionData in Prescritpion");
  console.log(props.doctorPrescriptionData);

  const PrescriptionDataChangeHandler = (event) => {
    console.log(event.target.value);
    updateDoctorPresciptionData({prescription : event.target.value});
  };

  const AdditionalNotesChangeHandler = (event) => {
    console.log(event.target.value);
    updateDoctorPresciptionData({additionalNotes : event.target.value});
  };

  //seState({prescription : "", additionalNotes : ""});
  const updateDoctorPresciptionData = (prescriptionData) => {
    props.setDoctorPrescriptionData((encounterData) => {
      console.log({ ...encounterData, ...prescriptionData });
      return { ...encounterData, ...prescriptionData };
    });
  };

  const PrescriptionSubmitHandler = (event) => {
    event.preventDefault();

    console.log(PrescriptionData);
    // props.onPrescription(PrescriptionData);
    setPrescriptionData("");
    props.setAlertMessage(
      "Prescription successfully added :" + PrescriptionData
    );
    props.setAlertFlag(true);
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
