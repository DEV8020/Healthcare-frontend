import React, { useState } from "react";
import classes from "./Prescription.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import TextBox from "../UI Elements/MenuForm Elements/TextBox";
import DoctorAPIHandler from "../../../Controllers/DoctorAPIHandler";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

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

  //

  const PrescriptionSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Data to be sent in precription is to be sent to server is");
    console.log(props.doctorPrescriptionData);

    console.log(props.folloupsData);

    //folloupsData

    // return;

    //Hitting the API call for Create Patient Encounter...
    DoctorAPIHandler.savePatientEncounterData({
      prescriptionData: props.doctorPrescriptionData,
      followUpData: props.folloupsData,
      encounterID: props.encounterID,
      savePatientEncounterDataResponseHanlder:
        savePatientEncounterDataResponseHanlder,
    });
  };

  //Create Patient Encounter API call response handler...
  const savePatientEncounterDataResponseHanlder = (encounterResponseData) => {
    console.log("savePatientEncounterDataResponseHanlder");
    console.log(encounterResponseData);
    if (encounterResponseData.isEncounterCreated === false) {
      showMessageBarAtTheBottom({
        [UtilitiesMethods.getErrorMessageKey()]:
        encounterResponseData.errorMessage,
        [UtilitiesMethods.getIsMessageErrorMessageKey()]: true,
      });
      return;
    }
    setPrescriptionData("");
    showMessageBarAtTheBottom({
      [UtilitiesMethods.getErrorMessageKey()]:
        "Prescription successfully added :" + PrescriptionData,
      [UtilitiesMethods.getIsMessageErrorMessageKey()]: false,
    });
    props.callBackHandlerOnEncounterCreate();
  };

  const showMessageBarAtTheBottom = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        prop[UtilitiesMethods.getErrorMessageKey()],
      [UtilitiesMethods.getIsMessageErrorMessageKey()]:
        prop[UtilitiesMethods.getIsMessageErrorMessageKey()],
    });
  };

  // const showMessageBottomBar = () => {

  // }

  return (
    <div>
      <div className={classes.center}>
        <h1>Appointment</h1>

        <form onSubmit={PrescriptionSubmitHandler}>

        <TextBox.TextBox2
            type="text"
            label="Symptoms"
            value={props.doctorPrescriptionData.additionalNotes}
            onChange={AdditionalNotesChangeHandler}
          />

          <TextBox.TextBox2
            type="text"
            label="Prescription"
            value={props.doctorPrescriptionData.prescription}
            onChange={PrescriptionDataChangeHandler}
          />
          
          <div>
            <MenuSubmitButton value="Submit" />

            <AddButton
              value="Add Followup"
              onClick={() => props.setAddFollowup(true)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prescription;
