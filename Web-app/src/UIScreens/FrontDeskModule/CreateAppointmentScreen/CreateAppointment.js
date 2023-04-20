import React, { useState } from "react";
import classes from "./CreateAppointment.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";

const CreateAppointment = (props) => {
  const [PatientId, setPatientId] = useState("");
  //Search Bar Fucntionality variable...
  const [patientNameToBeSearched, setPatientNameToBeSearched] = useState("");
  //Search Bar Fucntionality variable ends here...

  const PatientIdChangeHandler = (userData) => {
    setPatientId(userData.patientId);
    props.resetPatientDetailViewFlags();
  };

  const AddAppointmentHandler = (event) => {
    console.log("AddAppointmentHandler called");
    event.preventDefault();
    
    FrontDeskAPIHandler.AddPatientEncounterAPICall({
      encounterData: {
        patientId: PatientId,
      },
      addPatientNewEncounterResponseCallBack:
        addPatientNewEncounterResponseCallBack,
    });
  };

  const showErrorMessageScreen = (propData) => {
    props.showMessageBarAtTheBottom({
      [UtilitiesMethods.getErrorMessageKey()]:
        propData[UtilitiesMethods.getErrorMessageKey()],
      [UtilitiesMethods.getIsMessageErrorMessageKey()]:
        propData[UtilitiesMethods.getIsMessageErrorMessageKey()],
    });
  };

  const addPatientNewEncounterResponseCallBack = (
    patientEncounterResponseData
  ) => {
    console.log("addPatientNewEncounterResponseCallBack");
    console.log(patientEncounterResponseData);

    if (patientEncounterResponseData.errorMessage === null) {
      if (patientEncounterResponseData.isEncounterAdded === true) {
        showErrorMessageScreen({
          [UtilitiesMethods.getErrorMessageKey()]:
            "Appointment created for Patient ID : " + PatientId,
          [UtilitiesMethods.getIsMessageErrorMessageKey()]: false,
        });
        setPatientId("");
      }
      if (patientEncounterResponseData.isEncounterAdded === false) {
        showErrorMessageScreen({
          [UtilitiesMethods.getErrorMessageKey()]:
            "Some error occured. Please try again later.",
          [UtilitiesMethods.getIsMessageErrorMessageKey()]: false,
        });
      }
    } else if (patientEncounterResponseData.isEncounterAdded === null) {
      showErrorMessageScreen({
        [UtilitiesMethods.getErrorMessageKey()]:
          patientEncounterResponseData.errorMessage,
        [UtilitiesMethods.getIsMessageErrorMessageKey()]: true,
      });
    }
  };

  const getPatientDetailsHandler = (data) => {
    console.log("getPatientDetailsHandler  ");
    console.log(PatientId);

    if (UtilitiesMethods.getSpaceTrimmedLenght(PatientId) === 0) {
      showErrorMessageScreen({
        [UtilitiesMethods.getErrorMessageKey()]:
          "Please enter Patiend Id to view details. It can't be left blank.",
        [UtilitiesMethods.getIsMessageErrorMessageKey()]: true,
      });
      return;
    }
    props.patientDetailsButtonPressedHandler(PatientId);
  };

  const SearchPatientByNameButtonHandler = (event) => {
    event.preventDefault();
    props.searchButtonPressHandler(patientNameToBeSearched);
  };


  const searchTextFieldChangeHandler = (userNameData) => {
    props.resetPatientDetailViewFlags();
    setPatientNameToBeSearched(userNameData.name);
  };



  return (
    <div>
      <div className={classes.center}>
        <h1>Appointment</h1>

        <form onSubmit={SearchPatientByNameButtonHandler}>
         
          {/* Input Text Field for Patient Name to be Searched... */}
          <InputTextField
            label="Search Patient by name"
            mappedKey="name"
            onChange={searchTextFieldChangeHandler}
            value={patientNameToBeSearched}
          />

          <MenuSubmitButton value="Search" />
        </form>

        <form onSubmit={AddAppointmentHandler}>

        <InputNumericTextField
            label="PatientId"
            mappedKey="patientId"
            onChange={PatientIdChangeHandler}
            value={PatientId}
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
