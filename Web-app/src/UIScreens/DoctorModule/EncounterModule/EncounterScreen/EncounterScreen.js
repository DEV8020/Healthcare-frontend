import React, { useState } from "react";
// import PatientData from "./PatientData";
import classes from "./EncounterScreen.module.css";
import NavBar from "../../../../Components/Screens/UI Elements/NavBar/NavBar";
import Button from "../../../../Components/Screens/UI Elements/Button/Button";
import Prescription from "../PrescriptionScreen/Prescription";
import ViewHistory from "../ViewHistoryScreen/ViewHistory";
// import ViewHistory from "../../../Components/Screens/Doctor/ViewHistory";
// import FollowUpUpdates from "./FollowUpUpdates";
import AddFollowup from "../../AddFollowUpScreen/AddFollowup";
import DoctorUtilitiesKeys from "../../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";
// import AddFollowup from
// import AddButton from "../UI Elements/MenuForm Elements/addButton";

const EncounterScreen = (props) => {
  const [addFollowup, setAddFollowup] = useState(false);
  const [encounterOption, setEncounterOption] = useState(
    DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys().createPrescriptionKey
  );
  const [folloupsData, setFollowupsData] = useState({});
  const [doctorEncounterData, setDoctorEncounterData] = useState({
    prescription: "",
    additionalNotes: "",
  });
  const [patientEncounterID, setPatientEncounterID] = useState("");

  // const [doctorFollowUpData, setDoctorFollowUpData] = useState(
  //   DoctorUtilitiesKeys.getDoctorFollowUpInitialData()
  // );

  // console.log("folloupsData");
  // console.log(folloupsData);

  const [doctorFollowUpData, setDoctorFollowUpData] = useState([
    DoctorUtilitiesKeys.getDoctorFollowUpInitialData(),
  ]);

  //   // AddFollowup
  // AddFollowup
  const PrescriptionButtonHandler = () => {
    setEncounterOption(
      DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys().createPrescriptionKey
    );
  };
  const ViewHistoryButtonHandler = () => {
    setEncounterOption(
      DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys().viewHistoryKey
    );
  };

  console.log("props.selectedDoctorEncounterData in encounter screen");
  console.log(props.selectedDoctorEncounterData);
  console.log(props.selectedEncounterID);

  // selectedEncounterID={selectedEncounterID}

  const backButtonD = () => {
    props.setCreateEncounter(false);
  };

  const callBackHandlerOnEncounterCreate = () => {
    props.setCreateEncounter(false);
    console.log("callBackHandlerOnEncounterCreate called");
    props.refreshDoctorEncounterListHanlder();
  };

  return (
    <div>
      <NavBar value="Back" label="Doctor" onClick={backButtonD} />

      <div className={classes.center}>
        <h2> Encounter Menu</h2>

        <div className={classes.Encounter_menu}>
          <Button
            value={
              DoctorUtilitiesKeys.getDoctorMenuOptionsLabelKeys()
                .createPrescriptionKey
            }
            onClick={PrescriptionButtonHandler}
          />

          <Button
            value={
              DoctorUtilitiesKeys.getDoctorMenuOptionsLabelKeys().viewHistoryKey
            }
            onClick={ViewHistoryButtonHandler}
          />
        </div>
      </div>

      {encounterOption ===
        DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys()
          .createPrescriptionKey && (
        <Prescription
          setEncounterOption={setEncounterOption}
          // setAlertMessage={props.setAlertMessage}
          // setAlertFlag={props.setAlertFlag}
          doctorPrescriptionData={doctorEncounterData}
          setDoctorPrescriptionData={setDoctorEncounterData}
          setAddFollowup={setAddFollowup}
          folloupsData={doctorFollowUpData}
          encounterID={props.selectedEncounterID}
          callBackHandlerOnEncounterCreate={callBackHandlerOnEncounterCreate}
          showBottomMessageBar={props.showMessageBarAtTheBottom}
        />
      )}

      {/* showBottomMessageBar */}

      {encounterOption ===
        DoctorUtilitiesKeys.getDoctorMenuOptionsNameKeys().viewHistoryKey && (
        <ViewHistory
          encounterOption={encounterOption}
          setEncounterOption={setEncounterOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          selectedEncounterData={props.selectedDoctorEncounterData}
        />
      )}

      {addFollowup === true && (
        <AddFollowup
          setFollowupsData={setFollowupsData}
          setAddFollowup={setAddFollowup}
          showBottomMessageBar={props.showMessageBarAtTheBottom}
          doctorFollowUpData={doctorFollowUpData}
          setDoctorFollowUpData={setDoctorFollowUpData}
        />
      )}
    </div>
  );
};

export default EncounterScreen;
