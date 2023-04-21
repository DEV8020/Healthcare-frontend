import React from "react";
import classes from "./NewEncounter.module.css";
// import NewEncounterCell from "./NewEncounterCell";
import NewEncounterCell from "./NewEncounterCell"
import DoctorAPIHandler from "../../../../Controllers/DoctorAPIHandler";
import UtilitiesKeys from "../../../../Utilities/UtilitiesKeys";
// import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";

const NewEncounter = (props) => {
  console.log("daddadaddada");
  console.log(props.doctorEncounterData);

  console.log("encounter ID in NewEncounter.js");
  console.log(props.selectedEncounterID);

  const CreateEncounterHandler = (encounterData) => {
    DoctorAPIHandler.addPatientEncounterData({
      patientData: encounterData,
      addPatientEncounterResponseHandler: addPatientEncounterResponseHandler,
    });
  };


  const addPatientEncounterResponseHandler = (addPatientEncounterData) => {
    if (addPatientEncounterData.isEncounterCreated === false) {
      showMessageBarAtTheBottom({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        addPatientEncounterData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }
    showMessageBarAtTheBottom({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
      "Encounter Created successfully.",
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true
    });
    props.encounterCreateDataHandler(addPatientEncounterData.encounterData);
    props.setCreateEncounter(true);
  };


 //Message Bar At The Bottom to display messages...
 const showMessageBarAtTheBottom = (propData) => {
  props.showMessageAtBottomBar({
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
      propData[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
      propData[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
  });
};


  return (
    <div className={classes.center}>
      <h1> Create New Appointment</h1>

      {props.doctorEncounterData.length === 0 && (
        <div>
          {" "}
          <h3 style={{ textAlign: "center" }}>
            No encounter to display.
          </h3>
        </div>
      )}

      <div className={classes.ul}>
        {props.doctorEncounterData.map((encounterData) => (
          <NewEncounterCell
            encounterUserData={encounterData}
            CreateEncounterHandler={CreateEncounterHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default NewEncounter;
