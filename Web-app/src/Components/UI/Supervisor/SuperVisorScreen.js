import React, { useState } from "react";
import NewFollowUpAssign from "./NewFollowUpAssign";
import classes from "./SuperVisorScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import FieldWorkerList from "./FieldWorkerList";
import FieldWorkerDetails from "../FieldWorker/FieldWorkerDetails";

const SuperVisorScreen = (props) => {
  const [superVisorOption, setSuperVisorOption] = useState("superVisor");
  const[fieldWorkerStatus,setFieldWorkerStatus]=useState(false);
  const NewFollowUpAssignButtonHandler = () => {
    setSuperVisorOption("NewFollowUpAssign");
    setFieldWorkerStatus(false);
  };
  const FieldWorkerListButtonHandler = () => {
    setSuperVisorOption("FieldWorkerList");
  };

  const logoutSV = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  return (
    <div>
      <NavBar value="Log-out" label="SuperVisor" onClick={logoutSV} />

      <div className={classes.center}>
        <h2> SuperVisor Menu</h2>

        <div className={classes.SV_menu}>
          <Button
            value="Assign Follow ups"
            onClick={NewFollowUpAssignButtonHandler}
          />

          <Button
            value="Field Worker List"
            onClick={FieldWorkerListButtonHandler}
          />
        </div>
      </div>

      {superVisorOption === "NewFollowUpAssign" && (
        <NewFollowUpAssign
        superVisorOption={superVisorOption}
        setSuperVisorOption={setSuperVisorOption}
        setAlertFlag={props.setAlertFlag}
        setAlertMessage={props.setAlertMessage}
      />
      )}
      {superVisorOption === "FieldWorkerList" && (
        <FieldWorkerList
        superVisorOption={superVisorOption}
        setSuperVisorOption={setSuperVisorOption}
        setAlertFlag={props.setAlertFlag}
        setAlertMessage={props.setAlertMessage}
        setFieldWorkerStatus={setFieldWorkerStatus}
      />
     
      )}
       {
        fieldWorkerStatus === true  && (<FieldWorkerDetails/>)
      }
    </div>
  );
};

export default SuperVisorScreen;
