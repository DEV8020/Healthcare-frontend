import React, { useState } from "react";
import PatientData from "./PatientData";
import classes from "./EncounterScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import Prescription from "./Prescription";
import ViewHistory from "./ViewHistory";
import FollowUpUpdates from "./FollowUpUpdates";
import AddFollowup from "./AddFollowup";

const EncounterScreen = (props) => {
  const [encounterOption, setEncounterOption] = useState("");
  const [addFollowup, setAddFollowup] = useState(false);
  const [folloupsData, setFollowupsData] = useState({});
  console.log(folloupsData);
  const PrescriptionButtonHandler = () => {
    setEncounterOption("Prescription");
  };
  const ViewHistoryButtonHandler = () => {
    setEncounterOption("ViewHistory");
  };
  const FollowUpUpdatesButtonHandler = () => {
    setEncounterOption("FollowUpUpdates");
  };
  const backButtonD = () => {
    props.setCreateEncounter(false);
  };

  return (
    <div>
      <NavBar value="Back" label="Doctor" onClick={backButtonD} />

      <div className={classes.center}>
        <h2> Encounter Menu</h2>

        <div className={classes.Encounter_menu}>
          <Button value="Prescription" onClick={PrescriptionButtonHandler} />

          <Button value="View History" onClick={ViewHistoryButtonHandler} />

          <Button
            value="Follow-up Updates"
            onClick={FollowUpUpdatesButtonHandler}
          />
        </div>
      </div>

      {encounterOption === "Prescription" && (
        <Prescription
          setEncounterOption={setEncounterOption}
          setAddFollowup={setAddFollowup}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
        />
      )}
      {encounterOption === "ViewHistory" && (
        <ViewHistory
          encounterOption={encounterOption}
          setEncounterOption={setEncounterOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
        />
      )}
      {encounterOption === "FollowUpUpdates" && (
        <FollowUpUpdates
          encounterOption={encounterOption}
          setEncounterOption={setEncounterOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
        />
      )}
      {addFollowup === true && (
        <AddFollowup
          setFollowupsData={setFollowupsData}
          setAddFollowup={setAddFollowup}
        />
      )}
    </div>
  );
};

export default EncounterScreen;
