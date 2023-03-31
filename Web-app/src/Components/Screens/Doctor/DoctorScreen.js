import React, { useState } from "react";
import PatientData from "./PatientData";
import classes from "./DoctorScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import NewEncounter from "./NewEncounter";
import EncounterScreen from "./EncounterScreen";
import FieldWorkerUpdates from "./FieldWorkerUpdates";

const DoctorScreen = (props) => {
  const [doctorOption, setDoctorOption] = useState("");
  const [createEncounter, setCreateEncounter] = useState(false);

  const logoutD = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  

  const NewEncounterButtonHandler = () => {
    setDoctorOption("NewEncounter");
  };
  const FieldWorkerUpdateButtonHandler = () => {
    setDoctorOption("FWupdates");
  };

  return (
    <div>
      {createEncounter === true && (
        <EncounterScreen
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          setCreateEncounter={setCreateEncounter}
        />
      )}
      {createEncounter === false && (
        <div>
          <NavBar value="Log-out" label="Doctor" onClick={logoutD} />
          <div className={classes.center}>
            <h2> Doctor Menu</h2>

            <div className={classes.Doctor_menu}>
              <Button
                value="New Encounter"
                onClick={NewEncounterButtonHandler}
              />

              <Button
                value="Field-Worker Updates"
                onClick={FieldWorkerUpdateButtonHandler}
              />
            </div>
          </div>

          {doctorOption === "NewEncounter" && (
            <NewEncounter
              doctorOption={doctorOption}
              setDoctorOption={setDoctorOption}
              setAlertMessage={props.setAlertMessage}
              setAlertFlag={props.setAlertFlag}
              setCreateEncounter={setCreateEncounter}
            />
          )}
          {doctorOption === "FWupdates" && (
            <FieldWorkerUpdates
              doctorOption={doctorOption}
              setDoctorOption={setDoctorOption}
              setAlertMessage={props.setAlertMessage}
              setAlertFlag={props.setAlertFlag}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorScreen;
