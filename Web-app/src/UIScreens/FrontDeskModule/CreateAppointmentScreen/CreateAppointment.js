import React, { useState } from "react";
import InputField from "../../../Components/Screens/UI Elements/MenuForm Elements/InputField";
import classes from "./CreateAppointment.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const CreateAppointment = (props) => {
  const [PatientId, setPatientId] = useState("");

  //Search Bar Fucntionality variable...
  const [patientNameToBeSearched, setPatientNameToBeSearched] = useState("");
  //Search Bar Fucntionality variable ends here...

  const PatientIdChangeHandler = (event) => {
    setPatientId(event.target.value);
    props.setPatientDetailsView(false);
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
    props.setViewDetalsPatientID(PatientId);
    props.setPatientDetailsView(true);
  };

  //Search Bar Functionality...

  const SearchPatientByNameChangeHandler = (event) => {
    setPatientNameToBeSearched(event.target.value);
    props.setPatientDetailsView(false);
  };
  const SearchPatientByNameButtonHandler = (event) => {
    event.preventDefault();
    console.log("SearchPatientByNameButtonHandler");
    // console.log(searchPatientByName);
    //search Button logic
  };
  //Search Bar Functionality ends here...

  return (
    <div>
      <div className={classes.center}>
        <h1>Appointment</h1>

        <form onSubmit={SearchPatientByNameButtonHandler}>
          <InputField
            type="text"
            label="Search Patient by name"
            value={patientNameToBeSearched}
            onChange={SearchPatientByNameChangeHandler}
          />
          <MenuSubmitButton value="Search" />
        </form>

        <form onSubmit={AddAppointmentHandler}>
          {/* <InputField
          type="text"
          label="Search Patient by name"
          value={searchPatientByName}
          onChange={SearchPatientByNameChangeHandler}
        />
        <AddSmallButton
          value="Search"
          onClick={() => SearchPatientByNameButtonHandler(searchPatientByName)}
        /> */}

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
