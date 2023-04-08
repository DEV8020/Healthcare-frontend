import classes from "./PatientDetailsView.module.css";
import React, { useEffect, useState } from "react";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";

const PatientDetailsView = (props) => {
  const [patientDetailsData, setPatientDetailsData] = useState({
    patientId: "",
    name: "",
    address: "",
    age: "",
    sex: "",
    contact: "",
  });

  console.log("viewDetalsPatientID in patient details view...");
  console.log(props.viewDetalsPatientID);

  useEffect(() => {
    FrontDeskAPIHandler.GetPatientDetailsData({
      patientID: props.viewDetalsPatientID,
      getPatientDetailsResponseHandler: getPatientDetailsResponseHandler,
    });
    console.log("use effect running");
  }, [props.viewDetalsPatientID]);

  const getPatientDetailsResponseHandler = (patientDetailsResponseData) => {
    console.log("getPatientDetailsResponseHandler called");
    console.log(patientDetailsResponseData.patientDetailsData);
    setPatientDetailsData((patientDetailsData) => {
      console.log({ ...patientDetailsData, ...patientDetailsResponseData.patientDetailsData });
      return { ...patientDetailsData, ...patientDetailsResponseData.patientDetailsData };
    });
  };

  return (
    <div className={classes.center}>
      <h2> Patient Details</h2>
      <div className={classes.ul}>
        <div className={classes.plist}>
          <div>ID : {patientDetailsData.patientId}</div>
          <div>Name : {patientDetailsData.name}</div>
          <div>Age : {patientDetailsData.age}</div>
          <div>Sex : {patientDetailsData.sex}</div>
          <div>Contact : {patientDetailsData.contact}</div>
        </div>
        <AddButton
          value="Back"
          onClick={() => {
            props.setPatientDetailsView(false);
          }}
        />
      </div>
    </div>
  );
};

export default PatientDetailsView;
