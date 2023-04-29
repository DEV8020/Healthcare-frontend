import React from "react";
import classes from "./NewEncounter.module.css";
// import NewEncounterCell from "./NewEncounterCell";
import NewEncounterCell from "./NewEncounterCell";
import DoctorAPIHandler from "../../../../Controllers/DoctorAPIHandler";
import UtilitiesKeys from "../../../../Utilities/UtilitiesKeys";
import UtilitiesMethods from "../../../../Utilities/UtilitiesMethods";
// import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";

const NewEncounter = (props) => {
  console.log("daddadaddada");
  console.log(props.doctorEncounterData);
  console.log("props.isPendingEncounterScreen");
  console.log(props.isPendingEncounterScreen);

  console.log("encounter ID in NewEncounter.js");
  console.log(props.selectedEncounterID);
  console.log("***************************************************");
  console.log(props.doctorPendingEncounterData);

  const CreateEncounterHandler = (encounterData) => {
    DoctorAPIHandler.addPatientEncounterData({
      patientData: encounterData,
      addPatientEncounterResponseHandler: addPatientEncounterResponseHandler,
    });
  };

  const addPatientEncounterResponseHandler = (addPatientEncounterData) => {
    if (addPatientEncounterData.isEncounterCreated === false) {
      props.showMessageAtBottomBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          addPatientEncounterData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
        [UtilitiesMethods.getMessageTypeKey()]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
      return;
    }
    props.showMessageAtBottomBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "Encounter Created successfully.",
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
      [UtilitiesMethods.getMessageTypeKey()]:
          UtilitiesKeys.getAlertMessageTypeKeys().successKey,
    });

    console.log("************************************");
    console.log(addPatientEncounterData);
    console.log("************************************");
    props.encounterCreateDataHandler(addPatientEncounterData.encounterData);
    props.setCreateEncounter(true);
  };

  const unsavedEncounterHandler = (encounterData) => {
    console.log("encounterData**********************");
    console.log(encounterData);
    props.encounterCreateDataHandler(encounterData);
    props.setCreateEncounter(true);
  };

  //Message Bar At The Bottom to display messages...
  // const showMessageBarAtTheBottom = (propData) => {
  //   props.showMessageAtBottomBar();
  //   // props.showMessageAtBottomBar({
  //   //   [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
  //   //     propData[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
  //   //   [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
  //   //     propData[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
  //   // });
  // };

  return (
    <div className={classes.center}>
      <h1> Create New Appointment</h1>

      {props.isPendingEncounterScreen === false &&
        props.doctorEncounterData.length === 0 && (
          <div>
            {" "}
            <h3 style={{ textAlign: "center" }}>No encounter to display.</h3>
          </div>
        )}

      {props.isPendingEncounterScreen === true &&
        props.doctorPendingEncounterData.length === 0 && (
          <div>
            {" "}
            <h3 style={{ textAlign: "center" }}>No encounter to display.</h3>
          </div>
        )}

      <div className={classes.ul}>
        {props.isPendingEncounterScreen === false &&
          props.doctorEncounterData.map((encounterData) => (
            <NewEncounterCell
              encounterUserData={encounterData}
              CreateEncounterHandler={CreateEncounterHandler}
            />
          ))}

        {props.isPendingEncounterScreen === true &&
          props.doctorPendingEncounterData.map((encounterData) => (
            <NewEncounterCell
              encounterUserData={encounterData}
              CreateEncounterHandler={unsavedEncounterHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default NewEncounter;
